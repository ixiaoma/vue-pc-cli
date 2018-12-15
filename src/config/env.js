let baseUrl = ''; ///访问后台接口的实际地址
let env = 'dev';//

if (process.env.NODE_ENV == 'development') {
    baseUrl = '//10.122.29.3:9086/';
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = '//10.122.29.3:9086/';
    env='prod';
}

export {
    baseUrl,env
}