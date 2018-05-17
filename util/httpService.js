'use strict';
/** http Service 封装后的使用方法与axios一致。
 ** 后续的timeout,公共的headers,将通过config/config.js文件引入
 */
import {baseUrl} from '/config/config.js';
import Util from '/util/util.js';
import AuthLogin from '/util/authLogin.js';

const token_for_dalao =   '2f2abfdbe199028d54f9695df8e86c3e'
const test_access_token = 'c9084aa020b39db759c5c8ae58aa6fbf'

const initConfig = {
    params: {},
    headrs: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};
const parseUrl = (reUrl,queryStringObject)=>{
    let url = `${baseUrl}/${reUrl}`;
    let access_token = my.getStorageSync({ key: 'access_token' }).data || token_for_dalao;
    let platform = 'alipaymini'; //标识支付宝应用
    queryStringObject = Object.assign({}, queryStringObject, {
        platform,
        access_token
    });

    if(queryStringObject && !Util.isEmptyObject(queryStringObject)){
        url += '?' + Util.objectToString(queryStringObject);
    }
    return url;
}

const erroCodeState = (res) => {
    if(res.status == 200){
        if(res.data && res.data.status != 'ok' && res.data.error){
            //支付宝token超时状态 和 单点登录状态 access_token 超时 从新触发登录
            if(res.data.error.code == '11008' || res.data.error.code == '26001'){
               // AuthLogin.login();
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
        config = Object.assign({}, initConfig, config);
        let requstConfig = {
            method:'get',
            url:parseUrl(url,config.params),
            headrs:config.headrs || {},
            success:(...arg)=>{
                erroCodeState(...arg);
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
    
        let requstConfig = {
            method:'post',
            url:parseUrl(url,config.params),
            headrs:config.headrs || {},
            data,
            success:(...arg)=>{
                erroCodeState(...arg);
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
            headrs:config.headrs || {},
            data,
            success:(...arg)=>{
                erroCodeState(...arg);
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
            headrs:config.headrs || {},
            data,
            success:(...arg)=>{
                erroCodeState(...arg);
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
