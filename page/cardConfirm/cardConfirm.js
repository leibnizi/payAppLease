import {onChange} from '/templates/msProtocal/msProtocal.js';

Page({
    data: {
        type: "",
        noPay: true,
        agree: true,
        text: "提交订单",
        onSubmit: 'onSubmit',
        selected: false,
        onSelect:'onSelected'
    },
    onLoad(option) {
        this.setData({
            type: option.type
        })
    },
    onShow() {

    },
    onSubmit(e) {
        console.log("Hello", e)
    },
    onSelected(e) {
        onChange(e, this)
    },
});
