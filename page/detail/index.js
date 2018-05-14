import Util from '/util/util.js'
import animModal from '/templates/items/index.js';
import {get, post} from '/util/httpService.js'

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
      image: [],
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
  },
  onLoad(query) {
    console.log(query);
    this.getDetailInfo();
  },

  getDetailInfo(){
    get('product', { params: { id: this.data.id }}).then((rps)=>{
      var viewData = {};
      if(rps.data && rps.data.data && rps.data.status == 'ok'){

        viewData = rps.data.data;
       
        viewData =   Object.assign({},viewData, {'size': viewData.specifications[0] && viewData.specifications[0].options,'market_price': Util.formatPrice(viewData.market_price)});

        console.log(viewData);
        this.setData({
          detail: viewData
        });
      }
    }, (rps)=>{
        
    });
  },
  _productIntroduction(event){
    console.log(event);
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
  _selectSize(event){
    var targetData = event.target.dataset.option;
    console.log(event.target.dataset.option);
  
    var viewData = this.data.detail;
    var viewSzie = this.data.detail.size;
    console.log(viewSzie);

    viewSzie.map((item, idx) => {
      if(targetData.id == item.id){
        viewSzie[idx] = Object.assign({}, item, {current: true});
      }else{
        viewSzie[idx] = Object.assign({}, item, {current: false});
      }
    })
    console.log(viewSzie,'viewSzie');

    viewData['size'] = viewSzie

    console.log(viewData);
    this.setData({
      detail: viewData
    })
  }
});
