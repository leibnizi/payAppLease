import { get, post } from '/util/httpService.js';
import loading from '/util/loading.js'


Page({
  data: {
    productList:[
      {
        brand:"hhhh",
        name:"www",
      }
    ],
    showTop: true,
    showDelete: false
  },
  onLoad() {},
  async onShow() {
    loading.show();
    try {
      const { data: { data }, status } = await this.getData();
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
  async deleteProduct(e) { 
    const { id } = e.target.dataset;
    loading.show();
    try {
      const { status } = await del('/cart/mall', { 
        sale_item_id: id,
      } ,{
        params: {
        }
      })
      if (status === "ok") {
        const { productList } = this.data;
        const newProductList = productList.filter(item => item.sale_item_id !== id)
        this.setData({
          productList: newProductList
        })
      }
    }
    catch (e) {
    } finally {
      loading.hide();
    }
  },
  async goToBuy(){
    loading.show();
    try {
      const {data, status, error} = await this.postConfirm()
      console.log(error, "mmmm", data)
      if (data && data instanceof Object) {
        my.navigateTo({
          url:'/page/order'
        })
        // this.setData({
        //   productList: data.items
        // })
      }
      else if (error && error instanceof Object ){
        my.showToast({
          type: 'success',
          content: `${error.message}`,
          duration: 2000,
        });
      }
      else{
        loading.hide();
      }
    }
    catch (e) {
      console.log("Result", e)
    } finally {
    }
  },
  showDeleteFun(e){
    const { productList } = this.data;
    const { id } = e.target.dataset;
    const newProductList = productList.map((item, index) => {
      if (item.sale_item_id == id) {
        item.showDelete = !(item.showDelete)
      }
      else{
        item.showDelete = false
      }
      return item
    })
    this.setData({
      productList: newProductList
    })
  },
  closeTopFun(){
    this.setData({
      showTop: false
    })
  },
  postConfirm() {
    return post('/confirm/mall',{

    }, {
      params: {
      }
    })
  },
  getData() {
    return get('/cart/mall', {
      params: {
      }
    })
  },
});
