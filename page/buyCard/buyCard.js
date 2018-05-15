import {onChange} from '/templates/msProtocal/msProtocal.js';
import {imagePath} from "/config/config";
import {push} from "/util/navigator";
import * as aliApi from "/util/aliApi";
import {get} from "../../util/httpService";
import couponList from "/templates/couponList/couponList";
import util from "/util/util";

Page({
    onChange,
    formatCoupon(rowData){
        return rowData.map((item,index)=>{
            const date = new Date(item.from_date);
            console.log("time",date.toUTCString())
            return {
                name:item.name,
                value:item.description,
                date:`${util.formatTime(new Date(item.from_date))}-${util.formatTime(new Date(item.to_date))}`,
                id:item.coupon_id,
                type:item.type,
                cardType:item.bind_card_type,
                discount:item.discount
            }
        })
    },
    data: {
        ...couponList.data,
        list: [
            {name: "原价", value: "￥599"},
            {name: "有效期", value: "30天"},
            {name: "押金", value: "￥300"}
        ],
        selected: false,
        onSelect:'onSelected',
        cardImage:`${imagePath}/buyCard/buyCard@2x.png`,
        couponList:[],
        selectedCoupon:null,
        onClose:'onClose'

    },
    onLoad() {
        console.log(this)
    },
    async onShow(){
        const config = {
            params:{
                page:1,
                page_size:20
            }
        }
        try{
            const response = await get("user/coupon",config);
            console.log("Coupons",response)
            if(response.data.status == 'ok') {
                const rowData = response.data.data.rows,
                formatedData = this.formatCoupon(rowData);
                this.setData({
                    couponList: formatedData
                })
            }
        }
        catch(e){
            console.log(e)
        }
    },
    onSelected(e){
        onChange(e,this)
    },
    buyCard(){
        push("/page/cardConfirm/cardConfirm")
    },
    showCouponList(e){
        if(this.data.couponList.length === 0)
        {
            aliApi.showToast({content:"您暂时没有可用优惠券"})
        } else {
            this.setData({
                hidden:!this.data.hidden
            })
        }
    },
    onClose(){
        couponList.op.onClose(this);
    }
});
