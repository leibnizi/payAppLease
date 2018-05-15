import {userList} from '/config/config.js';
import { push } from '/util/navigator.js';
import { get } from '/util/httpService.js';
import loading from '/util/loading.js'

Page({
  data: {
    productList: [
      {
        brand: "nike",
        name: 'ttt',
        size: 'S M L XL'
      },
      {
        brand: "nike",
        name: 'ttt',
        size: 'S M L XL'
      },
      {
        brand: "nike",
        name: 'ttt',
        size: 'S M L XL'
      },
      {
        brand: "nike",
        name: 'ttt',
        size: 'S M L XL'
      },
      {
        brand: "nike",
        name: 'ttt',
        size: 'S M L XL'
      },
    ],
    page: 1
  },

  async onShow() {
    loading.show();
    try {
      const { data: { data }, status } = await this.getData();
      // debugger
      if (data && typeof data.rows === "object") {
        this.setData({
          productList: data.rows
        })
      }
    }
    catch (e) {
      console.log("Result", e)
    } finally {
      loading.hide();
    }
  },
  async onReachBottom(){
    let { page } = this.data
    loading.show();
    this.setData({
      page: ++page
    })
    try {
      const { data: { data }, status } = await this.getData();
      if (data && typeof data.rows === "object") {
        this.setData({
          productList: data.rows
        })
      }
    }
    catch (e) {

    } finally {
      loading.hide();
    }
  },

  getData() {
    return get('/product/filter', {
      params: {
        mode: 1,
        page: this.data.page,
        page_size: 6,
        type: 1,
      }
    })
    
    // .then((rps) => {
    //   if (rps.data && rps.data.status == 'error' && rps.data.error && rps.data.error.code == '10017') {
    //     clearInterval(setIntervalTime);
    //     this.setData({
    //       intervalTime: 0,
    //       codeText: '重新获取'
    //     });
    //   } else {
    //     this.setData({
    //       intervalTime: 0
    //     });
    //     this._setIntervalTime();
    //   }
    // }, (rps) => {
    //   clearInterval(setIntervalTime);
    //   this.setData({
    //     intervalTime: 0,
    //     codeText: '重新获取'
    //   });
    // });
  },

  goPath(e){
    console.log(e);
    push(e.currentTarget.dataset.path)
  }
});
