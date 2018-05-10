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
        let authCode = wx.getStorageSync({key:'authCode'});
        if(authCode){
            //已经拿到用户授权信息 authCode  只需要login 获取token
            my.httpRequest({
                url: baseUrl + '/login',
                method:'POST',
                data: {
                    code: authCode
                },
                success: (res) => {
                    if(res.status == 'ok'){
                        my.setStorageSync({key:'userInfo', data:res.data.data});
                        my.setStorageSync({key:'access_token', data:res.data.data.access_token});
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
                                            url: baseUrl + '/login',
                                            method:'POST',
                                            data: {
                                            code: res.authCode
                                        },
                                        success: (res) => {
                                            my.setStorageSync({key:'userInfo', data:res.data.data});
                                            my.setStorageSync({key:'access_token', data:res.data.data.access_token});
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
                fail: () => {
                    console.log('authCode 登录换取 access_token ',res);
                }
            });
        }
    },
    /*
     * 用户通用 login 浮层
    */
};

export default AuthLogin

