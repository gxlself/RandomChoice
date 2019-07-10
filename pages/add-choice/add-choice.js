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
    }],
    currentTitle: '',
    openId: ''
  },
  back() {
    wx.navigateBack()
  },
  // 键盘下一条点击
  nextInput(e) {
    let index = e.currentTarget.dataset.index
    // 前后去空判定
    if (e.detail.value == '' || e.detail.value == ' ' || e.detail.value.trim() == '' || e.detail.value.trim() == ' ') {
      wx.showToast({ title: '请填写当前选项', icon: 'none', duration: 1500, mask: true })
      return
    }
    // 对是否编辑进行判定 index不是最后一条就属于编辑状态
    if (index != this.data.editChoice.length - 1) {
      this.data.editChoice[index].content = e.detail.value.trim()
      this.data.editChoice[index].isConfirm = true
    } else {
      let addIndex = this.data.editChoice.length - 1
      this.data.editChoice[addIndex].content = e.detail.value.trim()
      this.data.editChoice[addIndex].isConfirm = true
      this.data.editChoice.push({ content: '', isConfirm: false })
    }
    this.setData({ editChoice: this.data.editChoice })
  },
  // 编辑已经确认的
  editChoice(e) {
    let index = e.currentTarget.dataset.index
    this.data.editChoice[index].isConfirm = false
    this.setData({ editChoice: this.data.editChoice })
  },
  // 标题输入绑定
  inputTitle(e) {
    this.data.currentTitle = e.detail.value
    this.setData({ currentTitle: this.data.currentTitle })
  },
  // 对应输入绑定
  inputPointContent(e) {
    let index = e.currentTarget.dataset.index
    this.data.editChoice[index].content = e.detail.value.trim()
    this.setData({ editChoice: this.data.editChoice })
  },
  // 开始保存当前疑难
  saveChoice() {
    if (this.data.currentTitle == '' || this.data.currentTitle == ' ' || this.data.currentTitle.trim() == '' || this.data.currentTitle.trim() == ' ') {
      wx.showToast({ title: '请填写犹豫的主题', icon: 'none', duration: 1500, mask: true })
      return
    }
    let length = this.data.editChoice.length
    if (length == 1) {
      if (this.checkContent(this.data.editChoice[0].content)) {
        this.formChoice(true)
      } else {
        wx.showToast({ title: '没有犹豫的事项', icon: 'none', duration: 1500, mask: true })
      }
    } else if (length > 1) {
      if (this.checkContent(this.data.editChoice[length - 1].content)) {
        // 对话框判定是否保存最后一条
        wx.showModal({
          title: '是否保存最后一条',
          showCancel: true,
          cancelText: '不保存',
          confirmText: '保存',
          success: res => {
            if (res.confirm) {
              this.formChoice(true)
            } else {
              this.formChoice(false)
            }
          }
        })
        return
      }
      this.formChoice(false)
    } else {
      wx.showToast({ title: '请添加犹豫的事项', icon: 'none', duration: 1500, mask: true })
      return
    }
  },
  // 简单校验
  checkContent(content) {
    if (content == '' || content == ' ' || content.trim() == '' || content.trim() == ' ') {
      return false
    } else {
      return true
    }
  },
  // 提交
  formChoice(saveLast) {
    let choice = this.data.editChoice
    if (!saveLast) {
      this.data.editChoice.pop()
      choice = this.data.editChoice
    }
    gxl.addData('choice', {
      title: this.data.currentTitle,
      choice: choice
    }, res => {
      let pageNum = getCurrentPages().length
      if (pageNum > 1) {
        this.back()
      } else {
        wx.reLaunch({ url: '../index/index' })
      }
    }, err => {
      wx.showToast({ title: '添加失败', icon: 'none', duration: 1500, mask: true })
    })
  },
  onLoad: function (options) {
    gxl.getStorage('openid', res => {
      if (res) {
        this.setData({ isLogin: true, openId: res })
      } else {
        this.setData({ isLogin: false })
      }
    }, err => {
      this.setData({ isLogin: false })
    })
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