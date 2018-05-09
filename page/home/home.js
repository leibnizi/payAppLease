Page({
  data: {
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
  onLoad() {},
  defaultTap(){
    my.navigateTo({
      url:"/page/test/test"
    });
  }
});
