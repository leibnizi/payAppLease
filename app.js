import * as aliApi from './util/aliApi'

App({
  onLaunch(options) {
    console.log('App Launch', options);
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
    item_id: '2018032901000222123469565693',
    category: 'ZMSC_1_4_1' //线上租赁服装服饰
  }
});
