'use strict';

// something is wrong withthis file?

const expectedSummaryHtml = {
    html:
        '<!DOCTYPE html>\r\n<html lang="en" class="govuk-template ">\r\n    <head>\r\n        <meta charset="utf-8">\r\n        <title>\r\n            \n                 Draft Application Summary - GOV.UK - The best place to find government services and information\n            \r\n        </title>\r\n        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\r\n        <meta name="theme-color" content="#0b0c0c">\r\n        \r\n        \r\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\r\n\r\n        \r\n            \r\n            <link rel="mask-icon" href="/assets/images/govuk-mask-icon.svg" color="#0b0c0c">\r\n            \r\n            <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/govuk-apple-touch-icon-180x180.png">\r\n            <link rel="apple-touch-icon" sizes="167x167" href="/assets/images/govuk-apple-touch-icon-167x167.png">\r\n            <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/govuk-apple-touch-icon-152x152.png">\r\n            <link rel="apple-touch-icon" href="/assets/images/govuk-apple-touch-icon.png">\r\n        \r\n\r\n        \r\n            <style>\r\n                .govuk-heading-xl {\r\n                    color: #0b0c0c;\r\n                    font-family: "GDS Transport", Arial, sans-serif;\r\n                    -webkit-font-smoothing: antialiased;\r\n                    -moz-osx-font-smoothing: grayscale;\r\n                    font-weight: 700;\r\n                    font-size: 32px;\r\n                    font-size: 2rem;\r\n                    line-height: 1.09375;\r\n                    display: block;\r\n                    margin-top: 0;\r\n                    margin-bottom: 30px;\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-xl {\r\n                        color: #000000;\r\n                        -webkit-font-smoothing: antialiased;\r\n                        -moz-osx-font-smoothing: grayscale;\r\n                        font-weight: 700;\r\n                        font-size: 32px;\r\n                        font-size: 2rem;\r\n                        line-height: 1.15;\r\n                        display: block;\r\n                        margin-top: 0;\r\n                        margin-bottom: 30px;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-xl {\r\n                        font-family: sans-serif;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-heading-xl {\r\n                        font-size: 48px;\r\n                        font-size: 3rem;\r\n                        line-height: 1.04167;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-heading-xl {\r\n                        margin-bottom: 50px;\r\n                    }\r\n                }\r\n\r\n                .govuk-heading-l {\r\n                    color: #0b0c0c;\r\n                    font-family: "GDS Transport", Arial, sans-serif;\r\n                    -webkit-font-smoothing: antialiased;\r\n                    -moz-osx-font-smoothing: grayscale;\r\n                    font-weight: 700;\r\n                    font-size: 24px;\r\n                    font-size: 1.5rem;\r\n                    line-height: 1.04167;\r\n                    display: block;\r\n                    margin-top: 0;\r\n                    margin-bottom: 20px;\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-l {\r\n                        color: #000000;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-l {\r\n                        font-family: sans-serif;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-heading-l {\r\n                        font-size: 36px;\r\n                        font-size: 2.25rem;\r\n                        line-height: 1.11111;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-l {\r\n                        font-size: 24pt;\r\n                        line-height: 1.05;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-heading-l {\r\n                        margin-bottom: 30px;\r\n                    }\r\n                }\r\n\r\n                .govuk-grid-row {\r\n                    margin-right: -15px;\r\n                    margin-left: -15px;\r\n                }\r\n\r\n                .govuk-grid-row:after {\r\n                    content: "";\r\n                    display: block;\r\n                    clear: both;\r\n                }\r\n\r\n                .govuk-grid-column-two-thirds {\r\n                    box-sizing: border-box;\r\n                    width: 100%;\r\n                    padding: 0 15px;\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-grid-column-two-thirds {\r\n                        width: 66.6666%;\r\n                        float: left;\r\n                    }\r\n                }\r\n\r\n                .govuk-template {\r\n                    overflow-y: scroll;\r\n                }\r\n\r\n                .govuk-template {\r\n                    background-color: #f3f2f1;\r\n                    text-size-adjust: 100%;\r\n                }\r\n\r\n                .govuk-template__body {\r\n                    margin: 0;\r\n                    background-color: #ffffff;\r\n                }\r\n\r\n                .govuk-width-container {\r\n                    max-width: 960px;\r\n                    margin: 0 15px;\r\n                }\r\n\r\n                @supports (margin: max(calc(0px))) {\r\n                    .govuk-width-container {\r\n                        margin-right: max(15px, calc(15px + env(safe-area-inset-right)));\r\n                        margin-left: max(15px, calc(15px + env(safe-area-inset-left)));\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-width-container {\r\n                        margin: 0 30px;\r\n                    }\r\n\r\n                    @supports (margin: max(calc(0px))) {\r\n                        .govuk-width-container {\r\n                            margin-right: max(30px, calc(15px + env(safe-area-inset-right)));\r\n                            margin-left: max(30px, calc(15px + env(safe-area-inset-left)));\r\n                        }\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 1020px) {\r\n                    .govuk-width-container {\r\n                        margin: 0 auto;\r\n                    }\r\n\r\n                    @supports (margin: max(calc(0px))) {\r\n                        .govuk-width-container {\r\n                            margin: 0 auto;\r\n                        }\r\n                    }\r\n                }\r\n\r\n                .govuk-main-wrapper {\r\n                    display: block;\r\n                    padding-top: 20px;\r\n                    padding-bottom: 20px;\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-main-wrapper {\r\n                        padding-top: 40px;\r\n                        padding-bottom: 40px;\r\n                    }\r\n                }\r\n\r\n                .govuk-summary-list {\r\n                    font-family: "GDS Transport", Arial, sans-serif;\r\n                    -webkit-font-smoothing: antialiased;\r\n                    -moz-osx-font-smoothing: grayscale;\r\n                    font-weight: 400;\r\n                    font-size: 16px;\r\n                    font-size: 1rem;\r\n                    line-height: 1.25;\r\n                    color: #0b0c0c;\r\n                    margin: 0 0 20px;\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-summary-list {\r\n                        font-family: sans-serif;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list {\r\n                        font-size: 19px;\r\n                        font-size: 1.1875rem;\r\n                        line-height: 1.31579;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-summary-list {\r\n                        font-size: 14pt;\r\n                        line-height: 1.15;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-summary-list {\r\n                        color: #000000;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list {\r\n                        display: table;\r\n                        width: 100%;\r\n                        table-layout: fixed;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list {\r\n                        margin-bottom: 30px;\r\n                    }\r\n                }\r\n\r\n                .govuk-heading-l {\r\n                    color: #0b0c0c;\r\n                    font-family: "GDS Transport", Arial, sans-serif;\r\n                    -webkit-font-smoothing: antialiased;\r\n                    -moz-osx-font-smoothing: grayscale;\r\n                    font-weight: 700;\r\n                    font-size: 24px;\r\n                    font-size: 1.5rem;\r\n                    line-height: 1.04167;\r\n                    display: block;\r\n                    margin-top: 0;\r\n                    margin-bottom: 20px;\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-l {\r\n                        color: #000000;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-l {\r\n                        font-family: sans-serif;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-heading-l {\r\n                        font-size: 36px;\r\n                        font-size: 2.25rem;\r\n                        line-height: 1.11111;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-heading-l {\r\n                        font-size: 24pt;\r\n                        line-height: 1.05;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-heading-l {\r\n                        margin-bottom: 30px;\r\n                    }\r\n                }\r\n\r\n                .govuk-\\!-margin-bottom-9 {\r\n                    margin-bottom: 40px !important;\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-\\!-margin-bottom-9 {\r\n                        margin-bottom: 60px !important;\r\n                    }\r\n                }\r\n\r\n                .govuk-summary-list {\r\n                    font-family: "GDS Transport", Arial, sans-serif;\r\n                    -webkit-font-smoothing: antialiased;\r\n                    -moz-osx-font-smoothing: grayscale;\r\n                    font-weight: 400;\r\n                    font-size: 16px;\r\n                    font-size: 1rem;\r\n                    line-height: 1.25;\r\n                    color: #0b0c0c;\r\n                    margin: 0 0 20px;\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-summary-list {\r\n                        font-family: sans-serif;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list {\r\n                        font-size: 19px;\r\n                        font-size: 1.1875rem;\r\n                        line-height: 1.31579;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-summary-list {\r\n                        font-size: 14pt;\r\n                        line-height: 1.15;\r\n                    }\r\n                }\r\n\r\n                @media print {\r\n                    .govuk-summary-list {\r\n                        color: #000000;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list {\r\n                        display: table;\r\n                        width: 100%;\r\n                        table-layout: fixed;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list {\r\n                        margin-bottom: 30px;\r\n                    }\r\n                }\r\n\r\n                @media (max-width: 40.0525em) {\r\n                    .govuk-summary-list__row {\r\n                        margin-bottom: 15px;\r\n                        border-bottom: 1px solid #b1b4b6;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list__row {\r\n                        display: table-row;\r\n                    }\r\n                }\r\n\r\n                .govuk-\\!-width-one-half {\r\n                    width: 100% !important;\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-\\!-width-one-half {\r\n                        width: 50% !important;\r\n                    }\r\n                }\r\n\r\n                .govuk-summary-list__actions,\r\n                .govuk-summary-list__key,\r\n                .govuk-summary-list__value {\r\n                    margin: 0;\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n\r\n                    .govuk-summary-list__actions,\r\n                    .govuk-summary-list__key,\r\n                    .govuk-summary-list__value {\r\n                        display: table-cell;\r\n                        padding-right: 20px;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n\r\n                    .govuk-summary-list__actions,\r\n                    .govuk-summary-list__key,\r\n                    .govuk-summary-list__value {\r\n                        padding-top: 10px;\r\n                        padding-bottom: 10px;\r\n                        border-bottom: 1px solid #b1b4b6;\r\n                    }\r\n                }\r\n\r\n                .govuk-summary-list__actions {\r\n                    margin-bottom: 15px;\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list__actions {\r\n                        width: 20%;\r\n                        padding-right: 0;\r\n                        text-align: right;\r\n                    }\r\n                }\r\n\r\n                .govuk-summary-list__key,\r\n                .govuk-summary-list__value {\r\n                    word-wrap: break-word;\r\n                    overflow-wrap: break-word;\r\n                }\r\n\r\n                .govuk-summary-list__key {\r\n                    margin-bottom: 5px;\r\n                    font-weight: 700;\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list__key {\r\n                        width: 30%;\r\n                    }\r\n                }\r\n\r\n                @media (max-width: 40.0525em) {\r\n                    .govuk-summary-list__value {\r\n                        margin-bottom: 15px;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list__value {\r\n                        width: 50%;\r\n                    }\r\n                }\r\n\r\n                @media (min-width: 40.0625em) {\r\n                    .govuk-summary-list__value:last-child {\r\n                        width: 70%;\r\n                    }\r\n                }\r\n\r\n                .govuk-summary-list__value > p {\r\n                    margin-bottom: 10px;\r\n                }\r\n\r\n                .govuk-summary-list__value > :last-child {\r\n                    margin-bottom: 0;\r\n                }\r\n\r\n                .div-header-address {\r\n                    font-size: 24px;\r\n                }\r\n\r\n                .div-draft-size {\r\n                    font-size: 30px;\r\n                }\r\n\r\n                .div-black-box {\r\n                    background-color: black;\r\n                    padding: 20px;\r\n                    color: white;\r\n                    font-size: 24px;\r\n                }\r\n            </style>\r\n        \r\n\r\n    </head>\r\n    <body class="govuk-template__body ">\r\n        \r\n\r\n            <div class="govuk-width-container ">\r\n                <br>\r\n                <div class="div-header-address">\r\n                    <b>CICA </b>\r\n                    <br>\r\n            Alexander Bain House <br>\r\n            Atlantic Quay <br>\r\n            15 York Street <br>\r\n            Glasgow <br>\r\n            G2 8JQ <br>\r\n                    <br>\r\n\r\n            Telephone: 0300 003 3601 <br>\r\n                    <a href="www.cica.gov.uk">www.cica.gov.uk</a>\r\n                </div>\r\n                <br><br>\r\n                <div class="div-draft-size">\r\n                    <h1>\r\n                        <b>DRAFT COPY:</b>CICA application</h1>\r\n                </div>\r\n                <br><br><br>\r\n                <div class="div-black-box">\r\n            This is a summary of your answers. <b>It does not represent a complete application.</b>\r\n                </div>\r\n            </div>\r\n        \r\n\r\n        \r\n\r\n        \r\n            <div class="govuk-width-container ">\r\n                \r\n                <main class="govuk-main-wrapper " id="main-content" role="main">\r\n                    \r\n                        <div class="govuk-grid-row">\r\n                            <div class="govuk-grid-column-two-thirds">\r\n                                              \n                \n            \n            \n            <h2 class="govuk-heading-l">About your application</h2>\n                  \n\n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n<dl class="govuk-summary-list govuk-!-margin-bottom-9">\n  \n    \n      <div class="govuk-summary-list__row">\n        <dt class="govuk-summary-list__key govuk-!-width-one-half">\n          What would you like to do?\n        </dt>\n        <dd class="govuk-summary-list__value">\n          Start a new application\n        </dd>\n        \n      </div>\n    \n  \n    \n      <div class="govuk-summary-list__row">\n        <dt class="govuk-summary-list__key govuk-!-width-one-half">\n          Are you applying because someone died?\n        </dt>\n        <dd class="govuk-summary-list__value">\n          No\n        </dd>\n        \n      </div>\n    \n  \n    \n      <div class="govuk-summary-list__row">\n        <dt class="govuk-summary-list__key govuk-!-width-one-half">\n          Was the crime reported to the police?\n        </dt>\n        <dd class="govuk-summary-list__value">\n          Yes\n        </dd>\n        \n      </div>\n    \n  \n    \n      <div class="govuk-summary-list__row">\n        <dt class="govuk-summary-list__key govuk-!-width-one-half">\n          Do you have a crime reference number?\n        </dt>\n        <dd class="govuk-summary-list__value">\n          Yes\n        </dd>\n        \n      </div>\n    \n  \n    \n      <div class="govuk-summary-list__row">\n        <dt class="govuk-summary-list__key govuk-!-width-one-half">\n          Who are you applying for?\n        </dt>\n        <dd class="govuk-summary-list__value">\n          Myself\n        </dd>\n        \n      </div>\n    \n  \n    \n      <div class="govuk-summary-list__row">\n        <dt class="govuk-summary-list__key govuk-!-width-one-half">\n          Are you 18 or over?\n        </dt>\n        <dd class="govuk-summary-list__value">\n          Yes\n        </dd>\n        \n      </div>\n    \n  \n    \n      <div class="govuk-summary-list__row">\n        <dt class="govuk-summary-list__key govuk-!-width-one-half">\n          Are you a British citizen or EU national?\n        </dt>\n        <dd class="govuk-summary-list__value">\n          Yes\n        </dd>\n        \n      </div>\n    \n  \n</dl>\n      \n            \r\n                            </div>\r\n                        </div>\r\n                    \r\n                </main>\r\n            </div>\r\n        \r\n\r\n        \r\n    </body>\r\n    <footer class="govuk-footer " role="contentinfo">\r\n        <div class="govuk-width-container ">\r\n            Downloaded on Saturday, January 1, 2022 5:15 PM\r\n        </div>\r\n    </footer>\r\n    <br><br><br><br><br>\r\n</html>'
};

module.exports = expectedSummaryHtml;
