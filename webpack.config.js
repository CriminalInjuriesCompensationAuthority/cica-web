'use strict';

const path = require('path');

module.exports = {
    entry: {
        'bundle.js': [
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
    node: {
        // you get this error due to how ajax-request module works
        //     ERROR in ./node_modules/file-system/file-system.js
        //     Module not found: Error: Can't resolve 'fs' in '/usr/src/app/node_modules/file-system'
        // this tells webpack to ignore `fs` stuff. we don't need it anyway.
        // https://github.com/webpack-contrib/css-loader/issues/447
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                        // https://github.com/browserslist/browserslist
                                        targets:
                                            'last 1 version, ie >= 11, Safari >= 12, ios_saf >= 10, iOS >= 10'
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
