import {userList} from '/config/config.js';
import { push } from '/util/navigator.js';
import { get } from '/util/httpService.js';
import loading from '/util/loading.js';
import Util from '/util/util.js'
import tabBar from '/templates/tab-bar/index.js';
var globalData = getApp().globalData;
Page({
  data: {
    tabBar: tabBar,
    productList: [
      {
        brand: "nike",
        name: 'ttt',
        size: 'S M L XL'
      }
    ],
    page: 1,
    page_size: 10,
  },
  async onLoad() {
    this.setData({
      tabCurrent: 'home',//当前tabber亮灯标识
    });
    this._getLocation();
    this._getCart();
  },
  async onShow() {
    loading.show();
    try {
      const { data: { data }, status } = await this.getData();
      // debugger
      if (data && Util.isArray(data.rows) && data.rows.length > 0) {
        data.rows.map( (item, idx) => {
          data.rows[idx]['toDetailUrl'] = '/page/detail/index?id=' + item.id;
        });
        this.setData({
          productList: data.rows
        })
      }
    }
    catch (e) {
    } finally {
      loading.hide();
    }
    // 获取购物车商品数量供tabbar展示
    this._getCart();
    this.setData({
      tabCurrent: 'home',//当前tabber亮灯标识
    });
  },
  async onReachBottom(){
    let { page, productList } = this.data
    loading.show();
    this.setData({
      page: ++page
    })
    try {
      const { data: { data }, status } = await this.getData();
      if (data && Util.isArray(data.rows) && data.rows.length > 0) {
        data.rows.map( (item, idx) => {
          data.rows[idx]['toDetailUrl'] = '/page/detail/index?id=' + item.id;
        });
        this.setData({
          productList: [...productList, ...data.rows]
        })
      }
    }
    catch (e) {

    } finally {
      loading.hide();
    }
  },
  getData() {
    return get('product/filter', {
      params: {
        mode: 1,
        page: this.data.page,
        page_size: 6,
        type: 1,
      }
    })
    
  },
  goPath(e){
    push(e.currentTarget.dataset.path)
  },

  /*
  * 获取购物车数据供tabbar
  */
  _getCart(){
    get('alipaymini-plan/cart', { params: { 'delivery_region': globalData.location.districtAdcode }}).then((rps)=>{
      var viewData = this.data.tabBar;
      if(rps.data && rps.data.data && rps.data.status == 'ok'){
        this.setData({
          tabBar: Object.assign({},viewData,{cartNum:rps.data.data.length, tabCurrent:'home'})
        });
      }
    }, (rps)=>{
        
    });
  },

  /*
   * 获取用户的位置信息
   */
  _getLocation(){
    var that = this;
    my.getLocation({
      type: 1,
      success(res) {
        my.hideLoading();
        console.log(res);
        globalData.location = res;
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
  }
});
