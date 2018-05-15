import {push} from '/util/navigator.js';
import {imagePath} from "../../config/config";

Page({
    data: {
        items: [
            {name: "免费4件", value: 1, src: `${imagePath}/member/4Free@2x.png`},
            {name: "不限次数", value: 2, src: `${imagePath}/member/noLimit@2x.png`},
            {name: "购衣折扣", value: 3, src: `${imagePath}/member/discount@2x.png`},
            {name: "免洗包邮", value: 4, src: `${imagePath}/member/noWash@2x.png`},
            {name: "专属客服", value: 5, src: `${imagePath}/member/custom@2x.png`}
        ],
        hasMember: false
    },
    onLoad() {
    },
    goBuyCard() {
        push('/page/buyCard/buyCard')
    }
});
