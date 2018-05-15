import {onChange} from '/templates/msProtocal/msProtocal.js';
import * as aliApi from '/util/aliApi.js';
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
                category: "category01",
                amount: "1000.00", 
                deposit: "2000.00",
                out_order_no: "order001",
                overdue_time: "2018-1-10 00:00:00", 
                order_process_url: "https://www.alipay.com", 
                item_id: "itemid001",
                subject: {
                    "products": [
                        { 
                        "count": 1, /** 商品件数 */
                        "amount": "100.00", /**分期总金额*/ 
                        "deposit": "150.00", /**总押金*/ 
                        "installmentCount": 12, /**分期数*/ 
                        "name": "product1" /** 商品名 */
                        },
                    ]
                }
            });
            console.log("try",res)
       }
       catch(err){
        console.log("catch",err)
       }
        console.log("申请免押购卡")
    }
});
