import * as aliApi from './util/aliApi'
import { get } from '/util/httpService.js';

App({
  onLaunch(options) {
  },
  onShow() {
  },
  onHide() {
  },
  globalData: {
    hasLogin: false,
    item_id: '2018032901000222123469565693',
    category: 'ZMSC_1_4_1',
    userAddressList:[], //用户全局的地址列表
    defaultUserAddress: {
      "id": 47043,
      "region_name": "河北省 邯郸市 邯山区",
      "address_detail": "asdasdasd",
      "contact_name": "dddddccc",
      "contact_mobile": "13124077261",
      "region_code": "130402",
      "area_name": "邯山区"
    },// 用户默认地址
    location: {
      id: 0,
      region_name: "",
      address_detail: "",
      contact_name: "",
      contact_mobile: "",
      region_code: "",
      area_name: ""
    }
  },
  getAddress() {
    return get('user/address', {
      params: {
        type: 2,
        page: 1,  
        page_size: 20
      }
    })
  }
});
