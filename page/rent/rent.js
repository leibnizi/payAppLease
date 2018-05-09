import animModal from '/templates/items/index.js';
import {get} from '/util/httpService.js'

Page({
  ...animModal.animOp,
  data: {
    hidden:true
  },
  onLoad() {
    get("api/v3/test",{params:{a:"aa",b:"bb",c:"cc"}})
  },
  defaultTap(){
   this.setData({
     hidden:!this.data.hidden
   });
   this.createMaskShowAnim();
   this.createContentShowAnim();
  }
});
