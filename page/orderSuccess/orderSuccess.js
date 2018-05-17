import {imagePath} from "../../config/config";

Page({
    data: {
        orderDetail: "查看订单",
        home:"返回首页",
        successImage: `${imagePath}/orderResult/success2x.png`,
        buttomImage: `${imagePath}/orderResult/buttom2x.png`,
        noPayImage:`${imagePath}/orderResult/zhima2x.png`,
        noPay:true
    },
    onLoad() {
    },
});
