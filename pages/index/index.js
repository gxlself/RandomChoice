const gxl = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
    STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
    BODY_HEIGHT: wx.WIN_HEIGHT - wx.STATUS_BAR_HEIGHT - wx.DEFAULT_HEADER_HEIGHT
  },
  onShareAppMessage: function (e) {
    console.log(e)
  },
  bindGetUserInfo: function (e) {
    let that = this;
    gxl.saveUserInfo(e.detail, res => {
      that.setData({ isLogin: true })
    })
  },
  onLoad: function () {
    console.log(app.globalData)
  },
  onShow: function(){
    let that = this;
    let openid = gxl.getStorage('openid', res => {
      if (res){
        that.setData({ isLogin: true })
      }else{
        that.setData({ isLogin: false })
      }
    }, err => {
      that.setData({isLogin: false})
    })
  },
  showResult() {
    console.log('choose for me')
  },
  deleteChoice() {
    console.log('delete')
  },
  goAddChoice() {
    wx.navigateTo({
      url: '../add-choice/add-choice'
    })
  }
})