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
            roleReportData:[],
            reportData:[],
            reportSaveData:[],
            userData:[],
            userSaveData:[],
            fieldName:'',
            reportId:'',
            powerData:[],
            reportState:false,
            deletecode:'',
            reportColumns:[
                {
                    title: '报表名称',
                    key: 'reportName',
                    width: 200
                },
                {
                    title: '操作',
                    key: 'reportclick',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                        icon: 'ios-compose-outline'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        marginLeft: '5px',
                                        border: 0,
                                        fontSize: '16px'
                                    },
                                    on: {
                                        click: () => {
                                            this.fieldEditData = []
                                            this.$post(this.GLOBAL.API_FIELD_LIST,{reportId:params.row.reportId,roleCode:this.currentCode}).then(res=>{
                                                this.fieldEditData = res.data
                                                let checkAll = true;
                                                if(this.fieldEditData.length){
                                                    this.fieldEditData.forEach(ele => {
                                                        if (!ele.enabled) {
                                                            checkAll = false;
                                                        }
                                                    });
                                                }else{
                                                    checkAll = false
                                                }
                                                this.enableAll = checkAll;
                                            })
                                            this.fieldName = params.row.reportName,
                                            this.reportState = true
                                        }
                                    }
                                })
                        ]);
                    }
                }
            ],
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
            fieldData:[],
            dataSaveObj:{},
            fieldColumns: [
                {
                    title: '字段名称',
                    key: 'fieldAlias',
                    width: 200
                },
                {
                    title: '操作',
                    key: 'operation',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small',
                                        icon: 'ios-compose-outline'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        marginLeft: '5px',
                                        border: 0,
                                        fontSize: '16px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$post(this.GLOBAL.API_DATA_LIST,{roleCode:this.currentCode,reportId:this.reportId,fieldCode:params.row.fieldCode}).then(res=>{
                                                this.dataSaveObj = res.data
                                                this.fieldList = res.data.enumData
                                                let arr = []
                                                res.data.enumData.forEach(ele=>{
                                                    if(ele.enabled){
                                                        arr.push(ele.code)
                                                    }
                                                })
                                                this.selectField = arr
                                                this.checkAllGroupChange(arr)
                                                this.fieldState = true
                                            })
                                        }
                                    }
                                })
                        ]);
                    }
                }
            ],
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
            }else if(name == 'name3'){
                this.getReportData()
            }else if(name == 'name4'){
                this.getRoleReportList(1)
            }else if(name == 'name5'){
                this.getRoleReportList(1)
                this.reportId = ''
            }
        },
        getUserData(){
            this.$post(this.GLOBAL.API_USER_LIST,{pageNum:1,pageSize:1000000}).then(res=>{
                if(res.data.records.length){
                    let userData = JSON.stringify(res.data.records);
                    userData = userData.replace(/code/g, 'label');
                    userData = JSON.parse(userData);
                    userData.forEach(res=>{
                        res.key = res.label
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
        getReportData(){//获取报表数据
            this.$post(this.GLOBAL.API_ROLE_ALL_LIST,{dataType:'REPORT'}).then(res=>{
                let reportData = JSON.stringify(res.data);
                    reportData = reportData.replace(/name/g, 'label');
                    reportData = reportData.replace(/id/g, 'key');
                    reportData = JSON.parse(reportData);
                this.reportData = reportData
            })
            this.getRoleReportList(0)
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
        },
        getRoleReportList(flag){//角色下的报表
            this.$post(this.GLOBAL.API_ROLE_REPORT_LIST,{roleCode:this.currentCode}).then(res=>{
                if(flag){
                    this.roleReportData = res.data
                }else{
                    let arr = []
                    res.data.forEach(ele=>{
                        arr.push(ele.reportId)
                    })
                    this.reportSaveData = arr
                }
            })
        },
        reportChange (targetKeys,direction,moveKeys) {//报表穿梭框
            if(direction == "left"){
                this.$post(this.GLOBAL.API_ROLE_DELETE_REPORT_LIST,{id:this.currentId,roleCode:this.currentCode,ids:moveKeys}).then(res=>{
                    if(res.status == 200){
                        this.reportSaveData = targetKeys
                    }
                })
            }else{
                this.$post(this.GLOBAL.API_ROLE_INSERT_REPORT_LIST,{id:this.currentId,roleCode:this.currentCode,ids:moveKeys}).then(res=>{
                    if(res.status == 200){
                        this.reportSaveData = targetKeys
                    }
                })
            }
        },
        reportSelect(id){//数据配置
            this.$post(this.GLOBAL.API_FIELD_TYPE_LIST,{reportId:id}).then(res=>{
                if(res.status == 200){
                    this.fieldData = res.data
                }
            })
        },
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;
            if (this.checkAll) {
                let arr = []
                this.fieldList.forEach(ele=>{
                    arr.push(ele.code)
                })
                this.selectField = arr;
            } else {
                this.selectField = [];
            }
        },
        checkAllGroupChange (data) {
            if (data.length === this.fieldList.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        reportConfim(){//报表选字段弹框保存
            this.$post(this.GLOBAL.API_FIELD_SAVE,this.fieldEditData).then(res=>{
                if(res.status == 200){
                    this.reportState = false
                }
            })
        },
        fieldConfim(){//数据配置字段弹窗保存
            this.dataSaveObj.enumData.forEach(item=>{
                let flag = false
                this.selectField.forEach(ele=>{
                    if(item.code == ele){
                        flag = true
                        item.enabled = true
                    }
                })
                if(!flag && item.enabled){
                    item.enabled = false
                }
            })
            this.$post(this.GLOBAL.API_DATA_SAVE,this.dataSaveObj).then(res=>{
                if(res.status == 200){
                    this.fieldState = false
                }
            })
        }
    },
    created(){
        this.getRoleList()
        
    }
};