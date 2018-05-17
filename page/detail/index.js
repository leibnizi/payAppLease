import Util from '/util/util.js';
import animModal from '/templates/items/index.js';
import {get, post} from '/util/httpService.js';
import AuthLogin from '/util/authLogin.js';
var globalData = getApp().globalData;
Page({
  data: {
    id:'',//产品id
    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 3000,
    circular: true,//是否启用无限滑动
    'indicator-active-color': '#F03A80',//当前选中的指示点颜色
    'indicator-color': '#F15F97',//指示点颜色
    detail:{
      image: [
        'https://static-rs.msparis.com/uploads/4/9/49201651c32306bd26e5745b930c0fc6.png'
      ],
      name:'',
      id: '',
      brand:'',
      brand_desc: '',
      brand_id: '',
      tags: [],
      market_price: '',
      rental_price: '',
      size: []
    },
    tabView: 1,
    specification_key:'',
    selectInfoState: false, //加入购物车的选择浮层的状态
    days: 7,//租期默认7天
    location: globalData.location, //配送区域
    cartNum: 0,//购物车小标的数据显示
    location2:{
    "id": 47043,
    "region_name": "河北省 邯郸市 邯山区",
    "address_detail": "asdasdasd",
    "contact_name": "dddddccc",
    "contact_mobile": "13124077261",
    "region_code": "130402",
    "area_name": "邯山区"
    },
    userAddressList: globalData && globalData.userAddressList || [], //用户全局的地址列表
    defaultUserAddress: globalData && globalData.defaultUserAddress || {},// 用户默认地址
  },
  onShow(){
    this._getCart();
  },
  onLoad(query) {
    console.log(query);
    this.setData({
      id: query.id
    });

    this.getDetailInfo();
    //创建地址应用
    //this._getLocation();
  },

  getDetailInfo(){
    get('product', { params: { id: this.data.id }}).then((rps)=>{
      var viewData = {};
      if(rps.data && rps.data.data && rps.data.status == 'ok'){

        viewData = rps.data.data;

        viewData.image.map( (item,idx) => {
          viewData.image[idx] = item + '!w750'
        });
       
        viewData =   Object.assign({},viewData, {'size': viewData.specifications[0] && viewData.specifications[0].options,'market_price': Util.formatPrice(viewData.market_price)});

        this.setData({
          detail: viewData
        });
      }
    }, (rps)=>{
        
    });
  },
  _productIntroduction(event){
    this.setData({
      tabView: 1
    });
  },
  _productSize(event){
    this.setData({
      tabView: 2
    });
  },

  /*
   * 选择尺寸
  */
  _selectSize(event){
    var targetData = event.target.dataset.option;
    console.log(event.target.dataset.option);
  
    var viewData = this.data.detail;
    var viewSzie = this.data.detail.size;

    viewSzie.map((item, idx) => {
      if(targetData.id == item.id){
        viewSzie[idx] = Object.assign({}, item, {current: true});
      }else{
        viewSzie[idx] = Object.assign({}, item, {current: false});
      }
    });

    viewData['size'] = viewSzie;

    this.setData({
      detail: viewData,
      specification_key: targetData.id
    });
  },

  /*
  * 关闭浮层
  */
  _closeSelectInfo(){
    var detail = this.data.detail;
        detail.size.map((item,idx) => {
          detail.size[idx] = Object.assign({}, item, {current: false});
        });
      
    this.setData({
      selectInfoState: false,
      specification_key: '',
      detail: detail
    });
  },

  /*
   * 加入购物车
   */
  async _addCart(){
    let authCode = await my.getStorageSync({key:'authCode'}).data;
    
    await AuthLogin.login();

    let userCard =  await this._getUserCart();

    //this._getUserAddress();

    this.setData({
      selectInfoState: true
    });
  },

  /*
   * 确认添加购物车
  */
  _affirmAddCart(){
    if(!this.data.specification_key){
      Util.toast({
        type:'none',
        content: '请选择尺码信息！',
        duration: 2000
      });
      return false;
    }
    post('alipaymini-plan/product', { 
      delivery_region: this.data.defaultUserAddress.region_code,
      product_id: this.data.id,
      source: 1,
      specification_key: this.data.specification_key
      },{}).then(
        (rps)=>{
          if(rps.data && rps.data.status == 'error' && rps.data.error){
            Util.toast({
              type:'fail',
              content: rps.data.error.message || '',
              duration: 3000
            });
          }else{
            Util.toast({
              type:'success',
              content: '添加购物车成功！',
              duration: 3000
            });

            this.setData({
              selectInfoState: false,
              specification_key: ''
            });
          }
        },(rps)=>{
            Util.toast({
              type:'fail',
              content: '添加购物车失败！',
              duration: 3000
            });
        }
    );
  },

  /*
   * 获取购物车数据供tabbar
   */
  _getCart(){
    get('alipaymini-plan/cart', { params: { 'delivery_region': this.data.defaultUserAddress.region_code }}).then((rps)=>{
      var viewData = [];
      if(rps.data && rps.data.data && rps.data.status == 'ok'){
        viewData = rps.data.data;
        this.setData({
          cartNum: viewData.length
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
        console.log(res)
        globalData.location = res;
        that.setData({
          location: res
        })
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
  },
  /*
   * 城市选择
  */
  _chooseCity(){
    my.chooseCity({
      showLocatedCity: true,
      showHotCities: true,
      success: (res) => {
        my.alert({
          title: 'chooseAlipayContact response: ' + JSON.stringify(res),
        });
      },
    });
  },
  /*
   * 用户拥有卡判断
   */
  _getUserCart(){
    return get('alipaymini-user/own-card');
  },
  /*
  * 用户登录后获取 用户的地址信息
  */
  _getUserAddress(){
    get('user/address',{params:{'page_size': 20, 'type': 1, 'page': 1}}).then((rps) =>{
      if(rps.data && rps.data.data && rps.data.status == 'ok'){
        globalData['userAddressList'] = rps.data.data.rows;
        this.setData({
            userAddressList: rps.data.data.rows
        });
        if(Util.isEmptyObject(globalData.defaultUserAddress)){
          globalData['defaultUserAddress'] = rps.data.data.rows[0];
          this.setData({
            defaultUserAddress: rps.data.data.rows[0]
          });
        }
      }
    },(rps) => {

    });
  }
});
