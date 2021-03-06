import {data, onChange} from '/templates/msProtocal/msProtocal.js';
import {redirectTo} from "../../util/navigator";
import * as aliApi from '/util/aliApi.js';
import {post} from '/util/httpService';
import loading from '/util/loading';
import Util from '/util/util'

const globalData = getApp().globalData;

Page({
    data: {
        type: "",
        noPay: true,
        agree: true,
        text: "提交订单",
        onSubmit: 'onSubmit',
        ...data,
        onSelect: 'onSelected',
        orderNo: null,
        outOrderNo: null,
        orderId: null,
        id: null,
        pageData: {}
    },
    onLoad(option) {
        console.log(option)
        this.setData({
            orderNo: option.orderNo,
            outOrderNo: option.outOrderNo,
            id: option.id,
            orderId: option.orderId
        })
    },
    onShow() {
        console.log("Page Data",globalData)
        const formatedPrice = this.formatPriceObject(globalData.confirmPage)
        this.setData({
            pageData: formatedPrice
        })
    },
    onSelected(e) {
        onChange(e, this)
    },
    formatPriceObject(priceObj) {
        let out = {};
        for (let prop in priceObj) {
            if(priceObj.hasOwnProperty(prop)){
                console.log("Before",priceObj[prop])
                console.log("After",Util.formatPrice(priceObj[prop],0))
                out[prop] = prop !== 'price'?Util.formatPrice(priceObj[prop],0):out[prop]
            }
        }
        out['price'] = priceObj['price']
        console.log("Out",out)
        return out;
    },

    async _pollQuery(self) {
        loading.show()
        const orderRes = await post('/order/payment-done', {id: this.data.orderId, type: 3});
        console.log("OrderNo", this.data.outOrderNo);
        console.log("OrderId", this.data.orderId)
        console.log("Pay", orderRes);
        if (orderRes.data.status === 'ok') {
            redirectTo(`/page/orderSuccess/orderSuccess?orderId=${this.data.orderId}&msOrder=${this.data.outOrderNo}`)
            console.log("try确认订单", res);
            clearInterval(self)
        }
    },
    async onSubmit(e) {
        loading.show();
        const config = {
            "creditRentType": "signPay", /**固定传:signPay */
            "outOrderNo": this.data.outOrderNo, /**外部订单号，即商户自己的订单号 */
            "zmOrderNo": this.data.orderNo, /**芝麻订单号 */
        };

        console.log("Config______", config)
        try {
            const res = await aliApi.zmRentTransition(config)
            console.log("支付宝支付结果——————————", res)
            if (res.error_code && res.error_code === 'SUCCESS' || (res.order_status && res.order_status === 'SUCCESS' && res.error_code && res.error_code === 'SUCCESS')) {
                //支付宝接口支付成功，调用我们的api查询支付结果
                const poll = setInterval(() => this._pollQuery(poll), 800)

                setTimeout(() => {
                    clearInterval(poll)
                    redirectTo(`/page/orderFail/orderFail?message=${res}`)
                }, 10 * 1000)
            }
            console.log("支付出现问题")
        }
        catch (err) {
            console.log("支付失败", err)
            redirectTo(`/page/orderFail/orderFail?message=${err}`)
        } finally {
            loading.hide()
        }
    }
});
