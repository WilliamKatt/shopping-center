// pages/selectwuliu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wuliu:[]
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
    //下面两个参数用于请求快递接口，获取物流信息
    let kd = options.kd;//快递服务商编号
    let kdno=options.kdno;//快递单号
    //由于没有做快递api服务，先模拟一下数据
    let wuliu=[
      {
        buzhou:'调货完成',
        list:[{
          info:"您的订单由第三方卖家拣货完成，待出库交付顺丰速递，运单号210001633605",
          date:"2020-07-24 09:44:19"
        }]
      },
      {
        buzhou:'下单完成',
        list:[{
        info:"您已经提交了订单，请等待第三方系统确认",
        date:"2020-07-23 22:21:28"
        }]
      }
    ];
    this.setData({
      wuliu
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