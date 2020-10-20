// pages/category/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftCateList:[],
    rightCateList:[],
    currentIndex:0,
    scrollTop:0//用于每次点击左边菜单右边列表置顶
  },
  list:[],
  clickLeftItem(e){
    let {index} = e.target.dataset;
    this.setData({currentIndex:index});
    let rightList = this.list[index].children;
    this.setData({
      rightCateList:rightList,
      scrollTop:0
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存中读取数据
    let cachelist = wx.getStorageSync("goodscatelist");
    //如果没有缓存
    if(!cachelist)
    {
      this.getCateList();
    }//如果缓存超过15秒重新获取数据
    else if(Date.now()-cachelist.creatdate>1000*15){
      this.getCateList();
    }//缓存没有过期
    else{
      let data = cachelist.data;
      let leftList = data.map(val=>val.cat_name);
      let rightList = data[0].children;
      this.setData({
        //list:data,
        leftCateList:leftList,
        rightCateList:rightList
      });
    }
  },
  async getCateList(){
    let data = await request({url:'/category'});
    //把数据存储到缓存中
    wx.setStorageSync("goodscatelist",{creatdate:Date.now(),data:data});
    //循环结果数组，把一级分类单独取出来形成一个新的数组
    let leftList = data.map(val=>val.cat_name);
    let rightList = data[0].children;
    this.list = data;
    this.setData({
      //list:data,
      leftCateList:leftList,
      rightCateList:rightList
    });
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