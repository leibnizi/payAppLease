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
    let requstConfig = {
        method:'get',
        url:parseUrl(baseUrl,config.params),
        headrs:config.headrs || {}
    };
}

const post = (url,data,config)=>{}

const put = (url,data,config)=>{}

const del = (url,params)=>{}

const request = (config)=>{}
