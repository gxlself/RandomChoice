wx.cloud.init();
const db = wx.cloud.database();
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function cloudReq(name, callback, fail){
  wx.cloud.callFunction({
    name: name,
    success: res => {
      callback(res)
    },
    fail: err => {
      wx.showToast({
        title: '请求失败',
        success: res => {
          typeof fail == 'function' && fail(err)
        }
      })
    }
  })
}
function addData(collectName, data, callback, fail){
  db.collection(collectName).add({
    data: data,
    success: res => {
      callback(res)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function getOneData(collectName, id, callback, fail){
  db.collection(collectName).doc(id).get({
    success: (res) => {
      callback(res)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function getMoreData(collectName, where, callback, fail){
  db.collection(collectName)
    .where(where)
    .get({
      success(res) {
        callback(res)
      },
      fail: err => {
        typeof fail == 'function' && fail(err)
      }
    })
}
function getCollectionData(collectName, callback, fail){
  db.collection(collectName)
    .get({
      success(res) {
        callback(res)
      },
      fail: err => {
        typeof fail == 'function' && fail(err)
      }
    })
}
function updateData(collectName, id, data, callback, fail){
  db.collection(collectName).doc(id).update({
    data: data,
    success(res) {
      callback(res)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function deleteOneData(collectName, id, callback, fail){
  db.collection(collectName).doc(id).remove({
    success(res) {
      callback(res.data)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function deleteMoreData(collectName, where, callback, fail) {
  db.collection(collectName).where(where).remove({
    success(res) {
      callback(res.data)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function uploadToCloud(cloudPath, filePath, callback, fail){
  wx.cloud.uploadFile({
    cloudPath: cloudPath,
    filePath: filePath,
    success: res => {
      callback(res)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function downloadClound(fileID, callback, fail){
  wx.cloud.downloadFile({
    fileID: fileID,
    success: res => {
      callback(res.tempFilePath)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function deleteCloundFile(fileList, callback, fail){
  wx.cloud.deleteFile({
    fileList: fileList,
    success: res => {
      callback(res.fileList)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function getCloudUrl(fileList, callback, fail){
  wx.cloud.getTempFileURL({
    fileList: fileList,
    success: res => {
      callback(res.fileList)
    },
    fail: err => {
      typeof fail == 'function' && fail(err)
    }
  })
}
function saveUserInfo(user, callback){
  cloudReq('login', res => {
    let { appid, event, openid, unionid } = res.result;
    setStorage('openid', openid)
    setStorage('avatarUrl', user.userInfo.avatarUrl)
    setStorage('nickName', user.userInfo.nickName)
    let data = {
      openid: openid,
      unionid: unionid,
      avatarUrl: user.userInfo.avatarUrl,
      city: user.userInfo.city,
      country: user.userInfo.country,
      gender: user.userInfo.gender,
      language: user.userInfo.language,
      nickName: user.userInfo.nickName,
      province: user.userInfo.province,
      encryptedData: user.encryptedData,
      iv: user.iv,
      signature: user.signature,
      timestamp: new Date().getTime()
    }
    getMoreData('user', {openid: openid},
      res => {
        let _id = res.data[0]._id;
        setStorage('userId', _id)
        if (res.data.length == 0){
          addData('user', data, callback)
        }
        callback(res)
      }
    )
  })
}
function setStorage(key, data){
  wx.setStorageSync(key, data)
}
function getStorage(key, callback, fail){
  wx.getStorage({
    key: key,
    success(res) {
      callback(res.data)
    },
    fail(err){
      typeof fail == 'function' && fail(err)
    }
  })
}
function checkLogin(){
  let userId = wx.getStorageSync('userId');
  if (userId == null || userId == undefined || userId == '<Undefined>' || userId == '') {
    return false;
  }else{
    return true;
  }
}
module.exports = {
  formatTime: formatTime,
  cloudReq: cloudReq,
  addData: addData,
  getOneData: getOneData,
  getMoreData: getMoreData,
  getCollectionData: getCollectionData,
  updateData: updateData,
  deleteOneData: deleteOneData,
  deleteMoreData: deleteMoreData,
  uploadToCloud: uploadToCloud,
  downloadClound: downloadClound,
  deleteCloundFile: deleteCloundFile,
  getCloudUrl: getCloudUrl,
  saveUserInfo: saveUserInfo,
  setStorage: setStorage,
  getStorage: getStorage,
  checkLogin: checkLogin
}
