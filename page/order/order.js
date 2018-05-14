import order from "/templates/order/order.js";
import {push} from '/util/navigator.js';
Page({
  data: {
    ...order,
  },
  onLoad() {},
  handleTap1(){
    push("/page/orderDetail/orderDetail")
  }
});