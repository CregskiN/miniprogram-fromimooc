// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean //布尔值默认为false
    },
    count: {
      type: Number //数字默认值为0
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: '../images/like.png',
    noSrc: '../images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {


    onLike: function (event) { //onLike是对Like组件 点击事件的监听函数
      //  自定义事件

      if (this.properties.readOnly) {
        console.log("like功能已上锁,请改变v-preview标签read-only属性值为true")
        return
      };

      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count - 1 : count + 1; //点击后，变换生效前!
      this.setData({ //重设以变换
        count: count,
        like: !like
      })

      //  激活
      //  定义behavior = properties.like 描述点击后 Like的状态
      //  'like' 'cancle' 为API 中http url内容
      let behavior = this.properties.like ? 'like' : 'calcle';
      this.triggerEvent('like', {
        behavior: behavior // 将组件内的属性添加到 界面data.detail
      }, {})
    },

   


  }
})