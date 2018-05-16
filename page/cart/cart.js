import { get, post } from '/util/httpService.js';
import loading from '/util/loading.js'
import tabBar from '/templates/tabBar/index.js';
var globalData = getApp().globalData;
Page({
  data: {
    tabBar: tabBar,
    productList:[],
    activeProductList:[],
    loseProductList:[],
    showDelete: false,
    has_card: true,
  },
  onLoad() {
    this.setData({
      tabBar: {'tabCurrent':'cart'},//当前tabber亮灯标识
    });
  },
  async onShow() {
    loading.show();
    try {
      const { data: { data }, status } = await this.getData();
      const { has_card } = await this.getCheckCardStatus();
      // console.log(has_card,"kkuu")
      if (data && typeof data.items === "object") {

        const activeProductList = data.filter((item) => {
          return item.status === 1
        })
        
        const loseProductList = data.filter((item) => {
          return item.status === 2 || item.status === 3
        })

        this.setData({
          productList: data.items,
          activeProductList,
          loseProductList,
          has_card
        })
      }
    }
    catch (e) {
      console.log("Result", e)
    } finally {
      // loading.hide();
      my.hideLoading()
    }
    this.setData({
      tabBar: {'tabCurrent':'cart'},//当前tabber亮灯标识
    });
    // 获取购物车商品数量供tabbar展示
    this._getCart();
  },
  async deleteProduct(e) { 
    const { id } = e.target.dataset;
    loading.show();
    try {
      const { status } = await post('alipaymini-plan/cart-product-del', { 
        sale_item_id: id,
      } ,{
        params: {
        }
      })
      if (status === "ok") {
        const { productList } = this.data;
        const newProductList = productList.filter(item => item.sale_item_id !== id)
        this.setData({
          productList: newProductList
        })
      }
    }
    catch (e) {
    } finally {
      loading.hide();
    }
  },
  async goToBuy(){
    try {
      loading.show();
      const {data, status, error} = await this.postConfirm()
      if (data && data instanceof Object) {
        my.navigateTo({
          url:'/page/order/order'
        })
      }
      else if (error && error instanceof Object ){
        my.showToast({
          type: 'success',
          content: `${error.message}`,
          duration: 2000,
        });
      }
      else{
        loading.hide();
      }
    }
    catch (e) {
      console.log("Result", e)
    } 
    finally {
      loading.hide();
    }
  },
  showDeleteFun(e){
    const { productList } = this.data;
    const { id } = e.target.dataset;
    const newProductList = productList.map((item, index) => {
      if (item.sale_item_id == id) {
        item.showDelete = !(item.showDelete)
      }
      else{
        item.showDelete = false
      }
      return item
    })
    this.setData({
      productList: newProductList
    })
  },
  closeTopFun(){
    //手动关闭却改变语义完全的不同的状态名，会不会有啥问题
    this.setData({
      has_card: true
    })
  },
  postConfirm() {
    return post('confirm/mall',{

    }, {
      params: {
      }
    })
  },
  async deleteLoseFun() {
    loading.show();
    try {
      const { status } = await this.postDeleteLose()
      if (status === "ok") {
        this.setData({
          loseProductList: []
        })
      }
    }
    catch (e) {
    } finally {
      loading.hide();
    }
  },


  getData() {
    const { data } = my.getStorageSync({ key: 'globalAddress' });
    return get('alipaymini-plan/cart', {
      params: {
        delivery_region: data && data.region_code
      }
    })
  },
  getCheckCardStatus() {
    return get('alipaymini-user/own-card')
  },
  postDeleteLose() {
    return post('alipaymini-plan/cart', {
      plan_id: '1',
      plan_item_ids: '2'
    })
  },
  /*
  * 获取购物车数据供tabbar
  */
  _getCart(){
    var userInfo = my.getStorageSync({'key': 'userInfo'}).data;
    if(userInfo && userInfo.token_type == 2 && globalData.defaultUserAddress.region_code){
      get('alipaymini-plan/cart', { params: { 'delivery_region': globalData.defaultUserAddress.region_code }}).then((rps)=>{
        var viewData = this.data.tabBar;
        if(rps.data && rps.data.data && rps.data.status == 'ok'){
          this.setData({
            tabBar: Object.assign({},viewData,{cartNum:rps.data.data.length})
          });
        }
      }, (rps)=>{
          
      });
    }
  }
});
