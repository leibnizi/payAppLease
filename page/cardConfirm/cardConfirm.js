
import {onChange,data} from '/templates/msProtocal/msProtocal.js';
import {push} from "../../util/navigator";
import * as aliApi from '/util/aliApi.js';

Page({
    data: {
        type: "",
        noPay: true,
        agree: true,
        text: "提交订单",
        onSubmit: 'onSubmit',
        ...data,
        onSelect: 'onSelected',
        orderNo:null,
        outOrderNo:null
    },
    onLoad(option) {
        this.setData({
            orderNo: option.orderNo,
            outOrderNo:option.outOrderNo
        })
    },
    onShow() {

    },
    onSelected(e) {
        onChange(e, this)
    },
    async onSubmit(e) {
        const config = {
            "creditRentType": "signPay", /**固定传:signPay */
            "outOrderNo": this.data.outOrderNo, /**外部订单号，即商户自己的订单号 */
            "zmOrderNo": this.data.orderNo, /**芝麻订单号 */
        };

        console.log("Config______",config)
        try {
            const res = await aliApi.zmRentTransition(config)
            push(`/page/orderSuccess/orderSuccess?orderNo=${this.data.orderNo}&msOrder=${this.data.outOrderNo}`)
            console.log("try确认订单", res)
        }
        catch (err) {
            console.log("catch确认订单", err)
            push("/page/orderFail/orderFai")
        }
    }
});
