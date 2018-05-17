import { get, post } from '/util/httpService.js';
import {userList} from '/config/config.js';
import {push} from '/util/navigator.js';
import tabBar from '/templates/tabBar/index.js';
var globalData = getApp().globalData;
Page({
  data: {
    tabBar: tabBar,
    list:userList
  },
  onShow(){
    this.setData({
      tabBar: {'tabCurrent':'user'},//当前tabber亮灯标识
    });
    // 获取购物车商品数量供tabbar展示
    this._getCart();
  },
  onLoad() {
    this.setData({
      tabBar: {'tabCurrent':'user'},//当前tabber亮灯标识
    });
    // 获取购物车商品数量供tabbar展示
    this._getCart();
  },
  goPath(e){
    console.log(e);
    push(e.currentTarget.dataset.path)
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
