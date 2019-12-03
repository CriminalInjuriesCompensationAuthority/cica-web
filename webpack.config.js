'use strict';

const path = require('path');

module.exports = {
    entry: {
        app: './srblahc/js/scripts.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist/js')
    },
    devtool: 'none',
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
                                        // https://github.com/browserslist/browserslist
                                        targets:
                                            'last 1 version, ie >= 11, Safari >= 12, ios_saf >= 10, iOS >= 10, > 0.25%, not dead'
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
