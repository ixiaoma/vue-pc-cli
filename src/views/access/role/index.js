export default {
    name: 'role',
    data () {
        return {
            currentTab:'name1',
            currentCode:'',
            currentId:'',
            name:'',
            remark:'',
            titleName:'',
            modelState:false,
            delmodal:false,
            editRule:{
                name:[{required: true, message: ' ', trigger: 'blur'}]                   
            },
            roleData:[],
            roleName:'',
            roleDescribe:'',
            editObj:{},
            userData:[],
            userSaveData:[],
            fieldName:'',
            powerData:[],
            reportState:false,
            deletecode:'',
            fieldEditData:[],
            enableAll:false,
            tableColumns: [
                {
                    title: '字段名称',
                    key: 'fieldAlias',
                    align: 'center'
                },
                {
                    title: '字段类型',
                    key: 'operateTypeText',
                    align: 'center'
                },
                {
                    align: 'center',
                    key: 'listDisplay',
                    renderHeader: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value: this.enableAll
                            },
                            nativeOn: {
                                click: () => {
                                    this.enableAll = !this.enableAll
                                    this.fieldEditData.forEach(item => {
                                        if (this.enableAll) {
                                            item.enabled = true;
                                        } else {
                                            item.enabled = false;
                                        }
                                    });
                                }
                            }
                        }, '全选');
                    },
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value: params.row.enabled
                            },
                            nativeOn: {
                                click: () => {
                                    this.fieldEditData[params.index].enabled = !this.fieldEditData[params.index].enabled
                                    let checkAll = true;
                                    this.fieldEditData.forEach(ele => {
                                        if (!ele.enabled) {
                                            checkAll = false;
                                        }
                                    });
                                    this.enableAll = checkAll;
                                }
                            }
                        }, '启用');
                    }
                }
            ],
            fieldState:false,
            dataSaveObj:{},
            selectField:[],
            fieldList:[],
            indeterminate:true,
            checkAll:false,
            selectSystem:[]
        }
    },
    methods: {
        tabclick(name){
            this.currentTab = name
            if(name == 'name1'){
                this.getMenuData()
            }else if(name == 'name2'){
                this.getUserData()
            }
        },
        getUserData(){
            this.$post(this.GLOBAL.API_USER_ALL_LIST).then(res=>{
                if(res.data.length){
                    let userData = []
                    res.data.forEach(ele=>{
                        let obj={
                            label:ele.code,
                            name:ele.nickname,
                            key:ele.code
                        }
                        userData.push(obj)
                    })
                    this.userData = userData
                }
            })
            this.$post(this.GLOBAL.API_ROLE_USER_LIST,{roleCode:this.currentCode}).then(res=>{
                let arr = []
                res.data.records.forEach(ele=>{
                    arr.push(ele.userCode)
                })
                this.userSaveData = arr
            })
        },
        getMenuData(){//获取菜单数据
            this.$post(this.GLOBAL.API_TREE_ROLE,{code:this.currentCode}).then(res=>{
                this.selectSystem = res.data.rollAll
                let arr = res.data.all
                if(this.selectSystem.length){
                    let systemArr = []
                    for(let i = 0;i<arr.length;i++){
                        let obj= {}
                        for(let j = 0;j<this.selectSystem.length;j++){
                            if(arr[i].id == this.selectSystem[j].id){
                                obj = {
                                    id:arr[i].id,
                                    title:arr[i].name,
                                    checked:true
                                }
                            }
                            if(arr[i].subordinates.length){
                                obj = {
                                    id:arr[i].id,
                                    title:arr[i].name,
                                    children:this.loadNext(arr[i].subordinates)
                                }
                            }
                            if(j==this.selectSystem.length-1 && !obj.id){
                                obj = {
                                    id:arr[i].id,
                                    title:arr[i].name,
                                }
                            }
                        }
                        obj.disableCheckbox = this.currentCode == "ROLE_admin"
                        systemArr.push(obj)
                    }
                    this.powerData  = [{title: '系统菜单',children:systemArr,disableCheckbox:this.currentCode == "ROLE_admin"}]
                }else{
                    let str = JSON.stringify(arr)
                    str = str.replace(/subordinates/g, "children");
                    str = str.replace(/name/g, "title");
                    this.powerData = [{title: '系统菜单',children:JSON.parse(str),disableCheckbox:this.currentCode == "ROLE_admin"}]
                }
            })
        },
        loadNext(arr){//递归
            let systemArr = []
            for(let i = 0;i<arr.length;i++){
                let obj= {}
                for(let j = 0;j<this.selectSystem.length;j++){
                    if(arr[i].id == this.selectSystem[j].id){
                        obj = {
                            id:arr[i].id,
                            title:arr[i].name,
                            checked:true
                        }
                    }
                    if(arr[i].subordinates.length){
                        obj = {
                            id:arr[i].id,
                            title:arr[i].name,
                            children:this.loadNext(arr[i].subordinates)
                        }
                    }
                    if(j==this.selectSystem.length-1 && !obj.id){
                        obj = {
                            id:arr[i].id,
                            title:arr[i].name,
                        }
                    }
                }
                obj.disableCheckbox = this.currentCode == "ROLE_admin"
                systemArr.push(obj)
            }
            return systemArr
        },
        //角色选菜单保存
        preserveHandle(){
            let selectArr = this.$refs.tree.getCheckedNodes()
            let savemenu = []
            selectArr.forEach(ele=>{
                if(ele.id){
                    savemenu.push({id:ele.id})
                }
            })
            this.$post(this.GLOBAL.API_ROLE_MENU_SAVE,{role:{code:this.currentCode},menus:savemenu}).then(res=>{
                if(res.status == 200){
                    this.tabclick('name1')
                }
            })
        },
        //角色（新增/编辑/copy）
        addClick (code) {
            if(code){
                this.titleName = '编辑角色'
                this.$post(this.GLOBAL.API_ROLE_DETAIL,{code:code}).then(res=>{
                    this.editObj = res.data
                    this.name = res.data.name
                    this.remark = res.data.remark
                })
            }else{
                this.name = ''
                this.remark = ''
                this.titleName = '新建角色'
            }
            this.modelState = true
        },
        //角色保存
        confirmClick(){
            let url=''
            let saveObj = {}
            if(this.titleName == '新建角色'){
                url = this.GLOBAL.API_ROLE_ADD
                saveObj = {name:this.name,remark:this.remark,isIntroduced:false}
            }else if(this.titleName == '编辑角色'){
                url = this.GLOBAL.API_ROLE_UPDATE
                saveObj = this.editObj
                saveObj.name = this.name
                saveObj.remark = this.remark
            }
            this.$post(url,saveObj).then(res=>{
                if(res.status == 200){
                    this.modelState = false
                    this.getRoleList()
                }
            })
        },
        //获取角色列表
        getRoleList(){
            this.$post(this.GLOBAL.API_ROLE_LIST).then(res=>{
                this.roleData = res.data.records
                this.roleClick( res.data.records[0].id, res.data.records[0].code,res.data.records[0].name,res.data.records[0].remark )
            })
        },
        //角色点击
        roleClick(id,code,name,remark){
            this.currentCode = code
            this.currentId = id
            this.roleName = name
            this.roleDescribe = remark
            this.tabclick(this.currentTab)
        },
        deleteCLick(code){
          this.deletecode = code  
          this.delmodal = true
        },
        changeSwitchState (id,status){//启用/禁用
            this.$post(this.GLOBAL.API_ROLE_ENABLED,{code:id,isEnabled:status})
        },
        deleteRole(){//角色删除
            this.$post(this.GLOBAL.API_ROLE_DELETE,{code:this.deletecode}).then(res=>{
                if(res.status == 200){
                    this.delmodal = false
                    this.getRoleList()
                }
            })
        },
        userChange (targetKeys,direction,moveKeys) {//用户穿梭框
            if(direction == "left"){
                this.$post(this.GLOBAL.API_ROLE_USER_DELETE_LIST,{roleCode:this.currentCode,userCodes:moveKeys}).then(res=>{
                    if(res.status == 200){
                        this.userSaveData = targetKeys
                    }
                })
            }else{
                this.$post(this.GLOBAL.API_ROLE_USER_ADD_LIST,{roleCode:this.currentCode,userCodes:moveKeys}).then(res=>{
                    if(res.status == 200){
                        this.userSaveData = targetKeys
                    }
                })
            }
        }
    },
    created(){
        this.getRoleList()
    }
};