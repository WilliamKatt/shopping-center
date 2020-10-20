// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:1,name:"收藏的商品",isActive:true},
      {id:2,name:"我的足迹",isActive:false}
    ],
    goodsList:[]
  },
  handleToGoodsDetail(e){

  },
  handleClickItem(e){
    let {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((val,i) => {
      i===index?val.isActive=true:val.isActive=false;
    });
    
    this.setData({
      tabs
    });
    let collection;
    if(index==0)
    {
      collection = wx.getStorageSync("goodscollect")||[];
    }
    else{
      collection = wx.getStorageSync("visitedgoodslist")||[];
    }
    this.setData({
      goodsList:collection
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
    let currentPages =  getCurrentPages();
    let {options} = currentPages[currentPages.length-1];
    let {tabs} = this.data;
    let index = options.index*1;
    tabs.forEach((val,i) => {
      i===index?val.isActive=true:val.isActive=false;
    });
    
    this.setData({
      tabs
    });
    let collection;
    if(index==0)
    {
      collection = wx.getStorageSync("goodscollect")||[];
    }
    else{
      collection = wx.getStorageSync("visitedgoodslist")||[];
    }
    this.setData({
      goodsList:collection
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