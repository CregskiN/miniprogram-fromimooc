// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //图片 图书标题 虚幻数量
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
    const bookid = this.properties.book.id;
      wx.navigateTo({
        // url:'/pages/book-detail/index?bookid='
        url:`/pages/book-detail/index?bookid=${bookid}`  //ES6写法
      })
    }
  }
})
