'use strict';

const createDateHelper = require('../index/dateHelper');

describe('Date Helper', () => {
    describe('isBetween', () => {
        it('should compare a date between 2 dates', () => {
            const dateHelper = createDateHelper();
            const dateToCompare = `2020-01-01T13:30:00.000Z`;
            const start = `2020-01-01T01:30:00.000Z`;
            const end = `2020-01-01T23:30:00.000Z`;
            const result = dateHelper.isBetween(dateToCompare, start, end);
            expect(result).toEqual(true);
        });
        it('should compare a date not between 2 dates', () => {
            const dateHelper = createDateHelper();
            const dateToCompare = `2019-01-01T13:30:00.000Z`;
            const start = `2020-01-01T01:30:00.000Z`;
            const end = `2020-01-01T23:30:00.000Z`;
            const result = dateHelper.isBetween(dateToCompare, start, end);
            expect(result).toEqual(false);
        });
    });
});
