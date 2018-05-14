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
  onSubmit(e){
    console.log("Hello",e)
  }
});
