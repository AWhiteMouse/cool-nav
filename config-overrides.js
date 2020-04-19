const { override, fixBabelImports } = require('customize-cra');

const stylus = () => config => {
    const stylusLoader = {
        test: /\.styl$/,
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'stylus-loader',
            },
        ],
    };
    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
    oneOf.unshift(stylusLoader);
    return config;
};

module.exports = override(
    // 这里配置 antd 的按需加载
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    stylus()
);
