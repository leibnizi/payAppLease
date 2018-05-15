import {onChange} from '/templates/msProtocal/msProtocal.js';
import * as aliApi from '/util/aliApi.js';
import { push } from '/util/navigator.js';
Page({
    onChange,
    data: {
        list: [
            {name: "原价", value: "￥599"},
            {name: "有效期", value: "30天"},
            {name: "押金", value: "￥300"},
            {name: "优惠券", value: "请选择 >"}
        ],
        selected: false,
        onSelect:'onSelected'
    },
    onLoad() {
    },
    onSelected(e){
        onChange(e,this)
    },
    async buyCard(){
        console.log("信用租赁API")
        /* 信用租赁API */ 
       try{ 
           const res = await aliApi.startZMCreditRent({ 
                creditRentType:"rent", /** 固定传rent*/
                category: "ZMSC_1_4_1", /** 类目(由芝麻侧业务对接人负责 􏰀供) */
                amount: "1000.00", /** 该次支付租金总金额，单位为 元，精确到小数点后两位，取值 范围[0.01,100000000]*/
                deposit: "2000.00", /** 该次支付押金总金额，单位为 元，精确到小数点后两位，取值 范围[0,100000000] */
                out_order_no: "order001", /**外部订单号，即商户自己的订单 号 */
                overdue_time: "2018-1-10 00:00:00", /**逾 期 时 间 ， yyyy-MM-dd HH:mm:ss，需要大于当前时间 */
                order_process_url: "https://www.alipay.com", /**订单处理 url，商户处理订单的 页面,后续发送给用户订单继续 处理的 card 中，需要跳转该链 接。如果没有链接，无法发送 card。 */
                item_id: "2018032901000222123469565693", /**入驻信用套餐分配的项目 id(由 芝麻侧业务对接人负责􏰀供) */
                subject: {
                    "products": [
                        { 
                        "count": 1, /** 商品件数 */
                        "amount": "100.00", /** 分期总金额*/ 
                        "deposit": "150.00", /** 总押金*/ 
                        "installmentCount": 12, /** 分期数*/ 
                        "name": "product1" /** 商品名 */
                        },
                    ]
                }
                /** 商品内容 JSON，包含商品件数， 分期数，分期租金，总押金，商品名等信息 */ 
            });
            console.log("try",res)
            push("/page/cardConfirm/cardConfirm")
       }
       catch(err){
        console.log("catch",err)
       }
        console.log("申请免押购卡")
    }
});
