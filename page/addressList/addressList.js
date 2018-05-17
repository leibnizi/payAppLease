import {userList} from '/config/config.js';
import { push } from '/util/navigator.js';
import { get, post } from '/util/httpService.js';
import loading from '/util/loading.js'

Page({
  data: {
    page: 1,
    addressList:[],
    noMoreList: true,
    page_size: 10,
    distanceStart: 0,
    distanceEnd: 0,
    touchAddressId: ''
    // isIphoneX: app.globalData.isIphoneX ? true : false,
  },
  async onShow(){
    loading.show();
    try {
      const { data: { data: { rows }, status},  } = await this.getAddressList()
      const addressList = rows.sort((a,b) => a.id - b.id < 0)
      this.setData({
        addressList
      })
    }
    catch (e) {

    } finally {
      loading.hide();
    }
  },
  selectedAddress(e){
    const { addressList } = this.data
    const defaultGlobalAddress = addressList.filter((addressItem) => addressItem.id === e.target.dataset.id);
    const app = getApp()
    app.globalData.location = defaultGlobalAddress[0]

    my.showToast({
      type: 'success',
      content: '设置默认地址成功',
      duration: 1000,
      success: () => {
        my.navigateBack({
          delta: 1
        })
      },
    });
  },
  editAddress(e){
    const { addressList } = this.data
    my.navigateTo({
      url: '/page/editAddress/editAddress?from=addressList'
    })
  },
  getAddressList() {
    const { page, page_size } = this.data
    return get('user/address', {
      params: {
        type: 2,
        page,
        page_size
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
      const { data: { data, status } } = await this.postDelete(id)
      if (status === 'ok') {
        my.showToast({
          type: 'success',
          content: '删除成功',
          duration: 1000
        });
        const newAddressList = addressList.filter((item) => item.id !== id)
        
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
    }
  },
  postDelete(id){
    return post('user/address-del', {id})
  }
});
