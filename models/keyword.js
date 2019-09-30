import {
    HTTP
} from '../util/http-p.js'


class KeywordModel extends HTTP {
    key = 'q';
    maxlength = 10;

    //读取缓存中的历史记录
    getHistory() {
        const words = wx.getStorageSync(this.key);
        if (!words) {
            return [];
        }
        console.log("keyword.js中getHistory触发了！");
        return words;

    }

    //获取热门搜索 api
    getHot() {
        return this.request({
            url:'book/hot_keyword'
        })
    }

    //把关键字写入到缓存
    addToHistory(keyword) {
        let words = this.getHistory(); //提取(缓存-数组)中的历史记录
        const has = words.includes(keyword); //ES6写法 判断(缓存-数组)中是否有keyword

        if (!has) {
            const length = words.length;
            if (length >= this.maxlength) {
                words.pop() // 队列 出队
            } //判断(缓存-数组)长度是否超过maxlength 若超过，删除末尾，添加addFirst
            words.unshift(keyword); //若缓存的历史记录中没有该条 则 添加到数组首位置
            wx.setStorageSync(this.key, words);
            console.log("keyword.js中addToHistory函数触发了！")
        }

    }

    


}


export {
    KeywordModel
}