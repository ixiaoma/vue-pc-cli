export default {
    name: 'system-menus',
    data(){
        return {
            flag:'',
            detailModal:false,
            selNodeData:{},//用户选择的节点信息
            nodeInfo:{},
            buttonProps: {
                type: 'ghost',
                size: 'small',
            },
            isClass:-1,//选中节点的标识
            treeStructure:[],
            roleArr:[],
            nodeData: {
                name: '',//菜单的名称
                isEnable: true,//是否启用
                sortOrder: 1,//排序
                code:'',
                url: '',//url
                type: 1,//新增节点的类型
                roles:[],
                icon:'',//图标
            },
            roles: [],//选择的角色
            addModal: false,//新建模态窗
            selNodeData:{},//用户选择的节点
            modelTitle:'',
            parentTitle:'',
            objectTypeList:[],//所有对象对应的objectType
            objectTypeFlag:'',//标记当前节点的objectType
            rule:{
                name: [{ required: true, trigger: 'focus' }],
            },
            deleteModel:false
        }
    },
    methods:{
        deleteMenus(){//删除菜单
            if(this.selNodeData.title == "暂无子节点"){
                this.$Message.warning('此节点不支持删除')
            }else{
                this.deleteModel = true
            }
        },
        deleConfirm(){
            this.$post(this.GLOBAL.API_ROLE_MENU_DELETE,{id:this.selNodeData.id}).then(res=>{
                this.getFirstNodeData()
                this.detailModal = false
                this.$store.commit('updateMenulist');
                this.deleteModel = false
            })
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                }
            }, [
                h('span', [
                    h('span', {
                        style:{
                            cursor:'pointer'
                        },
                        on:{
                            click:()=>{
                                this.selNodeData = node.node
                                if(node.node.id){
                                    let url = this.GLOBAL.API_ROLE_MENU_DETAIL;
                                    this.isClass = node.nodeKey;
                                    this.$post(url,{id:node.node.id}).then(res=>{ 
                                            let arr = res.data.roles;
                                            let allRoleArr = this.roleArr
                                            let roleNameArr = [];
                                            let roleArr = []
                                            for(let i = 0;i < arr.length;i ++){
                                                for(let j = 0;j < allRoleArr.length; j++){
                                                    if(arr[i].code == allRoleArr[j].code){
                                                        roleNameArr.push(allRoleArr[j].name)
                                                        roleArr.push(allRoleArr[j].code)
                                                    }
                                                }
                                            }
                                            res.data.roles = roleArr
                                            this.roleName = roleNameArr.join(',')
                                            this.nodeData = res.data
                                            this.detailModal = true
                                    })
                                }else{
                                    this.detailModal = false    
                                }
                            }
                        },
                        class:{
                            foo:root[node.nodeKey].nodeKey == this.isClass?true:false
                        }
                    },data.title)
                ]),
            ]);
        },
        createNode(num){//新增编辑节点
            if(num){
                if (!this.selNodeData.leafBool) {
                    this.modelTitle = '新建节点'
                    this.roles = [];
                    this.nodeData = {
                      name: '',//菜单的名称
                      isEnable: true,//是否启用
                      code:'',
                      sortOrder: 1,//排序
                      url: '',//url
                      type: 1,//新增节点的类型
                      roles:[],
                      icon:''
                    };
                    this.parentTitle = this.selNodeData.title
                    this.addModal = true;
                  } else {
                    this.$Message.warning('此节点不可再添加子节点')
                  }
            }else{
                this.modelTitle = '编辑节点'
                this.parentTitle = this.selNodeData.title
                this.addModal = true;
            }
        },
        submit(){//新增编辑节点保存
            let saveObj = JSON.parse(JSON.stringify(this.nodeData))
            if(!saveObj.name){
                this.$Message.warning('请填写节点名称')
                return false
            }
            if(saveObj.type == 1){
                if(!saveObj.url){
                    this.$Message.warning('请填写routerName')
                    return false
                }else{
                    delete saveObj.code;
                }
            }else{
                if(!saveObj.code){
                    this.$Message.warning('请填写按钮的code')
                    return false
                }else{
                    delete saveObj.url;
                } 
            }
            if(saveObj.roles.length){
                let rolesaveArr = []
                this.roleArr.forEach(ele=>{
                    saveObj.roles.forEach(item=>{
                        if(ele.code == item){
                            rolesaveArr.push(ele)
                        }
                    })
                })
                saveObj.roles = rolesaveArr
            }
            let url = null
            if(this.modelTitle == '编辑节点'){
                url = this.GLOBAL.API_ROLE_MENU_UPDATE
                delete saveObj.parentId
            }else{
                url = this.GLOBAL.API_ROLE_MENU_INSERT
                saveObj.parentId = this.selNodeData.id
            }
            this.$post(url,saveObj).then(res=>{
                    this.addModal = false;
                    this.getFirstNodeData()
                    this.detailModal = false
                    this.$store.commit('updateMenulist');
            })
        },
        getFirstNodeData(id) {//渲染树第一层结构
            let url = this.GLOBAL.API_MENU_FINDALL;
            this.$post(url).then(res=>{ //渲染树第一层结构
                    res.data.forEach(ele=>{
                        if(ele.children){
                            ele.children = [{title:'暂无子节点'}];
                        }
                    })
                    let str = JSON.stringify(res.data)
                    str = str.replace(/subordinates/g, "children");
                    str = str.replace(/name/g, "title");
                    this.treeStructure = [{title: '系统菜单',expand:true,children:JSON.parse(str)}]
            })
        },
        getRoleArr() {//获取角色下拉框的值
            let url = this.GLOBAL.API_ROLE_LIST;
            this.$post(url).then(res=>{
                this.roleArr = res.data.records
            })
        }
    },
    created(){
        this.getFirstNodeData();
        this.getRoleArr();
    }
}