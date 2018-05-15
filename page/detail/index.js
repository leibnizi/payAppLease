import Util from '/util/util.js';
import bmap from '/libs/bmap-wx.min.js';
import animModal from '/templates/items/index.js';
import {get, post} from '/util/httpService.js';
import AuthLogin from '/util/authLogin.js';

Page({
  data: {
    id:'7836',//产品id
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
      id: '42595',
      brand:'R13',
      brand_desc: '',
      brand_id: '624',
      tags: [],
      market_price: 12312312,
      rental_price: 40000,
      size: ['XXS/XS', 'S', 'M', 'L', 'XL']
    },
    tabView: 1,
    specification_key:'',
    selectInfoState: false, //加入购物车的选择浮层的状态
    days: 7,//租期默认7天
    delivery_region:'110101', //配送区域
    cartNum: 0,//购物车小标的数据显示
  },
  onShow(){
    this._getCart();
  },
  onLoad(query) {
    console.log(query);
    this.getDetailInfo();
    //创建地址应用
    this._getLocation();
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
  _actionSheetTap() {
    const items = ['XXS/XS', 'S', 'M', 'L', 'XL'];
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
    this.setData({
      selectInfoState: false,
      specification_key: ''
    });
  },

  /*
   * 加入购物车
   */
  _addCart(){
    let authCode = my.getStorageSync({key:'authCode'}).data;

    if(authCode){
      AuthLogin.getAuthCode();
    }

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
      delivery_region: this.data.delivery_region,
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
   * 获取购物车数据
   */
  _getCart(){
    get('alipaymini-plan/cart', { params: { 'delivery_region': this.data.delivery_region }}).then((rps)=>{
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
      success(res) {
        my.hideLoading();
        console.log(res)
        // 新建百度地图对象
        var BMap = new bmap.BMapWX({
          ak: "y1dFiNhy70Q8xKFwrnvciFlbF2OrlkB3"
        });

        var fail = function(data) {
          console.log(data);
        };

        var success = function(data) {
          console.log(data);
          /*
          wx.setStorageSync(
            "district",
            data.originalData.result.addressComponent.district
          );
          */
        };

        // 发起regeocoding检索请求
        BMap.regeocoding({
          fail: fail,
          success: success
        });

        that.setData({
          hasLocation: true,
          location: that._formatLocation(res.longitude, res.latitude)
        })
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
  },

  _formatLocation(longitude, latitude) {
    longitude = Number(longitude).toFixed(2)
    latitude = Number(latitude).toFixed(2)

    return {
      longitude: longitude.toString().split('.'),
      latitude: latitude.toString().split('.')
    }
  },
});
