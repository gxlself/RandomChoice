const gxl = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
    STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
    BODY_HEIGHT: wx.WIN_HEIGHT - wx.STATUS_BAR_HEIGHT - wx.DEFAULT_HEADER_HEIGHT,
    openId: '',                                         // 用户openId
    choiceList: [],                                     // 由于list
    isLogin: false                                      // 是否登录
  },
  onShareAppMessage: function (e) {
    console.log(e)
  },
  bindGetUserInfo: function (e) {
    gxl.saveUserInfo(e.detail, (openId) => {
      console.log(openId)
      app.globalData.openId = openId
      this.setData({ isLogin: true, openId: openId })
      this.onLoad()
    })
  },
  onLoad: function () {
    gxl.getStorage('openid', res => {
      if (res != '' || res != null || res != undefined || res != '<Undefined>') {
        app.globalData.openId = res
        this.setData({ isLogin: true, openId: res })
        this.getChoiceList(res)
      }else{
        this.setData({ isLogin: false })
      }
    }, err => {
      this.setData({isLogin: false})
    })
    gxl.cloudReq('add', res => {
      console.log(res)
    })
  },
  onShow: function(){
    if ((this.data.openId || app.globalData.openId) && this.data.choiceList.length < 1) {
      this.setData({ isLogin: true })
      this.getChoiceList(this.data.openId || app.globalData.openId)
    } else {
      this.setData({ isLogin: false })
    }
  },
  showResult() {
    console.log('choose for me')
  },
  deleteChoice() {
    console.log('delete')
  },
  goAddChoice() {
    if (!this.data.openId && !app.globalData.openId) {
      this.setData({ isLogin: false })
      return 
    }
    wx.navigateTo({
      url: '../add-choice/add-choice'
    })
  },
  getChoiceList(openId) {
    gxl.getMoreData('choice', {_openid: openId}, res =>{
      if (res.errMsg.indexOf('get:ok') > -1) {
        this.setData({choiceList: res.data})
      }
    })
  }
})