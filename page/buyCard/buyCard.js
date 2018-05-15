import {onChange} from '/templates/msProtocal/msProtocal.js';
import {imagePath} from "../../config/config";
import {push} from "../../util/navigator";

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
        onSelect:'onSelected',
        cardImage:`${imagePath}/buyCard/buyCard@2x.png`
    },
    onLoad() {
    },
    onSelected(e){
        onChange(e,this)
    },
    buyCard(){
        push("/page/cardConfirm/cardConfirm")
    }
});
