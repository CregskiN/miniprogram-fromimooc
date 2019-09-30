// pages/book-detail/index.js
import {
  BookModel
} from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js';

const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null, //object 数据加载，引用null
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    const bookid = options.bookid;
    console.log(bookid);
    const detail = bookModel.getDetail(bookid);
    const comments = bookModel.getComment(bookid);
    const likeStatus = bookModel.getLikeStatus(bookid);

    //.all 等待所有子promise返回一个新的Promise实例 .race竞争，携带一个完成写代竞争成功的结果 马上回调
    Promise.all([detail, comments, likeStatus]) //将promise示例合为一个
      .then(res => { //仅三个都resolve 才执行
        console.log(res);
        this.setData({
          book: res[0],
          comments:res[1],
          likeStatus:res[2].like_status,
          likeCount:res[2].fav_nums
        })
        wx.hideLoading();


      })


    /* detail.then(res => {
      console.log(res);
      this.setData({
        book: res
      })
    })

    comments.then(res => {
      console.log(res);
      this.setData({
        comments: res
      })
    })

    likeStatus.then(res => {
      console.log(res);
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })

    wx.hideloading(); */
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel, this.data.book.id, 400);

  },

  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value; // event.detail.text 为获取标签组件内容 //event.detail.value为用户输入内容

    if (!comment) {
      return;
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return;
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '添加成功',
          icon: 'none'
        });

        this.data.comments.comments.unshift({
          content: comment,
          nums: 1
        });

        this.setData({
          comments: this.data.comments,
          posting: false
        });
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