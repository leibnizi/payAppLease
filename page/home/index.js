import animModal from '/templates/items/index.js';
import {get} from '/util/httpService.js'

Page({
  data: {
    hidden: true,
    product1: {
      img: 'http://static-r.msparis.com/uploads/7/5/75da5d0ab442a43948093798de962057.jpeg',
      brand:"nike!!!",
      name: "裤衩子",
      size: 'S M L',
      num:"1",
      price: '0'
    },
    product2:{
      img: 'http://static-r.msparis.com/uploads/7/5/75da5d0ab442a43948093798de962057.jpeg',
      brand: "nike!!!",
      name: "裤衩子",
      money:"0.00"
    }
  },
  onLoad() {
    //get("api/v3/test", { params: { a: "aa", b: "bb", c: "cc" } })
    /*
    my.getAuthCode({
    scopes: 'auth_user',
    success: (res) => {
        console.log(res.authCode);
        my.alert({
        content: res.authCode,
        });
    },
    });
    */
  },
  defaultTap(){
   this.setData({
     hidden:!this.data.hidden
   });
   this.createMaskShowAnim();
   this.createContentShowAnim();
  }
});
