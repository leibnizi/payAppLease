import animModal from '/templates/items/index.js';
import {get} from '/util/httpService.js'

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 3000,
    circular: true,//是否启用无限滑动
    'indicator-active-color': '#F03A80',//当前选中的指示点颜色
    'indicator-color': '#F15F97',//指示点颜色
    detail:{
      image: [
      "http://static-r.msparis.com/uploads/products/d/8/d8eef4d3850fe41e8281234e000d5ee7.jpg",
      "http://static-r.msparis.com/uploads/products/d/b/db66f0cb28dca4d64c9468ca00a5e3c4.jpg",
      "http://static-r.msparis.com/uploads/products/b/0/b06b5598768b23dc5728edee3edaaf6b.jpg",
      "http://static-r.msparis.com/uploads/products/6/2/628b77d2074fb34870e67e63e6493b1b.jpg",
      "http://static-r.msparis.com/uploads/products/3/e/3e319823cdb07b5d943963be5b8629d8.jpg"
      ],
      name:'柔粉休闲羽绒棉外套柔粉休闲羽绒棉外套柔粉休闲羽绒棉外套',
      id: '42595',
      brand:'R13',
      brand_desc: '源自纽约潮流牛仔品牌R13以碎裂的紧身牛仔裤著称，始终坚持自己低腰和调档的设计。 通过牛仔丹宁和真皮单品展现自信与开拓精神，书写真正的美国丹宁品味。以摇滚美学为设计基础，品牌通过做旧、褪色及抽须等手法打造出随性又适合全天候穿着的日常服装。偶尔Boyish的布贴烫花和夸张金属腰带，搭配牛仔靴和帆布鞋，个性十足。',
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
});
