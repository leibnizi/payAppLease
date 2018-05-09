import {userList} from '/config/config.js';
import {push} from '/util/navigator.js';
Page({
  data: {
    list:userList
  },
  onLoad() {
    
  },
  goPath(e){
    console.log(e);
    push(e.currentTarget.dataset.path)
  }
});
