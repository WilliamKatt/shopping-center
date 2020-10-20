// pages/goods_detail/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
import {showToast} from "../../utils/toasync.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    isCollect:false //是否收藏
  },
  async handleCollection(e){
    //1.读取缓存
    let collection = wx.getStorageSync("goodscollect")||[];
    
    //2.如果已经缓存，那么取消缓存
    if(this.data.isCollect){
      let isCollect = collection.some(v=>v.goods_id==this.data.goods.goods_id);
      this.setData({
        isCollect:!isCollect
      });
      let index = collection.findIndex(v=>v.goods_id==this.data.goods.goods_id);
      collection.splice(index,1);
      wx.setStorageSync("goodscollect", collection);
      await showToast("取消收藏成功");
    }//如果没有缓存，那么添加商品到收藏缓存
    else{
      this.setData({
        isCollect:true
      });
      collection.push(this.data.goods);
      wx.setStorageSync("goodscollect", collection);
      await showToast("收藏成功");
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let currentPages =  getCurrentPages();
    let {options} =  currentPages[currentPages.length-1];
    //由于真实商品只有两个，所以把每个传递的id给getGoods传进去
    //等到获取真实商品的详情后，再把传递的id重新赋值，保证
    //每个商品可以缓存到我的足迹
    let goodsId = !options.goods_id?0:options.goods_id;
    if(!options.goods_id||(options.goods_id!=57444&&
      options.goods_id!=57445)){
      options.goods_id=57444;
    }
    this.getGoods(options.goods_id,goodsId);
  },
  handleAddCart(e){
    //1.如果缓存中没有保存购物车数据，就添加
    let cacheList=wx.getStorageSync("cartlist")||[];
    //根据比对goods_id的结果，返回对应元素的索引，如果不存在返回-1
    let index = cacheList.findIndex(v=>v.goods_id==this.data.goods.goods_id);
    if(index==-1){
      //给goods对象添加一个num属性，用于计数
      this.data.goods.num = 1;
      cacheList.push(this.data.goods);
      wx.setStorageSync("cartlist", cacheList);
    }
    else{
      cacheList[index].num +=1;//如果在购物车中存在商品，就把数量加1
      wx.setStorageSync("cartlist", cacheList);
    }
    wx.showToast({
      title: '加入购物车成功'
    });
      
  },
  handleSwiper(e){
    //当前点击的图片路径
    let {url} = e.currentTarget.dataset;
    //所有轮播图的路径组成的一个一维数组
    let pics = this.data.goods.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current: url,
      urls: pics
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  async getGoods(gid,goods_id){
    let data = await request({url:"/goods?goods_id="+gid});
    data[0].goods_introduce = data[0].goods_introduce.replace(/\.webp/g,'.jpg');
    this.setData({
      goods:{
        //goods_id:data[0].goods_id,
        goods_id,
        goods_price:data[0].goods_price,
        goods_name:data[0].goods_name,
        goods_introduce:data[0].goods_introduce,
        pics:data[0].pics
      }
    });
    let collection = wx.getStorageSync("goodscollect")||[];
    let isCollect = collection.some(v=>v.goods_id==this.data.goods.goods_id);
    console.log(this.data.goods.goods_id);
    //读取我的足迹缓存
    let myVisited = wx.getStorageSync("visitedgoodslist")||[];
    //判断当前商品是否在足迹缓存中存在
    let isVisited = myVisited.some(v=>v.goods_id==this.data.goods.goods_id);
    if(!isVisited){
      //如果当前商品在缓存中不存在，那么就添加到缓存中
      myVisited.push(this.data.goods);
      wx.setStorageSync("visitedgoodslist", myVisited);
    }
    this.setData({
      isCollect
    });
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