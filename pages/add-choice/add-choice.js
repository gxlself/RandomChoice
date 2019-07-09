const gxl = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
    STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
    BODY_HEIGHT: wx.SCREEN_HEIGHT - wx.STATUS_BAR_HEIGHT - wx.DEFAULT_HEADER_HEIGHT,
    editChoice: [{
      content: '',
      isConfirm: false
    }]
  },
  back() {
    wx.navigateBack()
  },
  nextInput(e) {
    if (e.detail.value == '' || e.detail.value == ' ' || e.detail.value.trim() == '' || e.detail.value.trim() == ' ') {
      wx.showToast({title: '请填写当前选项',icon: 'none',duration: 1500})
      return
    }
    let index = this.data.editChoice.length - 1
    this.data.editChoice[index].content = e.detail.value.trim()
    this.data.editChoice[index].isConfirm = true
    this.data.editChoice.push({content: '',isConfirm: false})
    this.setData({editChoice: this.data.editChoice})
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
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})