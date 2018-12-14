import {post,get} from "@/libs/httpUtils"
import {baseUrl} from "@/config/env"

//用户登陆
export const userLogin=function(params) {
  console.log('userLogin');
    return post(baseUrl + "/api/", params);
  }

//   //得到用户信息
// export const getUserInfo=function(token) {  
//   return post(baseUrl + "/api/", {token:token});
// }


