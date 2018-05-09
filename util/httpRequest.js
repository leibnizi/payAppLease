'use strict';

const httpRequest = function(obj) {
    let params = {
        'url':'',
        'headers': '',
        'method': 'GET',
        'data': {},
        'timeout': 60000,
        'dataType': 'json',
        'success': function () {},
        'fail': function () {},
        'complete': function () {}
    };

    params = Object.assign({}, params, obj);

    if(!my || !my.httpRequest){
        console.log('没有找到 my 对象，请在小程序开放工具内执行。');

        return false
    }

    if(!params.url){
        console.log('没有找到 my 对象，请在小程序开放工具内执行。');

        return false
    }

    const promise = new Promise(function(resolve, reject){

        let success = function () {
            resolve(data);
        }

        let fail = function (error) {
            reject(error);
        }

        my.httpRequest(Object.assign({}, params,{
            success: success,
            fail: fail
        }));

    });

    return promise;
};

export default httpRequest;