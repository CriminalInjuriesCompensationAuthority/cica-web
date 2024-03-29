'use strict';

const {getDashboardURI} = require('.');

describe('getActionURIs', () => {
    describe('getDashboardURI', () => {
        it('Should return full URI including host and pathname', () => {
            expect(getDashboardURI()).toBe(`${process.env.CW_URL}/account/dashboard`);
        });
        it('Should return URI including path only', () => {
            expect(getDashboardURI(true)).toBe('/account/dashboard');
        });
    });
});
