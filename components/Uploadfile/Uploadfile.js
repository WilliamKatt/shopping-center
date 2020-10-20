// components/Uploadfile/Uploadfile.js
import {request} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime.js';
import {showToast} from "../../utils/toasync.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectImgs:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDelete(e){
      let {index} = e.currentTarget.dataset;
      let {selectImgs} = this.data;
      selectImgs.splice(index,1);
      this.setData({
        selectImgs
      });
    },
    handelSelectImg(e){
      wx.chooseImage({
        count: 3,//选择图片的数量
        sizeType: ['original', 'compressed'],//原图，压缩
        sourceType: ['album', 'camera'],//相册，相机
        success:async (result) => {
          let seletedCount = this.data.selectImgs.length;
          let tempCount = result.tempFilePaths.length;
          if(seletedCount==3|| (seletedCount+tempCount>3)){
            await showToast("图片不能超过3张");
            return;
          }
          this.setData({
            selectImgs:[...this.data.selectImgs,...result.tempFilePaths]
          });
          this.triggerEvent("selectimg",this.data.selectImgs);
        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
})
