import axios from 'axios';
import _API from './config'
import Vue from 'vue'
import {Message} from 'iview' 
import store from '../store/index'

axios.defaults.timeout = 300000;
axios.defaults.baseURL = 'http://api.tele.giftree.com.cn/'
Vue.prototype.baseURL = 'http://api.tele.giftree.com.cn/'
Vue.prototype.fileURL = 'http://file.giftree.com.cn/'
// if(process.env.NODE_ENV == 'production'){
//     axios.defaults.baseURL = 'http://api.tele.giftree.com.cn/'
//     Vue.prototype.baseURL = 'http://api.tele.giftree.com.cn/'
//     Vue.prototype.fileURL = 'http://file.giftree.com.cn/'
// }
// http request 拦截器
axios.interceptors.request.use(config => {   
    config.headers = {
        'Content-Type': 'application/json'
    };
    if(config.url != _API.API_LOGIN && config.url != _API.API_LOGIN_OUT){
        let token = sessionStorage.getItem('cookieaccess_token');
        if (token) {
            config.headers = {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            };
        }
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
        return response;
    },
    error => {
        if(error.response.status == 403){
            store.commit('logout')
            Message.error({content:'权限过期，请重新登录',duration:5})
        }else{
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
