import {userList} from '/config/config.js';
import { push } from '/util/navigator.js';
import { get, post } from '/util/httpService.js';
import loading from '/util/loading.js'

Page({
  data: {
    address_id:'',
    address_msg:{}, //地址列表带过来的默认地址数据
    region_code:'',
    citys: [],
    cityMsg: {
    },
    changeAddress: {}, //用户自己手动选择的地址
    showPlaceCelector: false
  },
  formReset: function () {
  },
  savePersonInfo: function (data) {
    // const telRule = /^199[3|4|5|7|8]\d{9}$/,
    const nameRule = /^[\u2E80-\u9FFF]+$/;
    var _phoneRule = contact_mobile => {
      const telRule = /^1\d{10}$/;

      // !telRule.test(contact_mobile)

      // contact_mobile = contact_mobile.substr(0, 3);
      // const first = contact_mobile.substr(0, 1);
      if (
        // contact_mobile.indexOf("99") != -1 ||
        // contact_mobile.indexOf("66") != -1 ||
        !telRule.test(contact_mobile)
      ) {
        return true;
      }
    };
    if (!data.contact_name) {
      my.alert({
        content: '请输入收货人',
        buttonText: '我知道了',
      });
    } else if (!data.contact_mobile) {
      my.alert({
        content: '请输入手机号码',
        buttonText: '我知道了',
      });
    } else if (_phoneRule(data.contact_mobile)) {
      my.alert({
        content: '手机号码格式不正确',
        buttonText: '我知道了',
      });
    } else if (!data.region_name) {
      my.alert({
        content: '请选择省市区',
        buttonText: '我知道了',
      });
    } else if (!data.address_detail) {
      my.alert({
        content: '请输入详细地址',
        buttonText: '我知道了',
      });
    } else if (
      data.address_detail.length < 5 ||
      data.address_detail.length > 60
    ) {
      my.alert({
        content: '收货地址最少5个字，最多不能超过60个字',
        buttonText: '我知道了',
      });
    } else {
      // my.alert({
      //   content: '保存成功',
      //   buttonText: '我知道了',
      // });
      return true;
    }
  },
  async onLoad(option) {
    if (option.from !== "add") {
    
      const app = getApp()
      const address_msg = app.globalData.defaultGlobalAddress
      this.setData({
        address_msg
      });
    } else {
      this.setData({
        address_msg: {},
      });
    }
    const { data: { data } } = await this.getConfigMsg();
    const citys = data["send_cities"]["send_cities"];
    this.setData({
      citys
    })
    this.disposeCitys([0, 0, 0])
  },
  disposeCitys(value) {
    const { citys } = this.data
    let shengArr = citys
    let shiArr = []
    let quArr = []
    let changeAddress = {}

    shiArr = shengArr[value[0]].cities
    quArr = shiArr[value[1]].regions
    changeAddress = quArr[value[2]]
    this.setData({
      cityMsg: {
        shengArr,
        shiArr,
        quArr
      }
    })
    return changeAddress
  },
  stopBubbling(){
    console.log('stop')
    return false 
  },
  onChange(e) {
    const { value } = e.detail
    const { address_msg } = this.data
    const changeAddress = this.disposeCitys(value);

    this.setData({
      changeAddress
    })
  },

  async formSubmit(e) {
    const { value } = e.detail;

    console.log(value)

    const { address_id } = this.data;
    const {
      address_detail,
      contact_mobile,
      contact_name,
      region_name
    } = value

    const { changeAddress, address_msg: {id} } = this.data;

    if (!this.savePersonInfo(value)) return false;
    const { data: { status } } = await this.postForm({
      address_detail,
      contact_mobile,
      contact_name,
      id:id || '',
      region_code: changeAddress.key || address_msg.region_code,
      region_name: region_name || ""
    });
    if (status === 'ok') {
      my.showToast({
        type: 'success',
        content: '操作成功',
        duration: 1000,
        success: () => {
          my.navigateBack({
            delta: 1
          })
        },
      });
    }
  },
  getConfigMsg() {
    return get('common/configs', {
      params: {
        send_cities: "0",
      }
    })
  },
  postForm (data) {
    return post('user/address', data,{
    })
  },
  showPlaceCelectorFun(){
    this.setData({
      showPlaceCelector: true
    })
  },
  hidePlaceCelectorFun() {
    console.log(22222)
    this.setData({
      showPlaceCelector: false
    })
  }
});
