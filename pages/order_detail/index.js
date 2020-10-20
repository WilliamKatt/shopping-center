// pages/order_detail/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
import {showToast} from "../../utils/toasync.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickOrder:{}
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
  handlePay(e){
    let order = this.data.clickOrder;
    wx.navigateTo({
      url: '/pages/pay/index?order='+JSON.stringify(order)
    });
      
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let clickOrder = wx.getStorageSync("clickorder");
    this.setData({
      clickOrder
    });
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