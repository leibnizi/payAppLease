import Util from '/util/util.js'
import {get, post} from '/util/httpService.js'
import AuthLogin from '/util/authLogin.js'

let setIntervalTime = null;
Page({
  data: {
    hidden: true,
    code: '',
    codeText: '获取验证码',//获取验证码 重新获取验证码 30S重新获取
    intervalTime: 30,
    mobile: '',
    invitation_code: '',
    access_token: '',
    setIntervalTime: false //当前验证码状态
  },
  onLoad(query) {
    console.log(query);
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

    let userInfo = my.getStorageSync({key:'userInfo'}).data;

    if(userInfo && userInfo.token_type == 2){
      my.alert({
        title: '警告',
        content: '你已经是绑定过了，请直接体验！'
      });
      return false;
    }
    
    if(!Util.isPhone(this.data.mobile)){
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
      },{}).then(
        (rps)=>{
          if(rps.data && rps.data.status == 'error' && rps.data.error){
            clearInterval(setIntervalTime);
            this.setData({
              intervalTime: 0,
              codeText: '重新获取'
            });
          }else{
            clearInterval(setIntervalTime);
            this.setData({
              intervalTime: 0,
              access_token: rps.data.access_token,
              head_portrait: rps.data.head_portrait,
              mobile: rps.data.mobile,
              invitation_code: rps.data.invitation_code,
              nickname: rps.data.nickname,
              new_user: rps.data.new_user
            });

            my.navigateBack({
              data:1
            });
          }
        },(rps)=>{
          clearInterval(setIntervalTime);
          this.setData({
            intervalTime: 0,
            codeText: '重新获取'
          });
      }
    );
  },
  /*
   * 验证码计时
   */
   _setIntervalTime(){
     this.setData({
       setIntervalTime: true
     });
    clearInterval(setIntervalTime);
    var num = 30;
    setIntervalTime = setInterval(() => {
      num --;
      this.setData({
        setIntervalTime: true,
        intervalTime: num,
        codeText: num + '秒后重发'
      });

      if(num == 0){
        clearInterval(setIntervalTime);
        this.setData({
          intervalTime: 0,
          codeText: '重新获取',
          setIntervalTime: false
        });
      }
    }, 1000);
  },
  
  /*
   * 获取验证码
   */
  getCode (event){
    if(!Util.isPhone(this.data.mobile)){
      Util.toast({
        type:'none',
        content: '请输入有效手机号！ ',
        duration: 1000 * 1
      });
      return false;
    }

    //检测setIntervalTime是不是在执行
    if(this.data.setIntervalTime && setIntervalTime){
      Util.toast({
        type:'none',
        content: '请稍后再获取验证码！ ',
        duration: 1000 * 1
      });
      return false;
    }

    get('common/sms', { params: { mobile: this.data.mobile }}).then((rps)=>{
        if(rps.data && rps.data.status == 'error' && rps.data.error && rps.data.error.code == '10017'){
          clearInterval(setIntervalTime);
          this.setData({
            intervalTime: 0,
            codeText: '重新获取'
          });
        }else{
          this.setData({
            intervalTime: 0
          });
          this._setIntervalTime();
        }
    }, (rps)=>{
        clearInterval(setIntervalTime);
        this.setData({
          intervalTime: 0,
          codeText: '重新获取'
        });
    });
  },
});
