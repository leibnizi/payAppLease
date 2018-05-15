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
                    data: res.authCode
                });
            },
        });
    },
    /*
     * 拿 authCode 去换取 access_token 和 用户信息
    */
    getAccessToken:() => {
        let authCode = my.getStorageSync({key:'authCode'}).data;
        if(authCode){
            //已经拿到用户授权信息 authCode  只需要login 获取token
            my.httpRequest({
                url: baseUrl + '/alipaymini/login',
                method:'GET',
                data: {
                    authcode: authCode
                },
                success: (res) => {
                    if(res.status == 'ok'){
                        if(res.data && res.data.data){
                            my.setStorageSync({key:'userInfo', data:res.data.data});
                            my.setStorageSync({key:'access_token', data:res.data.data.access_token});
                            if(res.data.data.token_type  && res.data.data.token_type == 1){
                                my.navigateTo({
                                    url:'/page/login/index'
                                });
                            }
                        }
                    }else if(res.data && res.data.error && res.data.error.code == '26001') {
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
                                    console.log('获取用户登录态失败！' + res.errMsg)
                                }
                            },
                            fail: () => {
                                console.log('授权失败！');
                            }
                        });
                    }
                },
                fail: (res) => {
                    console.log('authCode 登录换取 access_token ',res);
                }
            });
        }else{
                try {
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

                } catch (e) {
                    console.log('调用失败！');
                }
        }
    
    }
};

export default AuthLogin

