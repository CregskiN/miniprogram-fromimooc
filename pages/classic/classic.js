// pages/classic/classic.js

import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel();
let likeModel = new LikeModel();


//import {HTTP} from '../../util/http.js'  //导入request封装的HTTP类
//let http = new HTTP(); //实例化HTTP类


Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLast((res) => {
      console.log(res);
      //this._getLikeStatus(res.id ,res.type);  // 请求 获取当前Like组件信息 此处多余 res.id .type 有
      this.setData({
        //ES6 扩展运算符
        //...res
        classicData: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
      console.log(this.data);
    })

  },

  onLike: function (event) {
    console.log(event);
    likeModel.like(event.detail.behavior, //组件内triggerEvent设定的behaior >> post服务器
      this.data.classicData.id,
      this.data.classicData.type)
  },

  onNext: function (event) {
    this._updateClassicData('next');
  },

  onPrevious: function (event) {
    this._updateClassicData('previous');
  },

  _updateClassicData: function (nextOrPrevious) {
    // let index = this.data.classicData.index;
    const index = this.data.classicData.index;

    classicModel.getClassic(index, nextOrPrevious, (res) => {
      console.log(res);
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function (artID, category) { //  从服务器获得当前点赞情况
    likeModel.getClassicLikeStatus(artID, category,
      (res) => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
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