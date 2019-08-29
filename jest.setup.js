'use strict';

jest.setTimeout(30000);
jest.testEnvironment = 'node';
process.env.DATA_CAPTURE_SERVICE = 'some_token';
process.env.DCS_JWT = 'A massive string';
process.env.CW_COOKIE_SECRET = 'Also a huge string';
process.env.CW_DCS_URL = 'http://docker.for.win.localhost:3100/api/v1';
