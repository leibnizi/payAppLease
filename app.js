import * as aliApi from './util/aliApi'
import { get } from '/util/httpService.js';

App({
  async onLaunch(options) {
    const { data: { data: { rows } }, status } = await this.getAddress();
    rows.sort((a, b) => {
      return b.id - a.id
    })
    this.globalData.location = rows[0]
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
