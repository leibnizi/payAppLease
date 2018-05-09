import loading from '/util/loading.js'
Page({
  data: {
    empty:false,
    billInfo:{},
  },
  onLoad() {},
  async onShow(){
    loading.show();
    try{
      const result = await this.queryBillInfo();
      this.setData({
        empty:result
      })
    }
    catch(e){
      console.log("Result",e)
    }finally{
      loading.hide();
    }
    
    
  },

  queryBillInfo(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        reject(true)
      },2000)
    })
  }
  

});
