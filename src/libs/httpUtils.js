import axios from "axios";


axios.defaults.timeout = 500000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    function (request) {

        //加时间戳防止缓存
        if (request.url && request.url.indexOf("timestamp") == -1) {
            let nowTimestamp = new Date().getTime();
            request.url +=
                (request.url.indexOf("?") > -1 ? "&timestamp=" : "?timestamp=") +
                nowTimestamp;
        }
        return request;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        if (response.data.success == 0) {
            var flag = false;
            switch (response.data.err.code) {
                case "200001":
                case "100014":
                    ///没有登录信息，跳到登陆页面
                    top.window.location.href = config.loginUrl;
                    break;
                case "600001":
                    ////到错误页面,静态的页面
                    break;
                default:
                    return response;
            }

        } else {
            return response;
        }

    },
    function (error) {
        return Promise.reject(error);
    }
);




function get(url, params) {
    var httpInput = {
        params: params
    };

    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    return axios.get(url, httpInput, config);
}


function post(url, params, query) {
    if (query && Object.prototype.toString.call(query) == "[object Object]") {
        url += url.indexOf("?") > -1 ? "&" : "?";
        for (const key in query) {
            const value = query[key];
            url += key + "=" + value + "&";
        }
        url = url.substr(0, url.length - 1);
    }

    let config = {
        headers: {
            "Content-Type": "application/json"
        }
    };


    return axios.post(url, params, config);
}

function postByForm(url, params) {
    let formData = new FormData();
    if (params && Object.prototype.toString.call(params) == "[object Object]") {
        for (const key in params) {
            formData.append(key, params[key]);
        }
    }
    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    return axios.post(url, formData, config);
}


function upload(url, params) {
    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    return axios.post(url, params, config);
}


function download(url, params) {
    let config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    return axios.post(url, params, config);
}



export {
    get,
    post,
    postByForm,
    upload,
    download
}