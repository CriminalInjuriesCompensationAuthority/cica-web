'use strict';

const moment = require('moment');

function createDateHelper() {
    function isBetween(dateInput, dateStart, dateEnd) {
        return moment(dateInput).isBetween(dateStart, dateEnd);
    }

    function getFullTime(date) {
        return `${date
            .getHours()
            .toString()
            .padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${date
            .getSeconds()
            .toString()
            .padStart(2, '0')}.${date
            .getMilliseconds()
            .toString()
            .padStart(3, '0')}`;
    }

    return Object.freeze({
        isBetween,
        getFullTime
    });
}

module.exports = createDateHelper;
