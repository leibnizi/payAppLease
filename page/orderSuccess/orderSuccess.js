import {imagePath} from "../../config/config";

Page({
    data: {
        orderDetail: "查看订单",
        home:"返回首页",
        successImage: `${imagePath}/orderResult/success@2x.png`,
        buttomImage: `${imagePath}/orderResult/buttom@2x.png`,
        noPayImage:`${imagePath}/orderResult/zhima@2x.png`,
        noPay:true
    },
    onLoad() {
    },
});
