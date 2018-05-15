import * as aliApi from '/util/aliApi.js';
Page({
  data: {
    type:"",
    noPay:true,
    agree:true,
    text:"提交订单",
    onSubmit:'onSubmit'
  },
  onLoad(option) {
    this.setData({
      type:option.type
    })
  },
  onShow(){
    
  }, 
  onAgreeChange(e){
    console.log(e)
  },
  async onSubmit(e){
    console.log("Hello",e)
    try{
      const res = await aliApi.zmRentTransition({
        "creditRentType":"signPay", /**固定传:signPay */
        "out_order_no":"outOråderNo201801223123", /**外部订单号，即商户自己的订单号 */
        "zm_order_no":"zmOrderNo201801223123", /**芝麻订单号 */
      })
      console.log("try确认订单",res)
    }
    catch(err){
      console.log("catch确认订单",err)
    } 
  }
});
