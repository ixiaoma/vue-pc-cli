export default {
    data () {
        return {
            tableData: [],
            tableColumns: [
                {
                    title: 'Name',
                    key: 'name'
                }
            ],
            total:100,
            currentPage:1
        }
    },
    methods: {
        changePage (pagesize) {//切换页码

        },
        selectRow(selection,row){//多选模式
            // selection：已选项数据
            // row：刚选择的项数据
        }
    }
}