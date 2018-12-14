let baseUrl = ''; ///访问后台接口的实际地址
let routerMode = 'hash';//路由模式
let env = 'dev';//

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://127.0.0.1';


} else if (process.env.NODE_ENV == 'production') {
    baseUrl = 'http://10.99.60.118';
    env='pro';
}

export {
    baseUrl, routerMode,env
}