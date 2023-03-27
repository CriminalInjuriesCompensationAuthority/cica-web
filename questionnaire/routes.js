'use strict';

const express = require('express');
const formHelper = require('./form-helper');
const qService = require('./questionnaire-service')();
const getFormSubmitButtonText = require('./utils/getFormSubmitButtonText');
const isQuestionnaireInstantiated = require('./utils/isQuestionnaireInstantiated');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        if (!isQuestionnaireInstantiated(req)) {
            return res.render('start.njk', {
                csrfToken: req.csrfToken(),
                submitButtonText: getFormSubmitButtonText('start')
            });
        }

        const response = await qService.getFirstSection(
            req.session.questionnaireId,
            req.session.userId
        );
        const responseBody = response.body;
        const initialSection = formHelper.removeSectionIdPrefix(
            responseBody.data[0].attributes.sectionId
        );
        return res.redirect(`${req.baseUrl}/${initialSection}`);
    } catch (err) {
        return res.status(err.statusCode || 404).render('404.njk');
    }
});

router.route('/').post(async (req, res) => {
    try {
        const startType = req.body['start-type'];
        if (startType === 'existing') {
            return res.redirect('/account/sign-in');
        }
        if (startType === 'new') {
            const response = await qService.createQuestionnaire(
                req.session.userId,
                req.session.isAuthenticated
            );
            req.session.questionnaireId = response.body.data.attributes.id;
            const initialSection = formHelper.removeSectionIdPrefix(
                response.body.data.attributes.routes.initial
            );
            return res.redirect(`/apply/${initialSection}`);
        }
        return res.render('start.njk', {
            csrfToken: req.csrfToken(),
            submitButtonText: getFormSubmitButtonText('start'),
            error: {
                text: 'Select what you would like to do'
            }
        });
    } catch (err) {
        return res.status(err.statusCode || 404).render('404.njk');
    }
});

router.route('/new').get(async (req, res) => {
    try {
        req.session.questionnaireId = undefined;
        res.redirect('/apply');
    } catch (err) {
        res.status(err.statusCode || 404).render('404.njk');
    }
});

router.route('/resume/:questionnaireId').get(async (req, res) => {
    try {
        const defaultRedirect = '/apply';
        let redirectUrl = defaultRedirect;

        const resumableQuestionnaireId = req.params.questionnaireId;
        const resumableQuestionnaireResponse = await qService.getCurrentSection(
            resumableQuestionnaireId,
            req.session.userId
        );
        const resumableQuestionnaireCurrentSectionId =
            resumableQuestionnaireResponse.body?.data?.[0]?.relationships?.section?.data?.id;

        // switch session info and redirect if valid.
        if (resumableQuestionnaireCurrentSectionId) {
            req.session.questionnaireId = resumableQuestionnaireId;
            redirectUrl = `${redirectUrl}/${formHelper.removeSectionIdPrefix(
                resumableQuestionnaireCurrentSectionId
            )}`;
        }
        return res.redirect(redirectUrl);
    } catch (err) {
        return res.status(err.statusCode || 404).render('404.njk');
    }
});

router.route('/previous/:section').get(async (req, res) => {
    try {
        const sectionId = formHelper.addPrefix(req.params.section);
        const response = await qService.getPrevious(
            req.session.questionnaireId,
            sectionId,
            req.session.userId
        );
        if (response.body.data[0].attributes && response.body.data[0].attributes.url !== null) {
            const overwriteId = response.body.data[0].attributes.url;
            return res.redirect(overwriteId);
        }
        const previousSectionId = formHelper.removeSectionIdPrefix(
            response.body.data[0].attributes.sectionId
        );
        return res.redirect(`${req.baseUrl}/${previousSectionId}`);
    } catch (err) {
        return res.status(err.statusCode || 404).render('404.njk');
    }
});

router
    .route('/:section')
    .get(async (req, res, next) => {
        try {
            if (!isQuestionnaireInstantiated(req)) {
                return res.redirect('/apply/');
            }
            const sectionId = formHelper.addPrefix(req.params.section);
            const response = await qService.getSection(
                req.session.questionnaireId,
                sectionId,
                req.session.userId
            );
            if (
                response.body.data &&
                response.body.data[0].attributes &&
                response.body.data[0].attributes.sectionId
            ) {
                const isSummaryPage =
                    formHelper.getSectionContext(response.body.data[0].attributes.sectionId) ===
                    'summary';

                if (isSummaryPage) {
                    res.set({
                        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
                        Expires: '-1',
                        Pragma: 'no-cache'
                    });
                }
            }
            const html = formHelper.getSectionHtml(
                response.body,
                req.csrfToken(),
                res.locals.nonce,
                req.session.isAuthenticated
            );
            if (formHelper.getSectionContext(sectionId) === 'confirmation') {
                req.session.reset();
            }
            return res.send(html);
        } catch (err) {
            res.status(err.statusCode || 404).render('404.njk');
            return next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const sectionId = formHelper.addPrefix(req.params.section);
            const body = formHelper.processRequest(req.body, req.params.section);
            let nextSectionId;
            // delete the token from the body to allow AJV to validate the request.
            // eslint-disable-next-line no-underscore-dangle
            delete body._csrf;
            const response = await qService.postSection(
                req.session.questionnaireId,
                sectionId,
                body,
                req.session.userId
            );
            if (response.statusCode === 201) {
                // if the page is a submission
                const isApplicationSubmission =
                    formHelper.getSectionContext(sectionId) === 'submission';
                if (isApplicationSubmission) {
                    try {
                        await qService.postSubmission(
                            req.session.questionnaireId,
                            req.session.userId
                        );
                        const submissionResponse = await qService.getSubmissionStatus(
                            req.session.questionnaireId,
                            Date.now()
                        );

                        if (submissionResponse.status === 'FAILED') {
                            const err = Error(`Unable to retrieve questionnaire submission status`);
                            err.name = 'CRNNotRetrieved';
                            err.statusCode = 500;
                            err.error = '500 Internal Server Error';
                            throw err;
                        }
                    } catch (err) {
                        return next(err);
                    }
                }

                if ('next' in req.query) {
                    const progressEntryResponse = await qService.getSection(
                        req.session.questionnaireId,
                        formHelper.addPrefix(req.query.next),
                        req.session.userId
                    );

                    if (progressEntryResponse.statusCode === 200) {
                        nextSectionId = formHelper.removeSectionIdPrefix(
                            progressEntryResponse.body.data[0].attributes.sectionId
                        );
                        return res.redirect(`${req.baseUrl}/${nextSectionId}`);
                    }
                }

                const progressEntryResponse = await qService.getCurrentSection(
                    req.session.questionnaireId,
                    req.session.userId
                );
                nextSectionId = formHelper.removeSectionIdPrefix(
                    progressEntryResponse.body.data[0].attributes.sectionId
                );

                return res.redirect(`${req.baseUrl}/${nextSectionId}`);
            }
            const html = formHelper.getSectionHtmlWithErrors(
                response.body,
                sectionId,
                req.csrfToken(),
                res.locals.nonce,
                req.session.isAuthenticated
            );
            return res.send(html);
        } catch (err) {
            res.status(err.statusCode || 404).render('404.njk');
            return next(err);
        }
    });

module.exports = router;
