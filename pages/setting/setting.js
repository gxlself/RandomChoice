const gxl = require('../../utils/util.js')
Page({
  data: {
    showToast: false
  },
  bindUserInfo: function(){
    if (gxl.checkLogin()){
      console.log(1111)
    }else{
      this.setData({
        showToast: true
      })
    }
  },
  userLogin: function(){
    console.log(1111)
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onShareAppMessage: function () {

  }
})