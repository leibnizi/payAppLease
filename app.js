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
      "region_code": "",
      "area_name": ""
    },// 用户默认地址
    location: {
      district:'黄埔',
      districtAdcode:'110101'
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
