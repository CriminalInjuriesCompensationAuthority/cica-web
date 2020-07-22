'use strict';

const path = require('path');

module.exports = {
    entry: {
        'bundle.js': [
            // bundles from the bottom up.
            path.resolve(__dirname, 'node_modules/js-cookie/src/js.cookie.js'),
            path.resolve(__dirname, 'node_modules/axios/dist/axios.min.js'),
            // path.resolve(__dirname, 'node_modules/time-convert/index.js'),
            path.resolve(__dirname, 'components/cica/modal/modal.js'),
            path.resolve(__dirname, 'src/js/scripts.js')
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'public/dist/js'),
        globalObject: 'window'
    },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'node_modules/js-cookie/'),
                    // path.resolve(__dirname, 'node_modules/axios/'),
                    path.resolve(__dirname, 'node_modules/time-convert/')
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: 3
                                        // https://github.com/browserslist/browserslist
                                        // targets:
                                        //     'last 6 versions, ie >= 9, Safari >= 12, ios_saf >= 10, iOS >= 10'
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    }
};
