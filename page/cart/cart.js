import { get, post } from '/util/httpService.js';
import loading from '/util/loading.js'
import tabBar from '/templates/tabBar/index.js';
var globalData = getApp().globalData;
Page({
  data: {
    tabBar: tabBar,
    productList:[],
    valid_items:[],
    invalid_items:[],
    showDelete: false,
    has_card: true,
    isInitPage: true
  },
  onLoad() {},
  async onShow() {
    
    if (!globalData.location.region_code) {
      return false
    }
    loading.show();
    try {
      const { data: { data, status } } = await this.getData();
      const { data: { has_card } } = await this.getCheckCardStatus();
      if (status === 'ok') {
        const { valid_items, invalid_items } = data

        const planMsg = {
          price: data.price,
          is_disabled: data.is_disabled,
          is_valid: data.is_valid,
          is_full: data.is_full,
          plan_id: data.plan_id,
          have_invalid_product: data.have_invalid_product
        }

        this.setData({
          planMsg,
          valid_items,
          invalid_items,
          productList: [...valid_items, ...invalid_items],
          has_card
        })

      }
    }
    catch (e) {
      console.log("Result", e)
    } finally {
      // loading.hide();
      this.setData({
        isInitPage:false
      })
      my.hideLoading()
    }
    // 获取购物车商品数量供tabbar展示
    this._getCart();
  },
  async deleteProduct(e) { 
    const { id } = e.target.dataset;
    const { region_code } = globalData.location
    loading.show();
    try {
      const { data: { status , data} } = await post('alipaymini-plan/cart-product-del', { 
        delivery_region: region_code,
        plan_id: this.data.planMsg.plan_id,
        plan_item_id: id,
      })
      if (status === "ok" && data) {
        // const productList =  data
        
        const { valid_items, invalid_items } = data

        const planMsg = {
          price: data.price,
          is_disabled: data.is_disabled,
          is_valid: data.is_valid,
          is_full: data.is_full,
          plan_id: data.plan_id,
          have_invalid_product: data.have_invalid_product
        }
        
        this.setData({
          planMsg,
          valid_items,
          invalid_items,
          productList: [...valid_items, ...invalid_items],
        })
      }
      else if (status === "ok" && !data) {
        this.setData({
          planMsg:{},
          valid_items:[],
          invalid_items:[],
          productList: []
        })
      }
    }
    catch (e) {
      console.log(e,"??>>>")
    } finally {
      loading.hide();
    }
  },
  async goToBuy(){
    try {
      loading.show();
      const { data: { data: {status, error} }} = await this.postConfirm()

      return false
      if (data && data instanceof Object) {
        my.navigateTo({
          url:'/page/order'
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
    const { productList, valid_items, invalid_items } = this.data;
    const { id } = e.target.dataset;
    const newProductList = productList.map((item, index) => {
      if (item.plan_item_id == id) {
        item.showDelete = !(item.showDelete)
      }
      else{
        item.showDelete = false
      }
      return item
    })

    this.setData({
      productList: newProductList,
      valid_items: newProductList.filter(item => item.is_valid === true ),
      invalid_items: newProductList.filter(item => item.is_valid === false)
    })
  },
  closeTopFun(){
    //手动关闭却改变语义完全的不同的状态名，会不会有啥问题
    this.setData({
      has_card: true
    })
  },
  postConfirm() {
    const { planMsg: { plan_id }, valid_items } = this.data
    const { region_code, id } = globalData.location
    const order_item = valid_items.map(item => {
      return {
        plan_item_id: item.plan_item_id
      }
    })
    console.log(globalData.location,"<<<<<")
    return post('confirm/alipaymini-plan-daily',{
      delivery_region: region_code,
      user_address_id: id,
      plan_id,
      order_item: order_item
    }, {
        headers: {
        'Content-type': 'application/json'
      }})
  },
  async deleteLoseFun() {
    loading.show();
    try {
      const { data: { status } } = await this.postDeleteLose()
      if (status === "ok") {
        this.setData({
          invalid_items: []
        })
      }
    }
    catch (err) {
      console.log(err)
    } finally {
      loading.hide();
    }
  },


  getData() {
    const { region_code } = globalData.location
    return get('alipaymini-plan/cart', {
      params: {
        delivery_region: region_code
      }
    })
  },
  getCheckCardStatus() {
    return get('alipaymini-user/own-card')
  },
  postDeleteLose() {
    const { planMsg: { plan_id }, invalid_items}  = this.data
    const deleteLostParam = invalid_items.map(item => {
      return item.plan_item_id
    }).join(",")
    return post('alipaymini-plan/invalid-product-del', {
      // delivery_region: region_code,
      plan_id: this.data.planMsg.plan_id,
      plan_item_ids: deleteLostParam
    })
  },
  /*
  * 获取购物车数据供tabbar
  */
  _getCart(){
    get('alipaymini-plan/cart', { params: { 'delivery_region': globalData.location.region_code }}).then((rps)=>{
      var viewData = this.data.tabBar;
      if(rps.data && rps.data.data && rps.data.status == 'ok'){
        this.setData({
          tabBar: Object.assign({},viewData,{cartNum:rps.data.data.length, tabCurrent:'cart'})
        });
      }else{
        this.setData({
          tabBar: Object.assign({},viewData,{cartNum:rps.data.data.length || 0, tabCurrent:'cart'})
        });
      }
    }, (rps)=>{
        
    });
  },
});
