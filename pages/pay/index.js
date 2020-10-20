// pages/cart/index.js
import {login, showToast} from '../../utils/toasync.js';
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
  async handleGetUserInfo(e){
    let {userInfo} = e.detail;
    if(!userInfo){
      //把用户信息缓存
      wx.setStorageSync("userinfo", userInfo);
    }
    let openid = wx.getStorageSync("openid");
    if(!openid){
      //通过wx.login方法获取code,用于
      //发送给项目服务器，然后项目服务器
      //再发请求给微信服务器获取openid
      //最后openid返回给微信小程序
      //openid是用户在应用中的唯一标识
      let loginResult = await login();
      let code = loginResult.code;
      
      //调用let res = await request({url:"获取openid的地址",data:{
      //  code,
      //  userInfo
      //}});
      //ordernum是项目服务器生成的商品订单号
      // let {openid,ordernum} = res.data;
      // wx.setStorageSync("openid",openid);

      
      //收到付出成功的结果后，需要发请求修改订单状态
      //为已支付
      await showToast('支付成功');
      wx.navigateTo({
        url: '/pages/order/index',
      });
    }
    //发送openid给项目服务器，获取预支付id(prepay_id)
      //调用let res = await request({url:"项目服务器地址/wxpay",data:{
      //  openid,
      //  ordernum
      //}});
      //res.data里面的数据
      //假设args是res.data的数据
      /*
      var args = {
          appId: wxConfig['appid'],
          timeStamp: timeStamp,
          nonceStr: nonce_str,
          signType: "MD5",
          package: prepay_id,
          paySign: _paySignjs,
          status:200
      };
      //通过prepay_id发起支付
      //需要把这个方法封装为promise方式，
      //通过async await调用
      wx.requestPayment({
        timeStamp: args.timeStamp,
        nonceStr: args.nonceStr,
        package: args.package,
        signType: args.signType,
        paySign: args.paySign,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });*/
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
    //从订单列表过来
    if(options.order)
    {
      let order = JSON.parse(options.order);
      let goods=order.goods;
      goods.forEach(ele=>{
        ele.checked=true;
        ele.pics=[{pics_mid:ele.goods_small_logo}];
        ele.num=ele.goods_number;
      });
      this.setData({
        cartlist:goods,
        totalNum:order.total_count,
        totalPrice:order.total_price,
        myAddr:{
          consignee_addr:order.consignee_addr,
          userName:order.consignee,
          telNumber:order.consignee_phone
        }
      });
    }//从购物过来
    else{
      //如果缓存里面有数据的话，那么页面加载的时候
      //应该是直接显示收货地址，而不是按钮
      let addr = wx.getStorageSync("myaddr");
      //页面每次显示的时候，加载缓存中购物车列表数据
      let cartlist = wx.getStorageSync("cartlist")||[];
      if(cartlist.length>0){
        //把商品列表中checked为true的商品返回组成一个新的数组
        cartlist = cartlist.filter(v=>v.checked);
      }
      let totalNum = wx.getStorageSync("cart_totalnum");
      let totalPrice = wx.getStorageSync("cart_totalprice");
      if(addr&&addr.userName)
      {
        addr.consignee_addr = addr.provinceName
        +addr.cityName+addr.countyName+addr.detailInfo;
        this.setData({
          myAddr:addr
        });
      }
      
    }
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