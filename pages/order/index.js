// pages/order/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
import {showToast} from "../../utils/toasync.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    tabs:[
      {id:1,name:"全部订单",isActive:true},
      {id:2,name:"待付款",isActive:false},
      {id:3,name:"待收货",isActive:false},
      {id:4,name:"退款/退货",isActive:false},
    ],
    currentPage:1, //当前页
    pageSize:6, //每页记录数
    total:12, //总记录数
    pages:1, //总页数
    orderType:1
  },
  handlePay(e){
    let {order} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/pay/index?order='+JSON.stringify(order)
    });
      
  },
  handleItem(e){
    let {order} = e.currentTarget.dataset;
    wx.setStorageSync("clickorder", order);
    wx.navigateTo({
      url: '/pages/order_detail/index'
    });
      
  },
  handleClickItem(e){
    let {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((val,i) => {
      i===index?val.isActive=true:val.isActive=false;
    });
    
    this.setData({
      tabs,
      orderType:index+1,
      orderList:[],
      currentPage:1,
    });
    this.getOrderList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
/**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取小程序保存的页面数组，包含了之前打开过的页面对象
    let pages =  getCurrentPages();
    //页面数组最后一个元素就是当前页面对象，可以拿到传参
    let {options} = pages[pages.length-1];

    //根据用户中心传递的type动态修改激活的tab
    let {tabs} = this.data;
    tabs.forEach((val,i) => {
      //使用传递的type与数据索引做对比
      i===(options.type-1)?val.isActive=true:val.isActive=false;
    });
    this.setData({
      orderType:options.type,
      tabs
    });
    this.getOrderList();

  },
  async getOrderList(){
    let where="";
    //当orderType==2的时候，表示待付款
    if(this.data.orderType==2){
      where="order_pay=0&";
    }
    else if(this.data.orderType==3){
      where="order_pay=2&";
    }
    else if(this.data.orderType==4){
      where="order_pay=3&";
    }
    let orderList = await request({url:"/orders?"+
    where+
    "_page="+this.data.currentPage+
    "&_limit="+this.data.pageSize});
    //总页数
    let pages = Math.ceil(this.data.total/this.data.pageSize);
    orderList.forEach(v=>{
      v.create_time=new Date(v.create_time*1000).toLocaleString();
      let statusName = "";
      if(v.order_pay==0){
        statusName = "待付款";
      }
      else if(v.order_pay==2){
        statusName = "待发货";
      }
      else if(v.order_pay==3){
        statusName = "退款/退货";
      }
      else if(v.order_pay==1){
        statusName = "已完成";
      }
      v.statusName=statusName;
    });
    this.setData({
      orderList:[...this.data.orderList,...orderList],
      pages
    });
    //数据加装完毕后，关闭下拉动画
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    //如果当前页数大于等于总页数，表示数据全部加载完毕
    if(this.data.currentPage>=this.data.pages){
      await showToast("已经没有数据了");
    }
    else{
      //把当前页数+1,取下一页记录
      this.setData({
        currentPage:++this.data.currentPage
      });
      console.log(this.data.currentPage);
      this.getOrderList();
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})