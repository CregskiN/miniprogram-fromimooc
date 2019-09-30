const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null, //服务器总书本数
        noneResult: false,
    },

    methods: {
        //懒加载 请求
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })

        },

        //得到请求的起始长度
        getCurrentStart() {
            return this.data.dataArray.length;
        },

        //记录设置total到本地
        setTotal(total) {
            this.data.total = total;
            if (total == 0) {
                this.setData({
                    noneResult: true
                })
            }
        },


        //判断 是否还有更多数据需要加载
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false;
            } else {
                return true;
            }
        },

        //重置搜索结果
        initialize() {
            this.setData({
                dataArray: [],
                noneResult: false,
                loading:false
            })
            // this.data.dataArray = [];
            this.data.total = null; //total对搜索结果页初始化 没有影响
        },

        //判断 此时是否上锁
        isLocked() {
            return this.data.loading ? true : false;
        },
        locked() {  //上锁
            this.setData({
                loading: true
            })
        },
        unlocked() {    //解锁
            this.setData({
                loading: false
            })
        },




    }
})



export {
    paginationBev
}