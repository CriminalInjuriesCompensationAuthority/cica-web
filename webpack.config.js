'use strict';

const path = require('path');

module.exports = {
    // entry: {
    //     'bundle.js': [
    //         // bundles from the bottom up.
    //         path.resolve(__dirname, 'components/cica/modal/modal.js'),
    //         path.resolve(__dirname, 'node_modules/axios/'),
    //         path.resolve(__dirname, 'src/js/scripts.js')
    //     ]
    // },
    entry: {
        'bundle.js': [
            'core-js/stable',
            // bundles from the bottom up.
            path.resolve(__dirname, 'components/cica/modal/modal.js'),
            path.resolve(__dirname, 'src/js/scripts.js')
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'public/dist/js')
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'node_modules/js-cookie/'),
                    path.resolve(__dirname, 'node_modules/time-convert/')
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
};
