// components/header-bar/header-bar.js
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '随心所选-帮你选'
    },
    icon: {
      type: String,
      value: 'back'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
    STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
    BODY_HEIGHT: wx.WIN_HEIGHT - wx.STATUS_BAR_HEIGHT - wx.DEFAULT_HEADER_HEIGHT,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      this.triggerEvent('back')
    }
  }
})
