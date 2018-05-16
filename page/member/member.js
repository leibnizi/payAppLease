import {push} from '/util/navigator.js';
import {imagePath} from "../../config/config";
import {get} from "../../util/httpService";
import loading from "/util/loading";

Page({
    data: {
        items: [
            {name: "免费4件", value: 1, src: `${imagePath}/member/4Free2x.png`},
            {name: "不限次数", value: 2, src: `${imagePath}/member/noLimit2x.png`},
            {name: "购衣折扣", value: 3, src: `${imagePath}/member/discount2x.png`},
            {name: "免洗包邮", value: 4, src: `${imagePath}/member/noWash2x.png`},
            {name: "专属客服", value: 5, src: `${imagePath}/member/custom2x.png`}
        ],
        hasMember: false
    },
    async onShow(){
        loading.show("加载中");
        try{
            const res =await get("alipaymini-user/own-card",)
            console.log("OwnCard----",res)
            if(res.data.status == 'ok')
            {
                this.setData({
                    hasMember:res.data.data.has_card
                })
            }
        } catch (e){

        } finally {
            loading.hide()
        }
    },
    goBuyCard() {
        push('/page/buyCard/buyCard')
    }
});
