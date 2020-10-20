import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
Page({
  data: {
    swiperList:[]
  },
  onLoad: function () {
    this.getSwipterList();
  },
  async getSwipterList(){
    let data = await request({url:'/swiper'});
    this.setData({
      swiperList:data
    });
  }
})
