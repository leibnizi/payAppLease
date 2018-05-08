/** http Service 封装后的使用方法与axios一致。
** 后续的timeout,公共的headers,将通过config/config.js文件引入 
*/
import {baseUrl} from '/config/config.js';

const parseUrl = (baseUrl,queryStringObject)=>{
    let url = baseUrl;
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

export const get = (url,config)=>{
    return new Promise((resolve,reject)=>{
        let requstConfig = {
                method:'get',
                url:parseUrl(baseUrl,config.params),
                headrs:config.headrs || {},
                success:(...arg)=>{resolve(...arg)},
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const post = (url,data,config)=>{
    return new Promise((resolve,reject)=>{
        let requstConfig = {
                method:'post',
                url:parseUrl(baseUrl,config.params),
                headrs:config.headrs || {},
                data,
                success:(...arg)=>{resolve(...arg)},
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const put = (url,data,config)=>{
    return new Promise((resolve,reject)=>{
        let requstConfig = {
                method:'put',
                url:parseUrl(baseUrl,config.params),
                headrs:config.headrs || {},
                data,
                success:(...arg)=>{resolve(...arg)},
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const del = (url,params)=>{
    return new Promise((resolve,reject)=>{
        let requstConfig = {
                method:'delete',
                url:parseUrl(baseUrl,config.params),
                headrs:config.headrs || {},
                data,
                success:(...arg)=>{resolve(...arg)},
                fail:(...arg)=>{reject(...arg)}
            };
        my.httpRequest(requstConfig);
    })
}

export const request = (config)=>{
    return new Promise((resolve,reject)=>{
        if(!config.success){
            config.success = (...arg)=>{resolve(arg)};
        }
         if(!config.fail){
            config.success = (...arg)=>{reject(arg)};
        }
        
        my.httpRequest(config);
    })
}
