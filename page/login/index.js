import Util from '/util/util.js'
import {get, post} from '/util/httpService.js'
let setIntervalTime = null;
Page({
  data: {
    hidden: true,
    code: '',
    codeText: '获取验证码',//获取验证码 重新获取验证码 30S重新获取
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
    console.log(12122);
    if(!Util.checkPhone(this.data.mobile)){
      Util.toast({
        type:'none',
        content: '请输入有效手机号！',
        duration: 1000 * 1
      });
      return false;
    }
    if(this.data.code.length != 4){
      Util.toast({
        type:'none',
        content: '请输入有效验证码！',
        duration: 1000 * 1
      });
      return false;
    }
    post('alipaymini/bind', { 
      mobile: this.data.mobile,
      code: this.data.code,
      }, {success:(rps)=>{
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
    if(!Util.checkPhone(this.data.mobile)){
      Util.toast({
        type:'none',
        content: '请输入有效手机号！ ',
        duration: 1000 * 1
      });
      return false;
    }
    get('common/sms', { params: { mobile: this.data.mobile }, success:(rps)=>{
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
});
