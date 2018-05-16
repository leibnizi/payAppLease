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
    // 获取购物车商品数量供tabbar展示
    this._getCart();
  },
  onLoad() {
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
    get('alipaymini-plan/cart', { params: { 'delivery_region': globalData.location.districtAdcode }}).then((rps)=>{
      var viewData = this.data.tabBar;
      if(rps.data && rps.data.data && rps.data.status == 'ok'){
        this.setData({
          tabBar: Object.assign({},viewData,{cartNum:rps.data.data.length, tabCurrent:'user'})
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
