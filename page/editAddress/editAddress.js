import {userList} from '/config/config.js';
import { push } from '/util/navigator.js';
import { get, post } from '/util/httpService.js';
import loading from '/util/loading.js'

Page({
  data: {
    address_id:'',
    address_msg:{},
    region_code:''
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
      let globalAddress = my.getStorageSync({ key: 'globalAddress' });

      this.setData({
        address_msg: globalAddress.data
      });
    } else {
      // wx.setNavigationBarTitle({
      //   title: "添加收货地址"
      // });
      this.setData({
        address_msg: {},
      });
    }
    const { data } =await this.getConfigMsg();
    const citys = data["send_cities"]["send_cities"];
    const newCtiys = this.disposeCitys(citys)
    // const provinceObj = {};
    // provinceObj["100000"] = {};

    // const c = {};
    // citys.forEach(province => {
    //   const provinceId = province.key;
    //   c[provinceId] = province.name;
    //   const b = {};
    //   province.cities.forEach(city => {
    //     const cityId = city.key;
    //     b[cityId] = city.name;
    //     const a = {};
    //     city.regions.forEach(regions => {
    //       const regionsId = regions.key;
    //       a[regionsId] = regions.name;
    //     });
    //     provinceObj[cityId] = a;
    //   });
    //   provinceObj[provinceId] = b;
    // });
    // provinceObj["100000"] = c;
    // this.setData({
    //   provinceObj
    // });
  },

  async formSubmit(e) {
    const { value } = e.detail;

    const { address_id } = this.data;
    const {
      address_detail,
      contact_mobile,
      contact_name,
      region_name
    } = value

    const { region_code, address_msg: {id} } = this.data;

    if (!this.savePersonInfo(value)) return false;
    const { status } = await this.postForm({
      access_token: 'ab67e1463d6361375030635b090f2684',
      address_detail,
      contact_mobile,
      contact_name,
      id,
      region_code: region_code || "110105",
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
  disposeCitys (citys) {
    // citys.map((sheng, index) => {
    //   sheng.cities.map((shi, index) => {
    //     shi.regions.map((qu, index) => {
    //       return {
    //         city: qu.name,
    //         adCode: qu.key,
    //         spell: qu.pinyin
    //       },
    //     })
    //   })
    // })
  },

  changePlace(e){
    my.chooseCity({
      cities: [
        {
          city: '朝阳区',
          adCode: '110105',
          spell: 'chaoyang'
        }
      ],
      success: (res) => {
        my.alert({
          content: res.city + ':' + res.adCode
        });
      },
    });
  },
  getConfigMsg() {
    return get('/common/configs', {
      params: {
        send_cities: "0",
        access_token: 'ab67e1463d6361375030635b090f2684',
      }
    })
  },
  postForm (data) {
    return post('/user/address', data,{
      params: {
        access_token: 'ab67e1463d6361375030635b090f2684',
      }
    })
  }
});
