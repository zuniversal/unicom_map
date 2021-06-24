import React from 'react';
import axios from 'axios';
import {message} from 'antd';
const setupAxios = () => {
    /**
     * default config
     * baseURL: 开发环境：'https://202.61.90.32/'，打包：''
    */
    Object.assign(axios.defaults, {
        // baseURL: '',
        timeout: 30000,
        header: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    /**
     * 请求拦截器处理
    */
    axios.interceptors.request.use(
        config => {
            if (config.url.startsWith('/sourceview') || config.url.startsWith('/hu_sand')) {
                config.url = (process.env.REACT_APP_NEW_API_BASE_PATH || '') + config.url;
                // console.log('config hu_sand ==> ', config)
            } else if (config.url.startsWith('/new_sq')) {
                config.url = (process.env.REACT_APP_NEU_SQ_PATH || '') + config.url;
                // console.log('config new_sq ==> ', config)
            } else if (config.url.startsWith('/')) {
                config.url = (process.env.REACT_APP_API_BASE_PATH || '') + config.url;
                // console.log('config / ==> ', config)
            }
            // if(req.method === 'post') {
            //     req.data = qs.stringify(req.data);
            // }
            return config;
        },
        error => {
            return Promise.error(error);
        }
    );

    /**
     * 服务端响应拦截器：(该项目服务处理code只有0和1)
     * 用于处理全局错误
     * 非全局错误则 resolve，全局错误则 reject
    */
    axios.interceptors.response.use(
        res => {
            // if (res.data.status !== 0 && res.data.message !== '未登录') {
            //     console.log(data.msg);
            // }
            return res;
        },
        err => {
            let code = err.response && err.response.status;
            let isGlobalErr = [400, 404, 413, 500, 502].indexOf(code) > -1;
            if (isGlobalErr) {
                console.log('网络错误，请稍后再试');
                // message.error('接口请求失败！请稍后再试');
            }
            return Promise.reject(err);
        }
    );
    // React.Component.prototype.$axios = axios;
};
export default setupAxios;
