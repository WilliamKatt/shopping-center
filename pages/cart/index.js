// pages/cart/index.js
import {getSetting,chooseAddress,openSetting,showModal,showToast} from '../../utils/toasync.js';
import regeneratorRuntime from '../../lib/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myAddr:{},
    cartlist:[],
    totalNum:0,//总数量
    totalPrice:0,//总价格
    allChecked:false//是否全选
  },
  //结算
  async handleJieSuan(e){
    let openid = wx.getStorageSync("openid");
    if(!openid){
      await showToast('请先登录');
      return;
    }
    let {myAddr,cartlist,totalNum,totalPrice} = this.data;
    //如果购物车里面没有商品，不能结算
    if(!cartlist||cartlist.length==0){
      await showToast("请在购物车中加入商品");
      return;
    }
    else if(!myAddr||myAddr.userName==null){
      await showToast("请选择收货地址");
      return;
    }
    else if(totalNum==0){
      await showToast("请选择一个商品");
      return;
    }
    wx.setStorageSync("cart_totalnum", totalNum);
    wx.setStorageSync("cart_totalprice", totalPrice);
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  },
  handleSelectAll(e){
    this.data.allChecked = !this.data.allChecked;
    this.data.cartlist.forEach(v=>{
      v.checked =this.data.allChecked;
    });
    this.updateData(this.data.cartlist);
  },
  updateData(cartlist){
    console.log(cartlist);
    wx.setStorageSync("cartlist", cartlist);
  
      //数组的every方法，是循环数组，并且把每个元素的一个属性的布尔值返回
      //如果全部元素的布尔值都是true,那么最终结果就是true
      //只要有一个元素的布尔值是false,那么最终结果就是false
      //如果数组是空数组，every方法会返回true
      let allChecked=cartlist.length?cartlist.every(v=>v.checked):false;
      let totalNum=0;
      let totalPrice=0;
      cartlist.forEach(v=>{
        //如果商品列表中的元素是选中的
        if(v.checked)
        {
          totalNum+=v.num;//数量的统计
          totalPrice+=v.goods_price*v.num;//价格统计
        }
      });
      this.setData({
        cartlist,
        allChecked,
        totalNum,
        totalPrice
      });
  },
  async handleNumCalc(e){
    let {op,goodsid} = e.target.dataset;
    op = op*1;
    //首先要把点击的商品找出来
    let {cartlist} =this.data;
    //根据goodsid到商品数组里面找到符合的商品
    let index = cartlist.findIndex(v=>v.goods_id==goodsid);
    if(index!=-1){
      if(cartlist[index].num==1&&op==-1){
        let result = await showModal();
        if(result){
          cartlist.splice(index,1);
        }
      }
      else{
        cartlist[index].num+=op;
      }
      this.updateData(cartlist);
    }
  },
  handleSelectOne(e){
    //点击多选框，传递商品id
    let {goodsid} = e.target.dataset;
    let {cartlist} = this.data;
    //根据当前商品id从购物车商品列表中筛选出当前商品的索引
    let index = cartlist.findIndex(v=>v.goods_id==goodsid);
    cartlist[index].checked = !cartlist[index].checked;
    this.updateData(cartlist);
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
      this.setData({
        myAddr:chAddr
      });
      console.log(chAddr);
    } catch (error) {
      console.log(error);
    }
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
    //如果缓存里面有数据的话，那么页面加载的时候
    //应该是直接显示收货地址，而不是按钮
    let addr = wx.getStorageSync("myaddr");
    //页面每次显示的时候，加载缓存中购物车列表数据
    let cartlist = wx.getStorageSync("cartlist")||[];
    if(addr&&addr.userName)
    {
      this.setData({
        myAddr:addr
      });
    }
    this.updateData(cartlist);
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