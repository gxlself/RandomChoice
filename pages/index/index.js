const gxl = require('../../utils/util.js');
const app = getApp();
// const CARD_MUSIC = 'https://gxlself.com/images/card.wav'
// let backgroundAudioManager = null
Page({
  data: {
    DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
    STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
    BODY_HEIGHT: wx.WIN_HEIGHT - wx.STATUS_BAR_HEIGHT - wx.DEFAULT_HEADER_HEIGHT,
    openId: '',                                         // 用户openId
    choiceList: [],                                     // 由于list
    isLogin: false,                                     // 是否登录
    showResult: false,                                  // 展示结果显隐
    choiceObject: {},                                   // 展示结果
    tapType: 1,                                         // 点击按钮类型
    showMore: false,                                    // 点击添加后弹出开始选择
  },
  onShareAppMessage: function (e) {
    switch(e.from) {
      case 'button':
        let openId = e.target.dataset.openid
        let id = e.target.dataset.id
        this.setData({tapType: 2})
        return {
          title: '快来帮我看看这件事情我该怎么决定？',
          path: '/pages/help/help?from=' + openId + '&id=' + id,
          imageUrl: 'https://gxlself.com/images/help-choose.png'
        }
      default:
        return {
          title: '随心所选-帮你选一个你犹豫的事情',
          path: '/pages/index/index',
          imageUrl: 'https://gxlself.com/images/help-choose.png'
        }
    }
  },
  bindGetUserInfo: function (e) {
    gxl.saveUserInfo(e.detail, (openId) => {
      app.globalData.openId = openId
      this.setData({ isLogin: true, openId: openId }, () => {
        this.onLoad()
      })
    })
  },
  onLoad: function () {
    if (app.globalData.openId) {
      this.setData({ isLogin: true, openId: app.globalData.openId }, () => {
        this.getChoiceList(app.globalData.openId)
      })
      return
    }
    const nickName = wx.getStorageSync('nickName')
    const saveOpenid = wx.getStorageSync('openid')
    if (nickName && saveOpenid && nickName != '<Undefined>' && saveOpenid != '<Undefined>') {
      app.globalData.openId = saveOpenid
      this.setData({ isLogin: true, openId: saveOpenid })
      this.getChoiceList(saveOpenid)
    }else{
      this.setData({ isLogin: false })
    }
  },
  onShow: function(){
    if ((app.globalData.choiceCount != this.data.choiceList.length) && app.globalData.openId) {
      this.getChoiceList(app.globalData.openId)
    }
  },
  // 展示结果
  showResult(e) {
    this.setData({tapType: 1})
    let choiceIndex = e.currentTarget.dataset.index
    this.data.choiceObject = this.data.choiceList[choiceIndex]
    this.data.showResult = true
    this.setData({choiceList: this.data.choiceList, showResult: this.data.showResult, choiceObject: this.data.choiceObject}, () => {
      // backgroundAudioManager = wx.getBackgroundAudioManager()
      // backgroundAudioManager.title = '随心所选'
      // backgroundAudioManager.singer = '随心所选'
      // backgroundAudioManager.coverImgUrl = 'https://gxlself.com/images/random.png'
      // backgroundAudioManager.src = CARD_MUSIC
      wx.vibrateShort()
    })
  },
  // 点击弹框
  tapToast() {
    this.data.showResult =! this.data.showResult
    this.setData({showResult: this.data.showResult})
  },
  // 删除选项
  deleteChoice(e) {
    this.setData({tapType: 2})
    let choiceId = e.currentTarget.dataset.id
    let choiceIndex = e.currentTarget.dataset.index
    let choiceList = this.data.choiceList
    choiceList[choiceIndex].show = false
    gxl.deleteOneData('choice', choiceId, success => {
      this.setData({choiceList: choiceList, tapType: 1})
    }, fail => {
      wx.showToast({ title: '删除失败', icon: 'none', duration: 1500, mask: true })
    })
  },
  // 跳转到添加选项页
  goAddChoice() {
    if (!this.data.openId && !app.globalData.openId) {
      this.setData({ isLogin: false })
      return 
    }
    wx.navigateTo({
      url: '../add-choice/add-choice'
    })
  },
  // 获取已经添加的选项数据
  getChoiceList(openId) {
    gxl.getMoreData('choice', {_openid: openId}, res =>{
      if (res.errMsg.indexOf('get:ok') > -1) {
        app.globalData.choiceCount = res.data.length
        res.data = res.data.map(item => {
          item.show = true
          return item
        })
        this.setData({choiceList: res.data})
      }
    })
  },
  // 监听动画结束状态
  animationEnd() {
    // backgroundAudioManager.stop()
    // backgroundAudioManager.seek(0)
  },
  swiperHide(e) {
    let choiceIndex = e.currentTarget.dataset.index
    this.data.choiceList.splice(choiceIndex, 1)
    this.setData({choiceList: this.data.choiceList})
    if (app.globalData.choiceCount > 0) {
      app.globalData.choiceCount--
    } else {
      app.globalData.choiceCount = 0 
    }
  }
})