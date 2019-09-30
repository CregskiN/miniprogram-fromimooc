// pages/my/my.js
import {
  BookModel
} from '../../models/book.js'

import {
  ClassicModel
} from '../../models/classic.js'

const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },

  getMyBookCount(event) {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },



  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  userAuthorized() {
    wx.getSetting({ //1.获取当前用户授权状态
      success: data => {
        // console.log("getsetting返回的数据为");
        // console.log(data);
        if (data.authSetting['scope.userInfo']) { //2.查看用户授权结果
          wx.getUserInfo({ //3.获取授权后用户信息的API
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log("用户还未授权")
        }
      }
    })
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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