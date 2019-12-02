<template>
  <div class="switchUser" style="display:inline-block">
    <span v-if="switchUser && !toggerusername" @click="toggerUserload" style="cursor:pointer;font-weight:600">切换用户</span>
    <span v-if="toggerusername" @click="toggerUserover" style="cursor:pointer;font-weight:600">退出{{toggerusername}}</span>
    <!--切换用户模态框-->
    <Modal
        v-model="tableModeluser"
        width="70%">
        <Row style="width:90%;margin-bottom:10px">
            <Col span="6">
                <Input clearable v-model="searchValueuser" icon="ios-search" placeholder="请输入查询条件" class="inp" @on-click="clickSearchuser"  @keyup.enter.native ="clickSearchuser"></Input>
            </Col>
        </Row>
        <div>
            <Table size="small" border ref="selection" :columns="iviewColumn" :data="iviewData" @on-select="selectRow"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page size="small" :total="dataTotal" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <div slot="footer">
        </div>
    </Modal>
  </div>
</template>
<script>
    export default {
        name:'switchUser',
        data(){
            return{
                switchUser:false,
                isadmin:0,//是否为管理员
                tableModeluser:false,//模态框
                searchValueuser:'',//用户表格查询条件
                iviewColumn:[
                        {
                            type: 'selection',
                            align: 'center',
                            width: 60
                        },
                        {
                            title: "姓名",
                            align: 'center',
                            key: "realName",
                        },
                        {
                            title: "登录名(昵称)",
                            align: 'center',
                            key: "nickname",
                        },
                        {
                            title: "主属部门",
                            align: 'center',
                            key: "deptName",
                        }
                    ],
                iviewData:[],
                dataTotal:0,
                toggerusername:null,
            }
        },
        methods:{
            toggerUserover(){//退出
                this.toggerusername = null
                this.$store.commit('clearAllTags');
                this.$router.push({
                    name: 'home_index'
                });
                let oldtoken=sessionStorage.getItem('old_cookieaccess_token')
                sessionStorage.setItem('cookieaccess_token',oldtoken)
                sessionStorage.removeItem('old_cookieaccess_token')
                sessionStorage.removeItem('toggerusername')
                // this.$parent.iframR();
                // this.$store.commit('updateMenulist');
                window.location.reload();
            },
            selectRow(data){//选择切换 这里记住还要清空标签，更新菜单，更新电话空间
                this.tableModeluser = false
                this.$post(this.GLOBAL.API_LOGIN_SWITCH,{username:data[0].nickname}).then(res => {   
                    // if(res.data.retCode == 200){
                        if(res.data.access_token){
                            this.toggerusername = data[0].nickname
                            this.$store.commit('clearAllTags');
                            this.$router.push({
                                name: 'home_index'
                            });
                            sessionStorage.setItem('toggerusername',data[0].nickname)
                            let oldtoken=sessionStorage.getItem('cookieaccess_token')
                            sessionStorage.setItem('old_cookieaccess_token',oldtoken)
                            sessionStorage.setItem('cookieaccess_token',res.data.access_token)
                            window.location.reload();
                        }else{
                            this.$Message.warning("切换失败！")
                        }                 
                    // }
                })
            },
            clickSearchuser(){//点击搜索
                this.getIviewTableData(1)
            },
            changePage(page){//分页
                this.getIviewTableData(page)
            },
            toggerUserload(){//切换用户
                this.getIviewTableData(1)
                this.tableModeluser = true
            },
            getIviewTableData(page){//获取数据
                let params ={
                    pageSize:10,
                    pageNumber:page?page:1,
                    nickname:this.searchValueuser
                    }
                this.$get(this.GLOBAL.API_USER_SWICTH_LIST,params).then(res=>{
                    this.iviewData = res.data.data.records
                    this.dataTotal = res.data.data.count
                })
            }
        },
        mounted() {
            // let switchUser=setInterval(()=>{
            //     if(JSON.parse(sessionStorage.getItem('switchUser'))){
            //         this.switchUser = JSON.parse(sessionStorage.getItem('switchUser'))
            //         clearInterval(switchUser)
            //     }
            // },500)
            this.switchUser = JSON.parse(sessionStorage.getItem('switchUser'))
            this.toggerusername=sessionStorage.getItem('toggerusername')           
        }
    }
</script>
