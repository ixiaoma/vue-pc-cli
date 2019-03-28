import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'menu-add',
  data() {
    return {
      argument: {
        title: '',//菜单的名称
        isEnable: true,//是否启用
        sortOrder: 1,//排序
        url: '',//url
        frameUrl: '',
        icon:''
      },
      selectRoleArr: [],//选择的角色
      addModal: false,//新建模态窗
      userSelectNode: {},//用户选择的节点
      addLoading:false
    }
  },
  computed: {
    ...mapGetters(['roleArr','nodeData'])
  },
  methods: {
    ...mapActions(['postAddMenusData']),
    //是否显示模态窗
    showAddModal() {
      this.addModal = true;
    },
    //提交
    submit() {
      var argu = {
        "isEnable": this.argument.isEnable,
        "name": this.argument.title,
        "parentId": this.nodeData.id == 'xtcd' ? null :this.nodeData.id,
        "roles": [],
        "sortOrder": this.argument.sortOrder,
        "url": this.argument.url,
        "frameUrl":this.argument.frameUrl,
        "icon":this.argument.icon
      };
      this.selectRoleArr.forEach(ele=>{
        this.roleArr.forEach(e=>{
          if(ele == e.code){
            argu.roles.push(e)
          }
        })
      });
      if (argu.name) {
        if (argu.url) {
          if(argu.roles.length){
            this.addLoading = true;
            var params = {
              url: this.GLOBAL.API_ROLE_MENU_INSERT,
              arguments: argu,
              callback: (id) => {
                /* 新增成功调用父元素获取子节点的方法 */
                this.$emit('getTreeData');
                this.$Message.success('新增成功');
                this.addModal = false;
                this.argument = {
                  title: '',//菜单的名称
                  isEnable: true,//是否启用
                  sortOrder: 1,//排序
                  url: '',//url
                  frameUrl: '',
                  icon:''
                }
                this.selectRoleArr = [];
                this.addLoading = false;
              },
              errorFn: (msg) => {
                this.$Message.error({content: msg, duration: 5});
                this.addLoading = false;
              }
            }
            this.postAddMenusData({params});
          }else{
            this.$Message.error({content: '请选择角色', duration: 5})
          }
        } else {
          this.$Message.error({content: '请填写Url', duration: 5})
        }
      } else {
        this.$Message.error({content: '请填写名称', duration: 5})
      }
    },
    //取消
    cancel() {
      this.addModal = false;
    }
  },
  created() {
    this.argument = {
      title: '',//菜单的名称
      isEnable: true,//是否启用
      sortOrder: 1,//排序
      url: '',//url
      frameUrl: '',
      icon:''
    }
    this.selectRoleArr = []
  },
  activated() {
    this.argument = {
      title: '',//菜单的名称
      isEnable: true,//是否启用
      sortOrder: 1,//排序
      url: '',//url
      frameUrl: '',
      icon:''
    }
    this.selectRoleArr = []
  }
}