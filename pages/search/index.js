// pages/search/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    goodsList:[]
  },
  timeId:-1,
  //input标签的input事件名前面不能使用async
  handleInput(e){
    let {value}=e.detail;
    if(value.trim()){
      clearTimeout(this.timeId);
      this.timeId=setTimeout(()=>{
        this.searchGoods(value);
      },1000);
    }
  },
  async searchGoods(value){
    let data=await request({url:"/goodslist?goods_name_like="+value});
    this.setData({
      goodsList:data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})