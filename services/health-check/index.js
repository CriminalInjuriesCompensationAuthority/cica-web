'use strict';

function createHealthCheckService() {
    function getHealth() {
        return {
            // `process.env.npm_package_version` only works if you use `npm start` to run the app.
            applicationVersion: process.env.npm_package_version
        };
    }

    return Object.freeze({
        getHealth
    });
}

module.exports = createHealthCheckService;
