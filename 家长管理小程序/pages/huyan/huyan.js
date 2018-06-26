// pages/huyan/huyan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * switch状态改变
   */
  statechange:function(e){
    console.log(e);
    var id=e.currentTarget.id;
    var state = e.detail.value;
    var tips;
    switch(id){
    case "protect_eye":
        if(state){
          tips="开启护眼"
        }else{
          tips="关闭护眼"
        }

    break;
    case "protect_over":
      if (state) {
        tips = "开启翻转识别"
      } else {
        tips = "关闭翻转识别"
      }
 
      break;
    case "protect_shadow":
      if (state) {
        tips = "开启防抖动"
      } else {
        tips = "关闭防抖动"
      }
      
      break;
    case "protect_wallow":
      if (state) {
        tips = "开启防沉迷"
      } else {
        tips = "关闭防沉迷"
      }

      break;
    }
    wx.showToast({
      title:tips,
    })

  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.pageData = {
      eye_state: false,
      reversal_state: false,
      shadow_state: false,
      protect_wallow_state: false,
    
    }
    wx.getStorage({
      key: 'pagedata',
      success: function (res) {
        if(res!=undefined){
             this.pageData=res.data
        }
      },
    })   
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
    wx.setStorage({
      key: 'pagedata',
      data: this.pageData,
    })
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