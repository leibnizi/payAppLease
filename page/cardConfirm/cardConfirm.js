
import {onChange,data} from '/templates/msProtocal/msProtocal.js';
import {push} from "../../util/navigator";
import * as aliApi from '/util/aliApi.js';
import {post} from '/util/httpService';
import loading from '/util/loading';

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
        outOrderNo:null,
        orderId:null,
        id:null
    },
    onLoad(option) {
        console.log(option)
        this.setData({
            orderNo: option.orderNo,
            outOrderNo:option.outOrderNo,
            id:option.id,
            orderId:option.orderId
        })
    },
    onShow() {

    },
    onSelected(e) {
        onChange(e, this)
    },
    async _pollQuery(){
        loading.show()
        const orderRes = await post('/order/payment-done',{id:this.data.orderId,type:3});
        console.log("Order",this.data.outOrderNo);
        console.log("Pay",orderRes);
        if(orderRes.data.status === 'ok')
        {
            push(`/page/orderSuccess/orderSuccess?orderId=${this.data.orderNo}&msOrder=${this.data.outOrderNo}`)
            console.log("try确认订单", res)
        }
    },
    async onSubmit(e) {
        loading.show();
        const config = {
            "creditRentType": "signPay", /**固定传:signPay */
            "outOrderNo": this.data.outOrderNo, /**外部订单号，即商户自己的订单号 */
            "zmOrderNo": this.data.orderNo, /**芝麻订单号 */
        };

        console.log("Config______",config)
        try {
            const res = await aliApi.zmRentTransition(config)
            console.log("支付宝支付结果——————————",res)
            if(res.error_code && res.error_code === 'SUCCESS' || (res.order_status && res.order_status === 'SUCCESS' && res.error_code && res.error_code === 'SUCCESS'))
            {
                //支付宝接口支付成功，调用我们的api查询支付结果
                const poll = setInterval(()=>this._pollQuery(),800)

                setTimeout(()=>{
                    clearInterval(poll)
                    push("/page/orderFail/orderFail")
                },10 * 1000)


            }
            console.log("支付出现问题")
        }
        catch (err) {
            console.log("catch确认订单", err)
            push("/page/orderFail/orderFai")
        } finally {
            loading.hide()
        }
    }
});
