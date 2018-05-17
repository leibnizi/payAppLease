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
  onLoad() {
    
  },
  async onShow() {
    var userInfo = my.getStorageSync({ 'key': 'userInfo' }).data;

    if (userInfo && userInfo.token_type == 2 && globalData.defaultUserAddress.region_code) {
      loading.show();
      var viewData = this.data.tabBar;
      try {
        const { data: { data, status, error } } = await this.getData();
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

          const productList = [...valid_items, ...invalid_items];
          this.setData({
            planMsg,
            valid_items,
            invalid_items,
            productList,
            has_card,
            tabBar: Object.assign({}, viewData, { cartNum: productList.length })
          })
        }
        else {
          my.showToast({
            type: 'fail',
            content: error.message,
            duration: 2000,
          });
        }
      }
      catch (e) {
      } finally {
        // loading.hide();
        this.setData({
          isInitPage: false
        })
        my.hideLoading()
      }
    }
    else{
      my.showToast({
        type: 'fail',
        content: "获取不到userInfo && userInfo.token_type == 2 && globalData.defaultUserAddress.region_code",
        duration: 2000,
      });
    }
    // 获取购物车商品数量供tabbar展示
  },
  async deleteProduct(e) { 
    const { id } = e.target.dataset;
    const { region_code } = globalData.defaultUserAddress
    loading.show();
    try {
      const { data: { status , data} } = await post('alipaymini-plan/cart-product-del', { 
        delivery_region: region_code,
        plan_id: this.data.planMsg.plan_id,
        plan_item_id: id,
      })
      if (status === "ok" && data) {
        // const productList =  data
        
        my.showToast({
          type: 'success',
          content: '删除成功',
          duration: 1500,
        });
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
      loading.hide();
    } finally {
      
    }
  },
  async goToBuy(){
    try {
      loading.show();
      const { data: { status, error, data } } = await this.postConfirm();
      loading.hide();
      if (data && data instanceof Object) {
        my.navigateTo({
          url:'/page/order/order'
        })
      }
      else if (error && error instanceof Object ){
        // my.showToast({
        //   type: 'fail',
        //   content: `${error.message}`,
        //   duration: 2000,
        // });
      }
      else{
        loading.hide();
      }
    }
    catch (err) {
      my.showToast({
        type: 'fail',
        content: `${errr}`,
        duration: 2000,
      })
      // my.showToast({
      //   type: 'fail',
      //   content: error.message,
      //   duration: 2000,
      // });
    } 
    finally {
      // loading.hide();
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
    const { region_code, id } = globalData.defaultUserAddress
    const order_item = valid_items.map(item => {
      return {
        plan_item_id: item.plan_item_id
      }
    })
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
    } finally {
      loading.hide();
    }
  },


  getData() {
    const { region_code } = globalData.defaultUserAddress
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
});
