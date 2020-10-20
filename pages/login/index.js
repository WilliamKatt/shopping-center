// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e){
    console.log(e);
    let {userInfo} = e.detail;
    let openid = wx.getStorageSync("openid");
    //一.如果openid不在缓存中,说明还没有登录过
    //   1. 调用wx.login方法获取code,然后把code
    //      和userInfo发给后台服务器
    //   2. 由后台服务器向微信服务器获取openid.
    //      获取到openid后后台服务器需要查询数据库，
    //      是否使用该openid注册过用户，
    //      如果没注册过，就注册一个新用户
    //      如果已经注册过，直接返回openid。
    //二. 如果在缓存中有openid直接返回个人中心
    wx.setStorageSync("userinfo", userInfo);
    if(!openid){
      //假设发送code和useInfo得到的返回结果
      let result={code:200,msg:'',data:{openid:"SSDFQEWFSF123123DFS"}};
      wx.setStorageSync("openid", result.data.openid);
    }
    wx.navigateBack({
      delta: 1//表示返回上一级页面，数字是多少就是几级
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