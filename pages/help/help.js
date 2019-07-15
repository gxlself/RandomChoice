const gxl = require('../../utils/util.js');
const app = getApp();
let fromPersonOpenId = void 0;
let fromPersonId = void 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
    STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
    BODY_HEIGHT: wx.WIN_HEIGHT - wx.STATUS_BAR_HEIGHT - wx.DEFAULT_HEADER_HEIGHT,
    fromPerson: {},                               // 分享人信息
    fromPersonChoice: {},                         // 分享人的犹豫项
    isLogin: true,                                // 默认以为已经登录
    isOwner: false,                               // 默认以为他不是本人
    currentChoose: {},                            // 非本人点击选中
    ishelpChoose: false,                          // 默认以为没有帮选
    moreHelpChoose: [],                           // 更多帮选结果
    isHelpClick: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    let storageOpenid = wx.getStorageSync('openid')
    fromPersonOpenId = options.from
    fromPersonId = options.id
    if (fromPersonOpenId && fromPersonId) {
      this.getSharePeople(fromPersonOpenId)
      this.getSharePeopleChoice(fromPersonId, storageOpenid)
    } else {
      this.back()
    }
    // 是自己那就不显示帮选按钮
    if (storageOpenid == fromPersonOpenId) {
      this.setData({isOwner: true})
    } else {
      this.setData({isOwner: false})
    }
  }, 
  // 获取分享人的信息
  getSharePeople(openId) {
    // 根据openId获取对应的分享人
    gxl.getMoreData('user', {_openid: openId}, reposnse => {
      // 讲道理分享出来 肯定是用户信息已经存放  但是夜路走多了还是需要谨慎
      if (reposnse.data.length > 0) {
        this.setData({fromPerson: reposnse.data[0]})
        wx.hideLoading()
      } else {
        wx.hideLoading()
        this.back()
      }
    }, error => {
      wx.hideLoading()
      this.back()
    })
  },
  // 获取分享人分享犹豫项
  getSharePeopleChoice(id, currentOpenId) {
    // 根据id获取对应的分享人犹豫项
    gxl.getOneData('choice', id, reposnse => {
      reposnse.data.choice.map(item => {
        if (item.content == reposnse.data.choose.content && (fromPersonOpenId == currentOpenId || fromPersonOpenId == app.globalData.openId)) {
          item.owner = true
        }
        item.choose = false
        return item
      })
      this.setData({fromPersonChoice: reposnse.data})
      // 获取更多人给出的结果
      gxl.getMoreData('help', {chooseId: id}, reposnse => {
        reposnse.data = reposnse.data.map(item => {
          item.date = gxl.dateDiff(item.timestamp)
          return item
        })
        this.setData({moreHelpChoose: reposnse.data})
        let storageOpenid = wx.getStorageSync('openid')
        if (storageOpenid || app.globalData.openId) {
          reposnse.data.forEach(item => {
            if (item.helperOpenId == storageOpenid || item.helperOpenId == app.globalData.openId) {
              this.setData({ishelpChoose: true})
              this.filterChooseItem(item.chooseChoice)
            }
          })
        }
      })
    }, err => {
      wx.hideLoading()
      this.back()
    })
  },
  back() {
    wx.reLaunch({url: '../index/index'})
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: '随心所选-帮你选一个你犹豫的事情',
      path: '/pages/index/index',
      imageUrl: 'https://gxlself.com/images/help-choose.png'
    }
  },
  // 帮选
  helpChoose() {
    let storageOpenid = wx.getStorageSync('openid')
    if (!storageOpenid && !app.globalData.openId) {
      this.setData({isLogin: false})
      return
    }
    if (this.data.currentChoose.content == undefined) {
      wx.showToast({title: '请选一项作为你的决定', icon: 'none'})
      return
    }
    if (this.data.isHelpClick) { return }
    this.data.isHelpClick = true
    // 获取更多人给出的结果
    gxl.getMoreData('help', {chooseId: fromPersonId, helperOpenId: storageOpenid || app.globalData.openId}, reposnse => {
      if (reposnse.data.length > 0) {
        this.setData({ishelpChoose: true})
      } else {
        let choose = {
          helperOpenId: storageOpenid || app.globalData.openId,
          chooseId: fromPersonId,
          sharerOpenId: fromPersonOpenId,
          chooseChoice: this.data.currentChoose.content,
          avatarUrl: wx.getStorageSync('avatarUrl'),
          nickName: wx.getStorageSync('nickName'),
          timestamp: new Date().getTime()
        }
        gxl.addData('help', choose, reposnse => {
          choose.date = gxl.dateDiff(choose.timestamp)
          this.data.moreHelpChoose.push(choose)
          this.setData({ishelpChoose: true, moreHelpChoose: this.data.moreHelpChoose}, () => {
            wx.showToast({title: '帮选成功', icon: 'success'})
          })
        }, error => {
          wx.showToast({title: '帮选失败，请稍候再试', icon: 'fail'})
        })
      }
    }, error => {
      wx.showToast({title: '帮选失败，请稍候再试', icon: 'fail'})
    })
  },
  // 进行筛选并给定状态
  filterChooseItem(chooseChoice) {
    this.data.fromPersonChoice.choice.forEach((item, index) => {
      if (item.content == chooseChoice) {
        item.choose = true
      } else {
        item.choose = false
      }
    })
    this.setData({fromPersonChoice: this.data.fromPersonChoice})
  },
  // 点击选项
  helpChooseItem(e) {
    // 是自己那就不显示帮选按钮
    if (this.data.isOwner || this.data.ishelpChoose) {
      return
    }
    let chooseIndex = e.currentTarget.dataset.index
    this.data.fromPersonChoice.choice.forEach((item, index) => {
      if (chooseIndex == index) {
        item.choose = true
        this.data.currentChoose = item
      } else {
        item.choose = false
      }
    })
    this.setData({fromPersonChoice: this.data.fromPersonChoice, currentChoose: this.data.currentChoose})
  },
  // 获取全部该项选择的数据
  getAllChoiceList(id, callback) {
    gxl.getOneData('choice', id, reposnse => {
      reposnse.data.choice.map(item => {
        if (item.content == reposnse.data.choose.content) {
          item.owner = true
        }
        item.choose = false
        return item
      })
      this.setData({fromPersonChoice: reposnse.data})
      callback()
    })
  },
  // 用户开始登录
  bindGetUserInfo: function (e) {
    gxl.saveUserInfo(e.detail, (openId) => {
      app.globalData.openId = openId
      if (openId == fromPersonOpenId) {
        this.setData({ isLogin: true, isOwner: true })
        this.getAllChoiceList(fromPersonId, () => {})
      } else {
        this.setData({ isLogin: true, isOwner: false })
      }
      this.data.moreHelpChoose.forEach(item => {
        if (item.helperOpenId == openId) {
          this.setData({ishelpChoose: true})
          this.filterChooseItem(item.chooseChoice)
        }
      })
    })
  },
})