Page({
  data: {
    type:"",
    noPay:true,
    agree:true
  },
  onLoad(option) {
    this.setData({
      type:option.type
    })
  },
  onShow(){
    
  }
});
