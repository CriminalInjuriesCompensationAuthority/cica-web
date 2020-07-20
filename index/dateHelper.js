'use strict';

const moment = require('moment');

function createDateHelper() {
    function isBetween(dateInput, dateStart, dateEnd) {
        return moment(dateInput).isBetween(dateStart, dateEnd);
    }

    return Object.freeze({
        isBetween
    });
}

module.exports = createDateHelper;
