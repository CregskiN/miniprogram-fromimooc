// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js';

import {
  BookModel
} from '../../models/book.js';

import {
  paginationBev
} from '../../components/book/behaviors/paginationBev.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [], //存储书信息
    searching: false,
    q: '', //记录搜索时输入的内容 || 点击的tag的内容
    loading: false,
    loadingCenter: false,
  },

  attached() {
    // const historyWords = keywordModel.getHistory();
    // const hotWords = keywordModel.getHot();

    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },


  /**
   * 组件的方法列表
   */
  methods: {

    loadMore() {
      if (!this.data.q) {
        return;
      }
      if (this.isLocked()) {  //判断是否上锁
        return;
      }

      console.log("Page的触底事件触发了  ！");
      if (this.hasMore()) { //  判断如果还有书籍
        this.locked(); //上锁
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books);
            /*  const tempArray = this.data.dataArray.concat(res.books);
             this.setData({
               dataArray: tempArray,
             }) */
          }, () => {
            this.unlocked(); //解锁
          }) //then第二个参数 为失败执行
      }

    },



    onCancel(event) {
      this.triggerEvent('cancel', {}, {});
      this.initialize();
    },


    onDelete(event) {
      this._closeResult();
      this.initialize();
    },


    onConfirm(event) {
      console.log(" search中的输入事件触发了！ ");
      this._showResult(); //开启搜索详情界面
      this._showLoadingCenter();
      // this.initialize(); //清除上一次进入界面 存储的书籍
      //输入的内容存储到event.detail.value中 //tag点击事件传递text 存在event.detail.text
      const q = event.detail.value || event.detail.text;
      this.setData({
        q
      });
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(q);
        this._hideLoadingCenter();
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }





  }
})