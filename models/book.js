import {
    HTTP
} from '../util/http-p.js'

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }

    search(start, q) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                q: q,
                start: start
            }
        })
    }

    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }

    getDetail(bookid) {
        return this.request({ //获取当前图书的 详情界面
            url: `book/${bookid}/detail`
        })
    }

    getLikeStatus(bookid) { //获取当前图书 详情界面下的点赞状态
        return this.request({
            url: `book/${bookid}/favor`
        })
    }

    getComment(bookid) { //获取当前图书 详情界面下的短评信息
        return this.request({
            url: `book/${bookid}/short_comment`
        })
    }

    postComment(bookid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bookid,
                content: comment
            }
        })
    }










}



export {
    BookModel
}