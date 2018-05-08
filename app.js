import * as aliApi from './util/aliApi'

App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);
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
  },
});
