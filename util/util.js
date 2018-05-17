import * as aliApi from '/util/aliApi.js';

const Util = {
    /**
     * 字符串截取
     * @param {string} str
     * @param {number} len
     * @return {string}
     */
    cutstr(str, len) {
        var temp,
            icount = 0,
            // eslint-disable-next-line
            patrn = /[^\x00-\xff]/,
            strre = "";
        for (var i = 0; i < str.length; i++) {
            if (icount < len - 1) {
                temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                    icount = icount + 1
                } else {
                    icount = icount + 2
                }
                strre += temp
            } else {
                break;
            }
        }
        return strre + "..."
    },


    /**
     * 判断对象是否为空
     * @param obj
     * @return {boolean}
     */
    isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    },

    /**
     * 判断是否是Array
     * @param arr
     * @return {boolean}
     */
    isArray(arr) {
        if (typeof arr === 'object' && !isNaN(arr.length)) {
            //console.log('参数' + arr, '是数组！');
            return true;
        } else {
            //console.log('参数' + arr, '不是数组！');
            return false;
        }
    },

    /**
     * 前后去除空格
     * @param {string} s
     * @return {string}
     */
    trim(s) {
        return s.replace(/(^\s*)|(\s*$)/g, "");
    },

    /**
     * 获取地址栏参数的方法
     * @param {string} type key:obj 返回其中key,obj返回所有的参数的object
     * @param {string} name, url参数的key值
     * @return {string|object} value:{}
     */
    getRequest(name, type) {
        if (!name) {
            return false;
        }

        if (type === 'key') {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            if (window.location.href.indexOf("?") > -1) {
                var r = window.location.href.split("?")[1].substr(0).match(reg);
                if (r !== null) return (r[2]);
                return null;
            } else {
                return null;
            }
        } else {
            var tempRequest = {};
            if (name.indexOf("?") !== -1) {
                let str = name.substr(1);
                let strs = str.split("&");
                for (let i = 0; i < strs.length; i++) {
                    tempRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            } else {
                tempRequest = null;
            }

            return tempRequest;
        }
    },

    /**
     * 生产uuid方法
     * @return {string}
     */
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    },

    /**
     * 对象转换成字符串，不带'?'，默认&分割
     * @class objectToString
     * @param {Object} object
     * @param {String} separator
     * @return {String}
     *
     */

    objectToString(object, separator) {
        if (!object) {
            return false;
        }
        let separa = separator || '&';
        let str = '';
        Object.keys(object).forEach((key, i) => {
            str += `${i === 0 ? '' : separa}${key}=${object[key]}`
        });
        return str;
    },
    /*
    * 手机号校验
    */
    isPhone(phone) {
        return (/^1[34578]\d{9}$/.test(phone));
    },
    /*
    * toast
    */
    toast(params) {
        aliApi.showToast({
            type: params.type || 'none',
            content: params.content || '操作成功',
            duration: params.duration || 3000
        });
    },

    /*
    * 格式价格
    */
    formatPrice(price, type = 2) {
        if (type == 0) {
            return '￥' + Math.floor(price / 100)
        } else {
            let num = price / 100
            let test = parseFloat(num);
            if (isNaN(test)) {
                return 0;
            }
            let f = Math.round(num * 100) / 100;
            let s = f.toString();
            let rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + parseInt(type)) {
                s += '0';
            }
            return '￥' + s;
        }
    },

    formatTime(timeSpan) {
        const date = new Date(timeSpan * 1000)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        // const hour = date.getHours()
        // const minute = date.getMinutes()
        // const second = date.getSeconds()

        return [year, month, day].map(this.formatNumber).join('-')
    },
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
};

export default Util;
