// pages/goods_list/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:1,name:"综合",isActive:true},
      {id:2,name:"销量",isActive:false},
      {id:3,name:"价格",isActive:false},
    ],
    cate_id:0,
    goodsList:[],
    pages:1,//总页数
    total:20,//总记录数
    currentPage:1,//当前页
    pageSize:6//每页记录数
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.cat_id){
      options.cat_id=9;
    }
    this.setData({
      cate_id:options.cat_id
    });
    this.getGoodsList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //如果当前页数大于等于总页数，表示数据全部加载完毕
    if(this.data.currentPage>=this.data.pages){
      wx.showToast({
        title: '已经没有数据了',
        mask: false
      });
    }
    else{
      //把当前页数+1,取下一页记录
      this.setData({
        currentPage:++this.data.currentPage
      });
      console.log(this.data.currentPage);
      this.getGoodsList();
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉刷新之前，需要清空数据和初始化当前页
    this.setData({
      currentPage:1,
      goodsList:[]
    });
    this.getGoodsList();
  },
  async getGoodsList(){
    let data = await request({url:"/goodslist?cat_id="+this.data.cate_id
    +"&_page="+this.data.currentPage
    +"&_limit="+this.data.pageSize});
    //总页数
    let pages = Math.ceil(this.data.total/this.data.pageSize);
    this.setData({
      goodsList:[...this.data.goodsList,...data],
      pages
    });
    //数据加装完毕后，关闭下拉动画
    wx.stopPullDownRefresh();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})