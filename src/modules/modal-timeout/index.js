/* global SESSION_DURATION, CustomEvent */
import AjaxRequest from '../ajax-request';
import Modal from '../../../components/cica/modal/modal';

// source: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
// eslint-disable-next-line consistent-return
(() => {
    if (typeof window.CustomEvent === 'function') {
        return false;
    }

    function CustomEvent(event, params) {
        // eslint-disable-next-line no-param-reassign
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        const evt = window.document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

function createTimeoutModal(window) {
    // We need to clear the timeouts when an application is resumed. This is
    // due the same element being used each time the "session timing out" modal
    // appears. If we don't clear the timeouts, then there will be as many updates
    // per second as as many modals there has been. i.e. if you are seeing the
    // "session timing out" modal for the 3rd time, there will be 3 timeouts every
    // second that will update the DOM.
    // this is a cache of all timeouts that is cleared when needed.
    let timeoutsArray = [];
    let modal;

    function convertSecondsToMinutesAndSeconds(duration) {
        const durationInSeconds = Math.floor(duration / 1000);
        const minutes = Number.parseInt(durationInSeconds / 60, 10);
        const seconds = durationInSeconds % 60;
        let minutesText = '';
        let secondsText = '';
        let conjunctionText = '';

        if (minutes) {
            minutesText = minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
        }
        if (seconds) {
            secondsText = seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
        }
        if (minutes && seconds) {
            conjunctionText = ' and ';
        }
        return `${minutesText}${conjunctionText}${secondsText}`;
    }

    function updateTimeRemainingText(el, timeRemaining, interval, dialogBox) {
        const element = el;
        element.innerHTML = convertSecondsToMinutesAndSeconds(timeRemaining);

        window.clearTimeout(timeoutsArray.pop()); // remove last item in the array as it has done its job.
        const newTimeRemaining = Math.round((timeRemaining - interval) / interval) * interval;
        // if there is an repeating interval, and if the time remaining
        // still has a value that can be reduced by `interval`.
        if (interval && timeRemaining >= interval) {
            const timeout = setTimeout(
                updateTimeRemainingText,
                interval,
                el,
                newTimeRemaining,
                interval,
                dialogBox
            );
            timeoutsArray.push(timeout);
            return;
        }

        const event = new CustomEvent('TIMED_OUT');
        dialogBox.dispatchEvent(event);
    }

    function resumeClickHandler(settings) {
        new AjaxRequest('/', 'GET')
            .then(() => {
                settings.dialogBoxResumeCTA.removeEventListener('click', resumeClickHandler);
                timeoutsArray.forEach(x => {
                    window.clearTimeout(x);
                });
                timeoutsArray = [];
                modal.close();
                // eslint-disable-next-line no-use-before-define
                setUpModal({
                    dialogBox: settings.dialogBox,
                    modalOptions: settings.modalOptions,
                    showIn: settings.showIn,
                    dialogBoxResumeCTA: settings.dialogBoxResumeCTA
                });
            })
            .catch(() => {
                const event = new CustomEvent('MODAL_ERROR_RESUME_FAILURE');
                settings.dialogBox.dispatchEvent(event);
            });
    }

    function setUpModal(settings) {
        modal = new Modal(settings.dialogBox).init(settings.modalOptions);

        settings.dialogBox.addEventListener('TIMED_OUT', () => {
            modal.close();
        });

        const timeRemainingElements = settings.dialogBox.querySelectorAll(
            '.govuk-modal__time-remaining'
        );

        timeRemainingElements.forEach(el => {
            updateTimeRemainingText(el, SESSION_DURATION, 1000, settings.dialogBox);
        });

        if (settings.dialogBoxResumeCTA) {
            // close dialogue on 'resume application'.
            settings.dialogBoxResumeCTA.addEventListener('click', () => {
                resumeClickHandler(settings);
            });
        }

        if (settings.showIn) {
            if (Array.isArray(settings.showIn)) {
                settings.showIn.forEach(timeUntil => {
                    if (!Number.isNaN(timeUntil)) {
                        const timeout = window.setTimeout(modal.open, timeUntil);
                        timeoutsArray.push(timeout);
                    }
                });
            }
        } else {
            modal.open();
        }
    }

    function init(options) {
        const dialogBox = window.document.querySelector(options.element);
        const dialogBoxResumeCTA = dialogBox.querySelector(options.resumeElement);

        if (dialogBox) {
            const modalOptions = {};
            if (dialogBoxResumeCTA) {
                modalOptions.focusElement = dialogBoxResumeCTA;
            }

            setUpModal({
                dialogBox,
                modalOptions,
                showIn: options.showIn,
                dialogBoxResumeCTA,
                onTimeout: options.onTimeout
            });
        }
    }

    return Object.freeze({
        init
    });
}

export default createTimeoutModal;
