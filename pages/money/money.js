// pages/money/money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const ctx = wx.createCanvasContext('canvas');
    
    // ctx.moveTo(5,5);
    // ctx.lineTo(50,50)
    let x = 5
    let t = setInterval(()=>{
      if(x > 100){
        clearInterval(t)
      }
      ctx.beginPath();
      ctx.setStrokeStyle('#000000');
      ctx.moveTo(x, 5);
      x++;
      ctx.lineTo(x, 5)
      ctx.closePath();
      ctx.stroke();
      ctx.draw(true)
    }, 100/6)
    
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