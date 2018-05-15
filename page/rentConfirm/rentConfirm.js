import order from "/templates/order/order.js";
import {onChange,data} from '/templates/msProtocal/msProtocal.js';
Page({
  data: {
    ...order,
    ...data,
    onSelect:'onSelected',
    text:"提交订单",
    onSubmit:'onSubmit'
  },
  onLoad() {},
  onSelected(e){
      onChange(e,this)
  },
  onSubmit(e){
    console.log("Hello",e)
  }
});