import * as aliApi from './util/aliApi'
import { get } from '/util/httpService.js';

App({
  async onLaunch(options) {
    console.log('App Launch', options);
    const { data: { data: { rows } }, status } = await this.getAddress();
    rows.sort((a, b) => {
      return b.id - a.id
    })
    this.globalData.globalAddressList = rows
  },
  onShow() {
    aliApi.getAuthCode({scope:'auth_code'}).then(rsp=>{

    })
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
    item_id: '2018032901000222123469565693',
    category: 'ZMSC_1_4_1',
    globalAddressList:[],
    defaultGlobalAddress: {},
    location: {
      district:'黄埔',
      districtAdcode:'110101'
    },
    createData:{},/**创建卡订单数据 */
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
