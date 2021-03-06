'use strict';
/** http Service 封装后的使用方法与axios一致。
 ** 后续的timeout,公共的headers,将通过config/config.js文件引入
 */
import {baseUrl} from '/config/config.js';
import Util from '/util/util.js';
import loading from '/util/loading.js'
import AuthLogin from '/util/authLogin.js';
import * as aliApi from '/util/aliApi.js';

var oneTargetLogin = true;
const test_access_token = ''

const initConfig = {
    params: {},
    headers: {
        'Content-Type': 'application/json'
    },
    isCheckErroCode: true, // 是否检测 erroCodeState 状态
    isToast: true // 是否走通用 Toast
};
const parseUrl = (reUrl,queryStringObject)=>{
    let url = `${baseUrl}/${reUrl}`;
    let access_token = my.getStorageSync({ key: 'access_token' }).data || test_access_token;

    let platform = 'alipaymini'; //标识支付宝应用
    if(queryStringObject.isAccess){ //true 是不需要权限的， false 是需要权限
        queryStringObject = Object.assign({}, queryStringObject, {
            platform
        });
    }else{
        queryStringObject = Object.assign({}, queryStringObject, {
            platform,
            access_token
        });
    }

    if(queryStringObject && !Util.isEmptyObject(queryStringObject)){
        url += '?' + Util.objectToString(queryStringObject);
    }
    return url;
}

const erroCodeState = (res, config) => {
    if(config.isCheckErroCode){
        if(res.status == 200){
            if(res.data && res.data.status != 'ok' && res.data.error){
                //支付宝token超时状态 和 单点登录状态 access_token 超时 从新触发登录
                if((res.data.error.code == '11008' || res.data.error.code == '26001' || res.data.error.code == '17003') && oneTargetLogin){
                    AuthLogin.login();
                    oneTargetLogin = false;
                    return false;
                }else{
                    loading.hide();
                    if(config.isToast){
                        aliApi.showToast({
                            type:'none',
                            content: res.data.error.message || res.data.error.code,
                            duration: 1000
                        });
                    }
                    oneTargetLogin = true;
                }
            }else{
                oneTargetLogin = true;
            }
        }
    }
}

export const get = (url,config)=>{
    return new Promise((resolve,reject)=>{
        config = Object.assign({}, initConfig, config);
        let requstConfig = {
            method:'get',
            url:parseUrl(url,config.params),
            headers:config.headers || {},
            success:(...arg)=>{
                erroCodeState(...arg, config);
                resolve(...arg);
            },
            fail:(...arg)=>{reject(...arg)}
        };
        my.httpRequest(requstConfig);
    })
}

export const post = (url,data,config)=>{
    return new Promise((resolve,reject)=>{
        config = Object.assign({}, initConfig, config);
        let access_token = my.getStorageSync({ key: 'access_token' }).data || test_access_token;
        let platform = 'alipaymini'; //标识支付宝应用
        data = Object.assign({}, data, {access_token,platform});
        data = JSON.stringify(data)
        let requstConfig = {
            method:'post',
            url:parseUrl(url,config.params),
            headers:config.headers || {},
            data,
            success:(...arg)=>{
                erroCodeState(...arg, config);
                resolve(...arg);
            },
            fail:(...arg)=>{reject(...arg)}
        };
        my.httpRequest(requstConfig);
    })
}

export const put = (url,data,config)=>{
    return new Promise((resolve,reject)=>{
        config = Object.assign({}, initConfig, config);
        let access_token = my.getStorageSync({ key: 'access_token' }).data || test_access_token;
        let platform = 'alipaymini'; //标识支付宝应用
        data = Object.assign({}, data, {access_token,platform});
        let requstConfig = {
            method:'put',
            url:parseUrl(url,config.params),
            headers:config.headers || {},
            data,
            success:(...arg)=>{
                erroCodeState(...arg, config);
                resolve(...arg);
            },
            fail:(...arg)=>{reject(...arg)}
        };
        my.httpRequest(requstConfig);
    })
}

export const del = (url, data, params)=>{
    return new Promise((resolve,reject)=>{
        config = Object.assign({}, initConfig, config);
        let access_token = my.getStorageSync({key:'access_token'}).data || '';
        let platform = 'alipaymini'; //标识支付宝应用
        data = Object.assign({}, data, {access_token,platform});
        let requstConfig = {
            method:'delete',
            url:parseUrl(url,config.params),
            headers:config.headers || {},
            data,
            success:(...arg)=>{
                erroCodeState(...arg, config);
                resolve(...arg);
            },
            fail:(...arg)=>{reject(...arg)}
        };
        my.httpRequest(requstConfig);
    })
}

export const request = (config)=>{
    return new Promise((resolve,reject)=>{
        config = Object.assign({}, initConfig, config);
        let access_token = my.getStorageSync({key:'access_token'}).data || '';
        let platform = 'alipaymini'; //标识支付宝应用
        config.data = Object.assign({}, config.data, {access_token,platform});
        if(!config.success){
            config.success = (...arg)=>{
                erroCodeState(...arg, config);
                resolve(arg)
            };
        }
        if(!config.fail){
            config.success = (...arg)=>{reject(arg)};
        }

        my.httpRequest(config);
    })
}
