/* globals document */
import createTimeoutModal from './index';
// currently not implemented in jsdom.
// https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
// https://github.com/jsdom/jsdom/issues/1695
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.SESSION_DURATION = 3000;

describe('Timeout Modal', () => {
    it('should initialise a modal', () => {
        document.body.innerHTML = `<div class="govuk-modal" id="govuk-modal-test-1" data-module="govuk-modal">
            <div class="govuk-modal__wrapper">
                <dialog
                    id="test-1"
                    class="govuk-modal__box"
                    aria-labelledby="test-1-title"
                    aria-describedby="test-1-content"
                    aria-modal="true"
                    role="alertdialog"
                    tabindex="0"
                >
                    <div class="govuk-modal__header">
                        header
                    </div>
                    <div class="govuk-modal__main">
                        <span class="govuk-modal__heading govuk-heading-l" id="test-1-title">Test 1 heading</span>
                        <div class="govuk-modal__content" id="test-1-content">
                            <p class="govuk-body">Test 1 modal body text</p>
                        </div>
                        <button type="button" class="govuk-button govuk-modal__continue" data-module="govuk-button">
                            Continue application
                        </button>
                    </div>
                </dialog>
            </div>
            <div class="govuk-modal__overlay"></div>
        </div>`;
        const timeoutEndedModal = createTimeoutModal(window);
        timeoutEndedModal.init({
            element: '#govuk-modal-test-1',
            resumeElement: '.govuk-modal__continue'
        });
        const modalElement = document.querySelector('#govuk-modal-test-1');
        expect(modalElement.querySelector('dialog').hasAttribute('open')).toEqual(true);
    });

    it('should show the modal after a specified interval of milliseconds', async () => {
        document.body.innerHTML = `<div class="govuk-modal" id="govuk-modal-test-2" data-module="govuk-modal">
            <div class="govuk-modal__wrapper">
                <dialog
                    id="test-2"
                    class="govuk-modal__box"
                    aria-labelledby="test-2-title"
                    aria-describedby="test-2-content"
                    aria-modal="true"
                    role="alertdialog"
                    tabindex="0"
                >
                    <div class="govuk-modal__header">
                        header
                    </div>
                    <div class="govuk-modal__main">
                        <span class="govuk-modal__heading govuk-heading-l" id="test-2-title">Test 1 heading</span>
                        <div class="govuk-modal__content" id="test-2-content">
                            <p class="govuk-body">Test 2 modal body text</p>
                        </div>
                    </div>
                </dialog>
            </div>
            <div class="govuk-modal__overlay"></div>
        </div>`;
        const timeoutEndedModal = createTimeoutModal(window);
        timeoutEndedModal.init({
            element: '#govuk-modal-test-2',
            showIn: [1000]
        });
        expect(
            document.querySelector('#govuk-modal-test-2').classList.contains('govuk-modal--open')
        ).toEqual(false);
        // emulate a delay.
        await new Promise(r => setTimeout(r, 1200));
        expect(
            document.querySelector('#govuk-modal-test-2').classList.contains('govuk-modal--open')
        ).toEqual(true);
    });

    it('should periodically update the content of a modal', async () => {
        document.body.innerHTML = `<div class="govuk-modal" id="govuk-modal-test-3" data-module="govuk-modal">
            <div class="govuk-modal__wrapper">
                <dialog
                    id="test-3"
                    class="govuk-modal__box"
                    aria-labelledby="test-3-title"
                    aria-describedby="test-3-content"
                    aria-modal="true"
                    role="alertdialog"
                    tabindex="0"
                >
                    <div class="govuk-modal__header">
                        header
                    </div>
                    <div class="govuk-modal__main">
                        <span class="govuk-modal__heading govuk-heading-l" id="test-3-title">Test 1 heading</span>
                        <div class="govuk-modal__content" id="test-3-content">
                            <p class="govuk-body">Test 3 modal body text</p>
                            <span aria-live="assertive">Your application will time out in <span class="govuk-modal__time-remaining" aria-atomic="true" aria-live="assertive"></span></span>
                        </div>
                    </div>
                </dialog>
            </div>
            <div class="govuk-modal__overlay"></div>
        </div>`;
        const timeoutEndedModal = createTimeoutModal(window);
        timeoutEndedModal.init({
            element: '#govuk-modal-test-3'
        });
        expect(document.querySelector('.govuk-modal__time-remaining').innerHTML).toEqual(
            '3 seconds'
        );
        // emulate a delay.
        await new Promise(r => setTimeout(r, 1000));
        expect(document.querySelector('.govuk-modal__time-remaining').innerHTML).toEqual(
            '2 seconds'
        );
        // emulate a delay.
        await new Promise(r => setTimeout(r, 1000));
        expect(document.querySelector('.govuk-modal__time-remaining').innerHTML).toEqual(
            '1 second'
        );
    });

    it('should resume a modal counting down when CTA is clicked', async () => {
        jest.doMock('../ajax-request', () => Promise.resolve('200 response'));
        document.body.innerHTML = `<div class="govuk-modal" id="govuk-modal-test-3" data-module="govuk-modal">
            <div class="govuk-modal__wrapper">
                <dialog
                    id="test-3"
                    class="govuk-modal__box"
                    aria-labelledby="test-3-title"
                    aria-describedby="test-3-content"
                    aria-modal="true"
                    role="alertdialog"
                    tabindex="0"
                >
                    <div class="govuk-modal__header">
                        header
                    </div>
                    <div class="govuk-modal__main">
                        <span class="govuk-modal__heading govuk-heading-l" id="test-3-title">Test 1 heading</span>
                        <div class="govuk-modal__content" id="test-3-content">
                            <p class="govuk-body">Test 3 modal body text</p>
                            <span aria-live="assertive">Your application will time out in <span class="govuk-modal__time-remaining" aria-atomic="true" aria-live="assertive"></span></span>
                        </div>
                        <button type="button" class="govuk-button govuk-modal__continue" data-module="govuk-button">
                            Continue application
                        </button>
                    </div>
                </dialog>
            </div>
            <div class="govuk-modal__overlay"></div>
        </div>`;

        const timeoutEndedModal = createTimeoutModal(window);
        timeoutEndedModal.init({
            element: '#govuk-modal-test-3',
            resumeElement: '.govuk-modal__continue'
        });
        expect(document.querySelector('.govuk-modal__time-remaining').innerHTML).toEqual(
            '3 seconds'
        );
        // emulate a delay.
        await new Promise(r => setTimeout(r, 1000));
        // click resume button.
        document.querySelector('.govuk-modal__continue').click();
        // emulate a delay.
        await new Promise(r => setTimeout(r, 500));
        expect(document.querySelector('.govuk-modal__time-remaining').innerHTML).toEqual(
            '3 seconds'
        );
    });

    it('should show throw error when unable to refresh session', async () => {
        // emulate a 404 for the session refresh attempt.
        jest.doMock('../ajax-request', () => Promise.reject(new Error('error')));
        document.body.innerHTML = `<div class="govuk-modal" id="govuk-modal-test-3" data-module="govuk-modal">
            <div class="govuk-modal__wrapper">
                <dialog
                    id="test-3"
                    class="govuk-modal__box"
                    aria-labelledby="test-3-title"
                    aria-describedby="test-3-content"
                    aria-modal="true"
                    role="alertdialog"
                    tabindex="0"
                >
                    <div class="govuk-modal__header">
                        header
                    </div>
                    <div class="govuk-modal__main">
                        <span class="govuk-modal__heading govuk-heading-l" id="test-3-title">Test 1 heading</span>
                        <div class="govuk-modal__content" id="test-3-content">
                            <p class="govuk-body">Test 3 modal body text</p>
                            <span aria-live="assertive">Your application will time out in <span class="govuk-modal__time-remaining" aria-atomic="true" aria-live="assertive"></span></span>
                        </div>
                        <button type="button" class="govuk-button govuk-modal__continue" data-module="govuk-button">
                            Continue application
                        </button>
                    </div>
                </dialog>
            </div>
            <div class="govuk-modal__overlay"></div>
        </div>`;
        document.dispatchEvent = jest.fn();
        const timeoutEndedModal = createTimeoutModal(window);
        timeoutEndedModal.init({
            element: '#govuk-modal-test-3',
            resumeElement: '.govuk-modal__continue'
        });
        // click resume button.
        document.querySelector('.govuk-modal__continue').click();
        expect(document.dispatchEvent).toHaveBeenCalled();
    });
});
