import axios from 'axios';
import _API from './config'
import {Message} from 'iview' 
import {router} from '../router/index'

axios.defaults.timeout = 300000;
axios.defaults.baseURL = '';//设置请求跟路径
// http request 拦截器
axios.interceptors.request.use(config => {   
    config.headers = {
        'Content-Type': 'application/json'
    };
    let token = sessionStorage.getItem('cookieaccess_token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    config.url = config.url+'?random='+new Date().getTime()
    config.data = JSON.stringify(config.data);
    return config;
},error => {
    return Promise.reject(error);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errCode == 2) {
            router.push({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}// 从哪个页面跳转
            });
        }
        return response;
    },
    error => {
        if (error.response) {//http错误统一拦截处理
            Message.error(error.response.data.message)
        }
    }
);

export function post (url, data = {}) {
    return axios.post(url, data)
}

export function get (url, data = {}) {
    return axios.get(url, data)
}
