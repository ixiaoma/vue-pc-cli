import axios from 'axios';
import _API from './config'
import Vue from 'vue'
import {Message} from 'iview' 
import {router} from '../router/index'

axios.defaults.timeout = 300000;
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://10.100.50.27:19101/'
    Vue.prototype.baseURL = 'http://10.100.50.27:19101/'//根路径
    Vue.prototype.fileURL = 'http://file.ui-tech.cn/'//文件上传地址+文件下载地址
}else if(process.env.NODE_ENV == 'production'){
    axios.get('serverconfig.json').then(res=>{
        if(res.data.baseUrl){
            axios.defaults.baseURL = res.data.baseUrl
            Vue.prototype.baseURL = res.data.baseUrl
            Vue.prototype.fileURL = res.fileUrl
        }
    })
}
// http request 拦截器
axios.interceptors.request.use(config => {   
    config.headers = {
        'Content-Type': 'application/json'
    };
    let token = sessionStorage.getItem('cookieaccess_token');
    if (token) {
        config.headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
    }
    // config.url = config.url+'?random='+new Date().getTime()
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
        if (error.response) {//同一错误拦截
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
