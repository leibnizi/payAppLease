import {get} from '/util/httpService.js'
let setIntervalTime = null;
Page({
  data: {
    hidden: true,
    code: '',
    codeText: '获取验证码',//获取验证码 重新获取验证码 60S重新获取
    intervalTime: 30,
    mobile: '',
    invitation_code: '',
    access_token: ''
  },
  onLoad() {
    
  },

  onChangeMobile(event){
    this.setData({
      mobile: event.detail.value
    });
  },

  onChangeCode(event){
    this.setData({
      code: event.detail.value
    });
  },

  defaultTap(){
   this.setData({
     hidden:!this.data.hidden
   });
   this.createMaskShowAnim();
   this.createContentShowAnim();
  },
  onReset(){

  },
  onSubmit(){
    
  },
  /*
   * 验证码计时
   */
   _setIntervalTime(){
    clearInterval(setIntervalTime);
    var num = 30;
    setIntervalTime = setInterval(() => {
      num --;
      this.setData({
        intervalTime: num,
        codeText: num + 's重新获取'
      });

      if(num == 0){
        clearInterval(setIntervalTime);
        this.setData({
          intervalTime: 0,
          codeText: '重新获取'
        });
      }
    }, 1000);
  },
  /*
   * 获取验证码
   */
  getCode (event){
    get('/common/sms', { params: { mobile: this.mobile }, success:(rps)=>{
        console.log(rps);
        this.setData({
          intervalTime: 0
        });
    }, fail:(rps)=>{
        clearInterval(setIntervalTime);
        this.setData({
          intervalTime: 0,
          codeText: '重新获取'
        });
    }});
  },
  /*
   * 手机号check
   */
  _checkPhone (phone){
    if(!(/^1[34578]\d{9}$/.test(phone))){
      return false;
    }else {
      return true;
    }
  }

});
