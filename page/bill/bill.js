import loading from '/util/loading.js'
Page({
  data: {
    empty:false,
    billInfo:{},
    loading:false
  },
  onLoad() {},
  onShow(){
    console.log(loading)
    loading.show()
  },
  

});
