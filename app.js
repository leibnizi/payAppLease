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
    console.log('App Show');
    console.log(aliApi.hello);
    aliApi.getAuthCode({scope:'auth_code'}).then(rsp=>{
      console.log("Response",rsp)
    })
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    hasLogin: false,
    globalAddressList:[],
    defaultGlobalAddress:{}
  },
  getAddress() {
    return get('/user/address', {
      params: {
        type: 2,
        page: 1,
        page_size: 20
      }
    })
  },
});
