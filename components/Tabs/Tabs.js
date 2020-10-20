// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //父传子
    //这是暴露出去的属性，给父级页面传递数据进来
    //同时这个属性是绑定在view上面的
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //tabs:[
      
    //]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handelItemTap(e){
      let {index} = e.target.dataset;
      //子传父第一步：调用父级页面的自定义事件，并且传值
      //子传父第二步: 在父级页面通过
      //<Tabs bindclickitem="handleClickItem"></Tabs>
      //上的bindclickitem中的clickitem事件传递数据
      this.triggerEvent("clickitem",{index});
      /*
      let {tabs} = this.data;
      tabs.forEach((val,i) => {
        i===index?val.isActive=true:val.isActive=false;
      });
      
      this.setData({
        tabs
      });*/
    }
  }
})
