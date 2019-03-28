import md5 from 'js-md5';
export default {
    data() {
        return {
            nicknamesearch:'',
            itcodesearch:'',
            userColumns: [
                {
                    title: '昵称',
                    key: 'nickname'
                },
                {
                    title: 'Itcode',
                    key: 'code'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row.id)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            userData: [],
            modal1: false,
            title: '',
            userid: '',
            nickname: '',
            code: '',
            password: '',
            ruleValidate: {
                nickname: [{ required: true, message: ' ', trigger: 'focus' }],
                code: [{ required: true, message: ' ', trigger: 'focus' }],
                password: [{ required: true, message: ' ', trigger: 'focus' }],
            },
            isDelete:false,//删除模态框
            value:null,
            total:0,
            pageNum:1,
            loading:false,
            pageSize:10,         
            pagesizeOP:[10]
        }
    },
    methods: {
        nicknameinput(e){
            // /^[A-Za-z0-9\u4e00-\u9fa5]+$/
            this.nickname = e.replace(/[^A-Za-z0-9\u4e00-\u9fa5]+/, '')
        },
        checkinput(e){
            this.code = e.replace(/[^A-Za-z0-9]+/, '')
        },
        userdataLoad(page) {
            var url = this.GLOBAL.API_USER_LIST
            var params={
                pageNum:page,
                pageSize:this.pageSize,
                nickname:this.nicknamesearch,
                code:this.itcodesearch
            }
            this.$post(url,params).then(res => {
                if (res.status == 200) {
                    this.userData = res.data.records
                    this.total=res.data.count
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        changePage(value){
            // debugger
            this.pageNum=value
            this.userdataLoad(value)
        },
        add() {
            this.userid = ''
            this.nickname = ''
            this.code = ''
            this.password = ''
            this.title = "新建用户"
            this.modal1 = true
        },
        save() {           
            if (this.nickname && this.code && this.password) {
                var md5_password = md5(this.password);
                var params = {
                    nickname: this.nickname,
                    code: this.code,
                    password: md5_password
                }
                if (this.userid) {
                    var url = this.GLOBAL.API_USER_UPDATE
                    params.id = this.userid
                } else {
                    var url = this.GLOBAL.API_USER_ADD
                }
                this.loading=true
                this.$post(url, params).then(res => {
                    if (res.status == 200) {
                        this.$Message.success("成功")
                        this.modal1 = false
                        this.loading=false
                        this.pageNum=1
                        this.userdataLoad(1)
                    } else {
                        this.$Message.error(res.data.message)
                        this.loading=false
                    }
                }).catch(() => {
                    this.loading=false
                })
            } else {
                this.$Message.error("请把信息填写完整")
            }
        },
        edit(id) {
            this.userid = id
            this.password = ''
            this.userData.forEach(item => {
                if (this.userid == item.id) {
                    this.nickname = item.nickname
                    this.code = item.code
                    // this.password=item.password
                }
            })
            this.title = "编辑"
            this.modal1 = true
        },
        remove(value) {
            this.isDelete=true        
            this.value=value 
        },
        deleteFn(){
            var params = {
                id: this.value.id,
                code: this.value.code
            }
            var url = this.GLOBAL.API_USER_DELETE
            this.$post(url, params).then(res => {
                if (res.status == 200) {
                    this.$Message.success("删除成功")
                    this.isDelete=false
                    this.pageNum=1
                    this.userdataLoad(1)
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        }
    },
    mounted() {
        this.userdataLoad(1)
    }

}