import order from "/templates/order/order.js";
import {onChange,data} from '/templates/msProtocal/msProtocal.js';
Page({
  data: {
    ...order,
    ...data,
    onSelect:'onSelected'
  },
  onLoad() {},
  onSelected(e){
      onChange(e,this)
  },
});