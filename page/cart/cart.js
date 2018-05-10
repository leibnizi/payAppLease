import { get } from '/util/httpService.js';
import loading from '/util/loading.js'
Page({
  data: {
    productList:[
      {
        brand:"hhhh",
        name:"www",
      }
    ]
  },
  onLoad() {},
  async onShow() {
    loading.show();
    try {
      const { data, status } = await this.getData();
      if (data && typeof data.items === "object") {
        this.setData({
          productList: data.items
        })
      }
    }
    catch (e) {
      console.log("Result", e)
    } finally {
      loading.hide();
    }
  },
  getData() {
    return get('/cart/mall', {
      params: {
        access_token: '9e7ac67598cd1023a065ef66f8829b73',
      }
    })
  },
});
