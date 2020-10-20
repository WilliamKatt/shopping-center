// pages/user/index.js
import {getSetting,chooseAddress,openSetting,showModal,showToast} from '../../utils/toasync.js';
import regeneratorRuntime from '../../lib/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectCount:0,
    visitedCount:0
  },
  handleToOrderlist(e){
    
    if(this.openid){
      let {type} = e.currentTarget.dataset;
      let url = "/pages/order/index?type="+type;
      wx.navigateTo({
        url
      });
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
        
    }
      
  },
  handleToCollectList(e){
    let {index} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/collect/index?index='+index
    });
      
  },
  handleToShare(e){
    wx.navigateTo({
      url: '/pages/ad/index',
    });
  },
  handleToContactUs(e){
    wx.navigateTo({
      url: '/pages/contactus/index',
    });
  },
  handleToFeedback(e){
    if(this.openid)
    {
      wx.navigateTo({
        url: '/pages/feedback/index',
      });
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
    }
    
  },
  async handleAddr(e){
    try {
      let getAddr = await getSetting();
      let scopeAddr = getAddr.authSetting["scope.address"];
      let chAddr;
      //如果用户接受授权，就可以获取地址信息
      if(scopeAddr === false){
        await openSetting();
      }
      chAddr = await chooseAddress();
      wx.setStorageSync("myaddr", chAddr);
      // this.setData({
      //   myAddr:chAddr
      // });
      console.log(chAddr);
    } catch (error) {
      console.log(error);
    }
  },
  openid:null,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync("userinfo");
    this.openid = wx.getStorageSync("openid");
    let collection = wx.getStorageSync("goodscollect")||[];
    let visited = wx.getStorageSync("visitedgoodslist")||[];
      
    this.setData({
      userInfo,
      collectCount:collection.length,
      visitedCount: visited.length
    });
    
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