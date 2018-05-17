'use strict';
/*
 * 授权登录
 */

import {baseUrl} from '/config/config.js';
import * as aliApi from '/util/aliApi.js';
import {get, post} from '/util/httpService.js';

const AuthLogin = {
    /*
     * 授权信息获取 authCode
    */
    getAuthCodeFn: async () => {
       let  authCodeData =  await aliApi.getAuthCode({scopes: 'auth_user'});

        if(authCodeData.authCode){
            my.setStorageSync({
                key: 'authCode',
                data: authCodeData.authCode
            });
        }else{
            my.setStorageSync({
                key: 'authCode',
                data: ''
            });
        }

        return authCodeData.authCode || '';
    },

    /*
     * 拿 authCode 去换取 access_token 和 用户信息
    */
    login: async () => {
        
        let authCode = await AuthLogin.getAuthCodeFn();
        console.log('获取authCode:',authCode);
        if(authCode){
            
            let getAccessToken = await get('alipaymini/login',{params:{authcode: authCode}, isCheckErroCode: false});
        
            console.log('获取access_token:', getAccessToken);
            if(getAccessToken && getAccessToken.data && getAccessToken.data.status === 'ok'){
                my.setStorageSync({key:'userInfo', data:getAccessToken.data.data});
                my.setStorageSync({key:'access_token', data:getAccessToken.data.data.access_token});

                if(getAccessToken.data.data.token_type  && getAccessToken.data.data.token_type == 1){
                    my.navigateTo({
                        url:'/page/login/index'
                    });
                }
            }

        }
    }
}

export default AuthLogin

