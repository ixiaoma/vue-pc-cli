import {mapActions,mapGetters} from 'vuex'
export default {
    name:'menu-edit',
    data(){
        return{
            editModal:false,//编辑是否显示
            userSelectNode:{},//用户选择节点
            addLoading:false
        }
    },
    computed:{
        ...mapGetters(['nodeData','roleArr'])
    },
    methods:{
        ...mapActions(['postEditMenusData','putMenusData']),
        //是否显示编辑的modal框
        showEditModal(){
            if(this.nodeData.id != 'xtcd'){//如果id不等于系统菜单（xtcd）
                this.editModal = true;
            }else{
                this.$Message.error({content:'根节点不可编辑',duration:5});
            }
        },  
        //提交
        submit(){
            var params = JSON.parse(JSON.stringify(this.nodeData));
            params.roleIds.forEach(ele=>{
                this.roleArr.forEach(e=>{
                    if(ele == e.id){
                        params.roles.push(e)
                    }
                })
            })
            if(params.name){
                if(params.url){
                    if(params.roles.length){
                        this.addLoading = true;
                        delete params.roleName;
                        delete params.roleIds;
                        delete params.parentId;
                        var params = {
                            url:this.GLOBAL.API_ROLE_MENU_UPDATE,
                            id:this.userSelectNode.id,
                            argument:params,
                            callback:()=>{
                                this.$Message.success('提交成功');
                                this.editModal = false;
                                this.$emit('getTreeData');
                                this.addLoading = false;
                            },
                            errorFn:(msg)=>{
                                this.$Message.error(msg);
                                this.addLoading = false;
                            }
                        }
                        this.postEditMenusData({params})
                    }else{
                        this.$Message.error({content:'请选择角色',duration:5})
                    }
                }else{
                    this.$Message.error({content:'请填写Url',duration:5})
                }
            }else{
                this.$Message.error({content:'请填写名称',duration:5})
            }
        },
        //取消
        cancel(){
            this.editModal = false;
        }
    },
}