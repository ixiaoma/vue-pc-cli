import {mapGetters, mapActions} from 'vuex';
import { stringify } from 'querystring';
export default {
    name:'treeModel',
    data(){
        return {
            nodeInfo:{},
            treeStructure:[{
                title:'系统菜单',
                id:'xtcd',
                expand: true,
                children:[]
            }],//树结构
            buttonProps: {
                type: 'ghost',
                size: 'small',
            },
            isClass:-1,//选中节点的标识
            treeInterFaceData:{}
        }
    },
    computed:{
        ...mapGetters(['addSuccessFlag','optionNode'])
    },
    methods:{
        ...mapActions(['selectByIdFindNode','putMenusData','getAllRoleArr']),
        //渲染操作的按钮（+ -）
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
                                this.isClass = node.nodeKey;
                                this.selectChange(node);
                            }
                        },
                        class:{
                            foo:root[node.nodeKey].nodeKey == this.isClass?true:false
                        }
                    },data.title)
                ]),
            ]);
        },
        getAllTreeData() {//获取所有树节点
            this.treeStructure = [{
                title:'系统菜单',
                id:'xtcd',
                expand: true,
                children:[]
            }]
            var url = this.GLOBAL.API_MENU_FINDALL;
            this.$post(url).then(res=>{ 
                this.treeInterFaceData = res.data;
                this.handleTreeData(res.data,this.treeStructure[0].children);
            })
        },
        handleTreeData(records,arr){//处理树数据结构
            var optionNodeArr = JSON.parse(JSON.stringify(this.$store.state.systemMenus.optionNode));
            records.forEach(ele=>{
                var obj = {
                    id:ele.id,
                    title:ele.name,
                    children:[]
                }
                if(optionNodeArr.indexOf(ele.id) != -1){
                    obj.expand = true;
                }else{
                    obj.expand = false;
                }
                arr.push(obj);
                if(ele.subordinates.length) {
                    this.handleTreeData(ele.subordinates,obj.children)
                }
            })
        },
        saveToggleNode(e) {//保存展开的节点
            if(e.id){
                if(e.expand){
                    var arr = JSON.parse(JSON.stringify(this.$store.state.systemMenus.optionNode));
                    arr.push(e.id)
                    this.$store.commit('SAVE_OPTION_NODE',arr);
                }else{
                    var arr = JSON.parse(JSON.stringify(this.$store.state.systemMenus.optionNode));
                    arr.forEach((ele,index)=>{
                        if(ele == e.id){
                            arr.splice(index,1);
                        }
                    })
                    this.$store.commit('SAVE_OPTION_NODE',arr);
                }
            }
        },
        //点击树节点获取节点详细信息
        selectChange(nodeObj){
            this.$emit('saveSelectNode',nodeObj.node);
            if(nodeObj.node.id){
                if(nodeObj.node.id == 'xtcd'){
                    var obj = {
                        id:'xtcd',
                        name:'系统菜单',
                        isEnable:true,
                        parentId:null,
                        roleIds:[],
                        roles:[],
                        sortOrder:0,
                        url:'#'
                    }
                    this.$emit('controlDetail',true);
                    this.$store.commit('SELECT_BY_ID_FIND_NODE',{nodeData:obj});
                }else{
                    var params = {
                        url:this.GLOBAL.API_ROLE_MENU_DETAIL,
                        id:nodeObj.node.id,
                        errorFn:(msg)=>{
                            this.$Message.error({content:msg,duration:5});
                        }
                    }
                    this.$emit('controlDetail',true);
                    this.selectByIdFindNode({params}); 
                }
            }else{
                this.$emit('controlDetail',false);
            }
        },
    },
    created(){
        this.getAllTreeData();//获取所有树节点
        //获得角色信息
        this.getAllRoleArr({
            path:this.GLOBAL.API_ROLE_LIST,
            errorFn:(msg)=>{
                this.$Message.error({content:msg,duration:5});
            }
        })
    }
}