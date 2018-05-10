'use strict';
/** http Service 封装后的使用方法与axios一致。
** 后续的timeout,公共的headers,将通过config/config.js文件引入 
*/
import {baseUrl} from '/config/config.js';
import AuthLogin from '/util/authLogin.js';
const parseUrl = (reUrl,queryStringObject)=>{
    let url = `${baseUrl}/${reUrl}`;
    let access_token = my.getStorageSync({key:'access_token'}).data || '';
    let platform = 'alipaymini'; //标识支付宝应用
    queryStringObject = Object.assign({}, queryStringObject, {
        platform,
        access_token
    });

    if(queryStringObject && typeof queryStringObject === 'object')
    {
        url += '?'
        for(let key in queryStringObject)
        {
            if(queryStringObject.hasOwnProperty(key))
            {
                url = `${url}&${key}=${queryStringObject[key]}`
            }
        }
    }
    return url;
}

const erroCodeState = (res) => {
    console.log(res);
    if(res.status == 200){
        if(res.data && res.data.status != 'ok' && res.data.error){
            //支付宝token超时状态 和 单点登录状态 access_token 超时 从新触发登录
            if(res.data.error.code == '11008' || res.data.error.code == '26001'){
                AuthLogin.login();
            }else{
                my.showToast({
                    type:'none',
                    content: res.data.error.message || res.data.error.code,
                    duration: 1000
                });
            }
        }
    }
}

export const get = (url,config)=>{
    return new Promise((resolve,reject)=>{
        let requstConfig = {
                method:'get',
<<<<<<< HEAD
                url:parseUrl(url,config.params),
                headrs:config.headrs || {},
                success:(...arg)=>{
                    erroCodeState(...arg);
                    resolve(...arg);
                    },
=======
                url:parseUrl(`${baseUrl}/${url}`,config.params),
                headrs: { 'Content-Type': 'text/html; charset=utf-8' },
                success:(res)=>{resolve(res.data)},
>>>>>>> feature/mly
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const post = (url,data,config)=>{
    return new Promise((resolve,reject)=>{
        let access_token = my.getStorageSync({key:'access_token'}).data || '';
        let platform = 'alipaymini'; //标识支付宝应用
        data = Object.assign({}, data, {access_token,platform});
        let requstConfig = {
                method:'post',
                url:parseUrl(url,config.params),
                headrs:config.headrs || {},
                data,
<<<<<<< HEAD
                success:(...arg)=>{
                    erroCodeState(...arg);
                    resolve(...arg);
                },
=======
                success: (res) => { resolve(res.data)},
>>>>>>> feature/mly
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const put = (url,data,config)=>{
    return new Promise((resolve,reject)=>{
        let access_token = my.getStorageSync({key:'access_token'}).data || '';
        let platform = 'alipaymini'; //标识支付宝应用
        data = Object.assign({}, data, {access_token,platform});
        let requstConfig = {
                method:'put',
                url:parseUrl(url,config.params),
                headrs:config.headrs || {},
                data,
<<<<<<< HEAD
                success:(...arg)=>{
                    erroCodeState(...arg);
                    resolve(...arg);
                },
=======
                success: (res) => { resolve(res.data)},
>>>>>>> feature/mly
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const del = (url, data, params)=>{
    return new Promise((resolve,reject)=>{
        let access_token = my.getStorageSync({key:'access_token'}).data || '';
        let platform = 'alipaymini'; //标识支付宝应用
        data = Object.assign({}, data, {access_token,platform});
        let requstConfig = {
                method:'delete',
                url:parseUrl(url,config.params),
                headrs:config.headrs || {},
                data,
<<<<<<< HEAD
                success:(...arg)=>{
                    erroCodeState(...arg);
                    resolve(...arg);
                },
=======
                success: (res) => { resolve(res.data) },
>>>>>>> feature/mly
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const request = (config)=>{
    return new Promise((resolve,reject)=>{
        let access_token = my.getStorageSync({key:'access_token'}).data || '';
        let platform = 'alipaymini'; //标识支付宝应用
        config.data = Object.assign({}, config.data, {access_token,platform});
        if(!config.success){
            config.success = (...arg)=>{
                erroCodeState(...arg);
                resolve(arg)
            };
        }
         if(!config.fail){
            config.success = (...arg)=>{reject(arg)};
        }
        
        my.httpRequest(config);
    })
}
