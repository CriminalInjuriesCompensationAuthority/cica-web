'use strict';

const html = `<!DOCTYPE html>
<html lang="en" class="govuk-template ">
<head>
    <meta charset="utf-8" />
    <title>GOV.UK - The best place to find government services and information</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#0b0c0c" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />


    <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="/assets/images/favicon.ico" type="image/x-icon" />
    <link rel="mask-icon" href="/assets/images/govuk-mask-icon.svg" color="#0b0c0c">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/govuk-apple-touch-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/assets/images/govuk-apple-touch-icon-167x167.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/govuk-apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" href="/assets/images/govuk-apple-touch-icon.png">



    <!--[if !IE 8]><!-->
    <link href="/govuk-frontend/all.css" rel="stylesheet" />
    <!--<![endif]-->



    <!--[if IE 8]>
    <link href="/govuk-frontend/all-ie8.css" rel="stylesheet" />
    <![endif]-->


    <!--[if lt IE 9]>
    <script src="/html5-shiv/html5shiv.js"></script>
    <![endif]-->



    <meta property="og:image" content="/assets/images/govuk-opengraph-image.png">
</head>
<body class="govuk-template__body ">
<script nonce="somenonce">document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');</script>



<a href="#main-content" class="govuk-skip-link">Skip to main content</a>




<header class="govuk-header " role="banner" data-module="header">
    <div class="govuk-header__container govuk-width-container">

        <div class="govuk-header__logo">
            <a href="https://www.gov.uk" class="govuk-header__link govuk-header__link--homepage">
        <span class="govuk-header__logotype">

        <!--[if gt IE 8]><!-->
        <svg
            aria-hidden="true"
            focusable="false"
            class="govuk-header__logotype-crown"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 30"
            height="30"
            width="32"
        >
        <path
            fill="currentColor" fill-rule="evenodd"
            d="M22.6 10.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m-5.9 6.7c-.9.4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m10.8-3.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m3.3 4.8c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4M17 4.7l2.3 1.2V2.5l-2.3.7-.2-.2.9-3h-3.4l.9 3-.2.2c-.1.1-2.3-.7-2.3-.7v3.4L15 4.7c.1.1.1.2.2.2l-1.3 4c-.1.2-.1.4-.1.6 0 1.1.8 2 1.9 2.2h.7c1-.2 1.9-1.1 1.9-2.1 0-.2 0-.4-.1-.6l-1.3-4c-.1-.2 0-.2.1-.3m-7.6 5.7c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m-5 3c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s.1 2 1 2.4m-3.2 4.8c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m14.8 11c4.4 0 8.6.3 12.3.8 1.1-4.5 2.4-7 3.7-8.8l-2.5-.9c.2 1.3.3 1.9 0 2.7-.4-.4-.8-1.1-1.1-2.3l-1.2 4c.7-.5 1.3-.8 2-.9-1.1 2.5-2.6 3.1-3.5 3-1.1-.2-1.7-1.2-1.5-2.1.3-1.2 1.5-1.5 2.1-.1 1.1-2.3-.8-3-2-2.3 1.9-1.9 2.1-3.5.6-5.6-2.1 1.6-2.1 3.2-1.2 5.5-1.2-1.4-3.2-.6-2.5 1.6.9-1.4 2.1-.5 1.9.8-.2 1.1-1.7 2.1-3.5 1.9-2.7-.2-2.9-2.1-2.9-3.6.7-.1 1.9.5 2.9 1.9l.4-4.3c-1.1 1.1-2.1 1.4-3.2 1.4.4-1.2 2.1-3 2.1-3h-5.4s1.7 1.9 2.1 3c-1.1 0-2.1-.2-3.2-1.4l.4 4.3c1-1.4 2.2-2 2.9-1.9-.1 1.5-.2 3.4-2.9 3.6-1.9.2-3.4-.8-3.5-1.9-.2-1.3 1-2.2 1.9-.8.7-2.3-1.2-3-2.5-1.6.9-2.2.9-3.9-1.2-5.5-1.5 2-1.3 3.7.6 5.6-1.2-.7-3.1 0-2 2.3.6-1.4 1.8-1.1 2.1.1.2.9-.3 1.9-1.5 2.1-.9.2-2.4-.5-3.5-3 .6 0 1.2.3 2 .9l-1.2-4c-.3 1.1-.7 1.9-1.1 2.3-.3-.8-.2-1.4 0-2.7l-2.9.9C1.3 23 2.6 25.5 3.7 30c3.7-.5 7.9-.8 12.3-.8"></path>
        </svg>
        <!--<![endif]-->
        <!--[if IE 8]>
            <img src="/assets/images/govuk-logotype-tudor-crown.png" class="govuk-header__logotype-crown-fallback-image" width="32" height="30" alt="">
        <![endif]-->
          <span class="govuk-header__logotype-text">
            GOV.UK
          </span>
        </span>

            </a>
        </div>

        <div class="govuk-header__content">


            <a href="/start-page" class="govuk-header__link govuk-header__link--service-name">
                Claim criminal injuries compensation
            </a>



        </div>

    </div>
</header>



<div class="govuk-phase-banner govuk-width-container">
    <p class="govuk-phase-banner__content"><strong class="govuk-tag govuk-phase-banner__content__tag ">
        beta
    </strong>
        <span class="govuk-phase-banner__text">
      This is a new service – your <a class="govuk-link" href="https://www.surveymonkey.co.uk/r/YourFeedbackPB">feedback</a> will help us to improve it.
    </span>
    </p>
</div>

<div class="govuk-width-container">


    <a href="/apply/previous/applicant-british-citizen-or-eu-national" class="govuk-back-link">Back</a>


</div>



<div class="govuk-width-container">


    <main class="govuk-main-wrapper " id="main-content" role="main">

        <p>This is a valid page</p>

    </main>
</div>



<footer class="govuk-footer " role="contentinfo">
    <div class="govuk-width-container ">

        <div class="govuk-footer__meta">
            <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">


                <h2 class="govuk-visually-hidden">Support links</h2>
                <ul class="govuk-footer__inline-list">

                    <li class="govuk-footer__inline-list-item">
                        <a class="govuk-footer__link" href="/cookies">
                            Cookies
                        </a>
                    </li>

                    <li class="govuk-footer__inline-list-item">
                        <a class="govuk-footer__link" href="https://www.gov.uk/guidance/cica-privacy-notice">
                            Privacy notice
                        </a>
                    </li>

                    <li class="govuk-footer__inline-list-item">
                        <a class="govuk-footer__link" href="/contact-us">
                            Contact us
                        </a>
                    </li>

                </ul>



                <svg
                    role="presentation"
                    focusable="false"
                    class="govuk-footer__licence-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewbox="0 0 483.2 195.7"
                    height="17"
                    width="41"
                >
                    <path
                        fill="currentColor"
                        d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
                    />
                </svg>
                <span class="govuk-footer__licence-description">
          All content is available under the
          <a
              class="govuk-footer__link"
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              rel="license"
          >Open Government Licence v3.0</a>, except where otherwise stated
        </span>
            </div>
            <div class="govuk-footer__meta-item">
                <a
                    class="govuk-footer__link govuk-footer__copyright-logo"
                    href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
                >© Crown copyright</a>
            </div>
        </div>
    </div>
</footer>





<script nonce="somenonce" src="/govuk-frontend/all.js"></script>
<script nonce="somenonce">window.GOVUKFrontend.initAll()</script>

</body>
</html>`;

module.exports = html;
