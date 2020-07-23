'use strict';

module.exports = api => {
    api.cache(false);
    const presets = [
        [
            '@babel/preset-env',
            {
                corejs: {
                    version: 3
                },
                useBuiltIns: 'usage'
            }
        ]
    ];
    const plugins = [['@babel/transform-runtime']];
    return {
        presets,
        plugins
    };
};
