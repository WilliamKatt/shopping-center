// pages/feedback/index.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
import {showToast,uploadFile} from "../../utils/toasync.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackContent:""
  },
  handleInput(e){
    let val = e.detail.value;
    this.setData({
      feedbackContent:val
    });
  },
  handleSubmit(e){
    let content = this.data.feedbackContent;
    if(!content)
    {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }
    let urls=[];
    this.images.forEach(async v=>{
      let result = await uploadFile({
        url: 'http://images.ac.cn/api/upload',//远程服务器url
        filePath: v,//本地图片路径
        name: "image",//image,表单的name属性
        formData: {apiType:"BaiDu",token:"937085f203e2daf6da9a797f5582"},
      });
      result = JSON.parse(result.data);
      let url = result.data.url.baidu;
      urls.push(url);
    });
    
    console.log(urls,content);

    wx.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 1500,
      mask: true
    });

    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      });
    },1000);
  },
  images:[],
  handleSelectImg(e)
  {
    this.images = e.detail;
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