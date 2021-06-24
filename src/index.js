import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from './app/store';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import setupAxios from './setupAxios';
require('promise.prototype.finally').shim();

setupAxios();

ReactDOM.render(
     <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider locale={zhCN} >
                
                <App />
            </ConfigProvider>
        </Provider>
      </React.StrictMode> ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
