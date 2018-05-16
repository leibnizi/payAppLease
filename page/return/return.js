Page({
  data: {
    list:[{
      image_url: "http://static-t.msparis.com/media/catalog/product/v/w/vw023w-1_1.jpg!w375",
      name:"红底荷叶碎花长裙",
      specification:"中码M",
      price:"23800"
    }],
    text:"提交订单",
    onSubmit:'onSubmit'
  },
  onLoad() {},
  onSubmit(e){
    console.log("Hello",e)
  }
});
