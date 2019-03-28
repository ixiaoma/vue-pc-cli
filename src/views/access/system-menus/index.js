import treeModel from './tree-model/index.vue';
import menuAdd from './menu-add/index.vue';
import menuEdit from './menu-edit/index.vue';
import {mapGetters, mapActions} from 'vuex'; 
export default {
    name: 'system-menus',
    data(){
        return {
            flag:'',
            detailModal:false,
            selNodeData:{},//用户选择的节点信息
        }
    },
    components:{
        treeModel,
        menuAdd,
        menuEdit
    },
    computed:{
        ...mapGetters(['nodeData','roleArr'])
    },
    methods:{
        ...mapActions(['putMenusData']),
        //是否显示详情数据
        showDetailData(state){
            this.detailModal = state;
        },
        //存储用户选择的节点
        saveSelectNode(node){
            this.$refs.addChild.userSelectNode = node;
            this.$refs.editChild.userSelectNode = node;
            this.selNodeData = node;
        },
        //删除菜单
        deleteMenus(){
            if(this.nodeData.id != 'xtcd'){//如果id不等于系统菜单（xtcd）
                var params = {
                    url:this.GLOBAL.API_ROLE_MENU_DELETE,
                    id:this.selNodeData.id,
                    callback:()=>{
                        this.$Message.success({content:'删除成功',duration:5})
                        this.showDetailData(false);
                        this.$refs.treeChild.getAllTreeData();
                    },
                    errorFn:(msg)=>{
                        this.$Message.error({content:msg,duration:5});
                    }
                }
                this.putMenusData({params})
            }else{
                this.$Message.error({content:'根节点不可删除',duration:5});
            }
        },
        getTreeData() {
            this.$refs.treeChild.getAllTreeData();
        }
    },
    beforeDestroy () {//离开页面之前先清空stroe中存储选中的数据
        this.$store.commit('SAVE_OPTION_NODE',[]);
    }
}