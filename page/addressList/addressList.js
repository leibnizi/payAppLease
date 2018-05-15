import {userList} from '/config/config.js';
import { push } from '/util/navigator.js';
import { get, post } from '/util/httpService.js';
import loading from '/util/loading.js'

Page({
  data: {
    page: 1,
    addressList:[],
    total: 0,
    noMoreList: true,
    page_size: 10,
    distanceStart: 0,
    distanceEnd: 0,
    // isIphoneX: app.globalData.isIphoneX ? true : false,
  },
  async onShow(){
    try {
      const { data: { data: { rows, total }}, status } = await this.geAddressList()
      const addressList = rows.sort((a,b) => a.id - b.id < 0)
      this.setData({
        addressList ,
        total
      })
    }
    catch (e) {
    } finally {
      loading.hide();
    }
  },
  async onReachBottom() {
    let { page } = this.data
    loading.show();
    this.setData({
      page: ++page
    })
    try {
      const { data:{data}, status } = await this.geAddressList();
      if (data && typeof data.rows === "object") {
        this.setData({
          productList: data.rows
        })
      }
    }
    catch (e) {
      this.setData({
        page: --page
      })
    } finally {
      loading.hide();
    }
  },
  async onPullDownRefresh(){
    let { page } = this.data
    loading.show();
    this.setData({
      page: 1
    })
    try {
      const { data: { data }, status } = await this.geAddressList();
      if (data && typeof data.rows === "object") {
        this.setData({
          productList: data.rows
        })
      }
    }
    catch (e) {
      my.showToast({
        type: 'fail',
        content: e,
        duration: 2000,
      });
    } finally {
      loading.hide();
      my.stopPullDownRefresh()
    }
  },
  selectedAddress(e){
    const { addressList } = this.data
    const globalAddress = addressList.filter((addressItem) => addressItem.id === e.target.dataset.id);
    my.setStorageSync({
      key: 'globalAddress',
      data: globalAddress[0]
    });
    my.navigateBack({
      delta: 1
    })
  },
  editAddress(e){
    const { addressList } = this.data
    const globalAddress = addressList.filter((addressItem) => addressItem.id === e.target.dataset.id);
    my.setStorageSync({
      key: 'globalAddress',
      data: globalAddress[0]
    });
    my.navigateTo({
      url: '/page/editAddress/editAddress?from=addressList'
    })
  },
  geAddressList() {
    const { page, page_size, access_token } = this.data
    return get('/user/address', {
      params: {
        type: 2,
        page,
        page_size,
        access_token
      }
    })
  },
  showDeleteAddressStart(e){
    this.setData({
      distanceStart: e.touches[0].clientX
    })
  },
  showDeleteAddressEnd(e) {
    const { clientX } = e.changedTouches[0];
    const { id } = e.target.dataset
    const { addressList, distanceStart } = this.data

    if (clientX - distanceStart < 0) {
      const newAddressList = addressList.map((item, index) => {
        if (item.id == id) {
          item.showDelete = true
        }
        else {
          item.showDelete = false
        }
        return item
      })

      this.setData({
        addressList: newAddressList
      })
    }
    
    // this.setData({
    //   distanceEnd: clientX
    // })

    // if (clientX - this.data.distanceStart < 0) {
    //   this.setData({
    //   })
    // }
  },
  hideDeleteBar(e){
    const { addressList } = this.data
    const newAddressList = addressList.map((item, index) => {
    const { id } = e.target.dataset

    if (item.id == id) {
      item.showDelete = false
    }
    // else {
    //   item.showDelete = false
    // }
    return item
    })
    this.setData({
      addressList: newAddressList
    })
  }





  // calculate(baseArr = [], min, max, canRepet,length){
  //   // const baseArr = []
  //   for (let i = 0; i < length; i++) {
  //     const item = Math.floor(Math.random() * (max - min + 1) + min);
  //     baseArr.push(item)
  //   }

  //   if (canRepet) {
  //     return baseArr
  //   }
  //   else{
  //     let newArray = [...new Set(baseArr)]
  //     let repeatNum = length - newArray.length
  //     if (repeatNum > 0) {
  //       // return 
  //       return this.calculate(newArray, min, max, canRepet, repeatNum, baseArr)
  //       // return this.calculate(newArray, min, max, canRepet, repeatNum)
  //     }
  //     else{
  //       return baseArr
  //     }
  //     //   return this.calculate(newArray, min, max, canRepet, repeatNum)
  //     // }
  //     // else{
  //     //   return newArray
  //     // }
  //   }
  //   // return canRepet ? array : [...new Set(array)]
  // }
});
