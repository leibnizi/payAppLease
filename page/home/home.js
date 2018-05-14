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
      const { data, status } = await this.getData();
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
      const { data, status } = await this.getData();
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
      headrs: {
        "Content-type": "text/html; charset=utf-8"
      },
      dataType: "text",
      params: {
        mode: 1,
        page: this.data.page,
        page_size: 6,
        type: 1,
        access_token: 'ab67e1463d6361375030635b090f2684',
      }
    })
  },

  goPath(e){
    console.log(e);
    push(e.currentTarget.dataset.path)
  }
});
