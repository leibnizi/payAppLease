'use strict';
/*
 * 授权登录
 */

import {baseUrl} from '/config/config.js';

const AuthLogin = {
    /*
     * 授权信息获取 authCode
    */
    getAuthCode: () => {
        my.getAuthCode({
            scopes: 'auth_user',
            success: (res) => {
                my.setStorageSync({
                    key: 'authCode',
                    data: res.authCode,
                    success:() => {
                        //this.login();
                    }
                });
            },
        });
    },
    /*
     * 拿 authCode 去换取 access_token 和 用户信息
    */
    login:() => {
        my.getAuthCode({
            scopes: 'auth_user',
            success: (res) => {
                my.setStorageSync({
                    key: 'authCode',
                    data: res.authCode
                });

                if (res.authCode) {
                    my.httpRequest({
                        url: baseUrl + '/alipaymini/login',
                        method:'GET',
                        data: {
                            authcode: res.authCode
                        },
                        success: (res) => {
                            if(res.data && res.data.status == 'ok'){
                                if(res.data && res.data.data){
                                    my.setStorageSync({key:'userInfo', data:res.data.data});
                                    my.setStorageSync({key:'access_token', data:res.data.data.access_token});
                                    if(res.data.data.token_type  && res.data.data.token_type == 1){
                                        my.navigateTo({
                                            url:'/page/login/index'
                                        });
                                    }else{
                                        /*
                                        my.httpRequest({
                                            url: baseUrl + '/alipaymini-user/own-card',
                                            method:'GET',
                                            data: {
                                                access_token: res.data.data.access_token
                                            },
                                            success: (res) => {
                                                debugger;
                                                my.setStorageSync({key:'has_card', data:res.data.data.has_card});
                                            },
                                            fail: (res) => {

                                            }
                                        });
                                        */
                                    }
                                }
                            }else{
                                if(res.data && res.data.error){
                                    my.alert({
                                        title: res.data.error.code,
                                        content: res.data.error.message,
                                    });
                                }
                            }
                        },
                        fail: (res) => {
                            console.log('authCode 登录换取 access_token ',res);
                        }
                    });
                } else {
                    console.log('获取用户登录态失败！')
                }

            }
        });

    
    }
};

export default AuthLogin

