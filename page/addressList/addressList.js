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
    touchAddressId: ''
    // isIphoneX: app.globalData.isIphoneX ? true : false,
  },
  async onShow(){
    try {
      loading.show();
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
  // async onReachBottom() {
  //   let { page } = this.data
  //   loading.show();
  //   this.setData({
  //     page: ++page
  //   })
  //   try {
  //     const { data:{data}, status } = await this.geAddressList();
  //     if (data && typeof data.rows === "object") {
  //       this.setData({
  //         productList: data.rows
  //       })
  //     }
  //   }
  //   catch (e) {
  //     this.setData({
  //       page: --page
  //     })
  //   } finally {
  //     loading.hide();
  //   }
  // },
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
  },
  async deleteFun(e){
    const { id } = e.target.dataset
    const { addressList } = this.data
    try {
      loading.show();
      const { data, status } = await this.postDelete(id)
      if (status === 'ok') {
        const newAddressList = addressList.filter((item) => {
          item.id === id
        })
        this.setData({
          addressList: newAddressList
        })
      }

      // const addressList = rows.sort((a, b) => a.id - b.id < 0)
      // this.setData({
      //   addressList,
      //   total
      // })
    }
    catch (e) {

    } finally {
      loading.hide();
    }
  },
  postDelete(id){
    return post('/user/address-del', {id})
  }
});
