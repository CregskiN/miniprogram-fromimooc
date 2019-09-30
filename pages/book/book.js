// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //纯粹callback 回调地狱  函数失去 return
    //promise 优势  代码风格  对于多个异步等待合并不需要callback
    // async await ES2017提出的 处理异步的方案 视频时期无法使用
    //一次调用 多次调用服务器API 链式调用多次API1，2，3
    books:[],
    searching:false,
    more:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    bookModel.getHotList()
    .then(res => {  
      console.log(res);
      this.setData({
        books:res
      })
    }
    )

    /* const hotList = bookModel.getHotList();
    hotList.then(res => { //链式 API1
        console.log(res);

        bookModel.getMyBookCount()
        .then(res => { //链式 API2
          console.log(res);

          bookModel.getMyBookCount()
          .then = (res => { //链式 API3
            console.log(res);
          })
        })
      }); */


    // Promise  是严格意义的对象
    // 对象 保存状态  函数的闭包函数也可以保存状态
    // step1. 定义 ， Promise 的参数是函数
    // step2. 将异步代码写在传参函数中
    //step3. Promise 有三种状态 pending异步操作进行中(默认状态)  fulfilled异步操作执行成功(靠resolve转换) rejected(靠reject转换)异步操作执行失败
    //step4. 修改完毕后promise状态凝固
    //Promise 精髓在于 用对象保留了状态 回调.then 在需要使用回调结果时 使用
    /* const promise = new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: res => resolve(res),
        fail: error => reject(error)
      })
    });

    promise.then(
      (res) => console.log(res),
      (error) => console.log(error)
    ); */

  },

  onSearching(event){
    this.setData({
      searching:true
    })
  },
  
  onCancel(event){
    this.setData({
      searching:false
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
    this.setData({
      more:random(16)
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})