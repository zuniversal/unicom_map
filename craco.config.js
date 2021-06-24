const CracoLessPlugin = require('craco-less');
const path = require('path');
const apiMocker = require('webpack-api-mocker')
const HttpProxyAgent = require('http-proxy-agent')

const agent = process.env.PROXY_AGENT ? new HttpProxyAgent(process.env.PROXY_AGENT) : undefined

const proxyCommonConfig = {
    target: 'http://10.244.6.92:8088', // 这个是被替换的目标地址
    secure: true, // 接受对方是https的接口
    changeOrigin: true, // 是否需要跨域
};

const proxy5gConfig = {
    target: 'http://10.236.20.81:7005', // 这个是被替换的目标地址
    secure: true, // 接受对方是https的接口
    changeOrigin: true, // 是否需要跨域
};

const proxyBoundaryConfig = {
    target: 'http://10.244.6.92:8081', // 这个是被替换的目标地址
    secure: true, // 接受对方是https的接口
    changeOrigin: true, // 是否需要跨域
};

// 登录接口代理
const proxyDirectLoginConfig = {
    // target: 'http://10.177.71.123:988/', // 代理到中转服务器
    target: 'http://10.244.6.92:8030', // 代理到中转服务器
    secure: true, // 接受对方是https的接口
    changeOrigin: true, // 是否需要跨域
    agent,
};

const proxyNcNewConfig = {
    target: 'http://10.177.71.123:988/', // 代理到中转服务器
    secure: true, // 接受对方是https的接口
    changeOrigin: true, // 是否需要跨域
};

const proxySandboxConfig = {
    target: 'http://10.236.20.81:7005/', // 代理到中转服务器
    secure: true, // 接受对方是https的接口
    changeOrigin: true, // 是否需要跨域
};
const proxyNewSqConfig = {
    target: 'http://10.124.199.137:8080/', // 代理到中转服务器
    
    secure: true, // 接受对方是https的接口
    changeOrigin: true, // 是否需要跨域
    pathRewrite: {'^/new_sq' : ''},
    agent,
}
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            'react-virtualized/List': 'react-virtualized/dist/es/List',
        },
    },
    babel: {
        plugins: [
            ['import', {'libraryName': 'antd', 'libraryDirectory': 'lib', 'style': true}, 'antd'],
            ['import', {'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true}, 'antd-mobile'],
            ['@babel/plugin-proposal-decorators', {'legacy': true}],
        ],
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {'@primary-color': '#3676fe'},
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: CracoLessPlugin,
            options: {
                modifyLessRule: function (lessRule, _context) {
                    lessRule.test = /\.(module)\.(less)$/;
                    lessRule.exclude = /node_modules/;

                    return lessRule;
                },
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
                cssLoaderOptions: {
                    modules: {localIdentName: '[local]_[hash:base64:5]'},
                },
            },
        },
    ],
    devServer: {
        before(app) {
            if (process.env.REACT_APP_MOCK) {
                apiMocker(app, path.resolve('./mock/index.js'))
            }
        },
        proxy: {
            '/hu_sand': proxySandboxConfig,
            '/nc': proxyCommonConfig,
            '/5g': proxy5gConfig,
            '/5gunicom2': proxyCommonConfig,
            '/building': proxyCommonConfig,
            '/sq': proxyCommonConfig,
            '/sourceview': proxyDirectLoginConfig,
            '/new_sq': proxyNewSqConfig,
            // '/boundaryGeoJson': proxyBoundaryConfig,
        },
    },
};
