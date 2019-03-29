// import { accessUser } from '@/libs/kendo-props'
// import { orderRule } from '@/libs/selectCode'
// import pageConfig from '@/components/PageConfig/page-config.vue'

export default {
  components: {
    // pageConfig
  },
  data(){
    return {
      orderRule,
      departList: [],   //部门列表
      kendoProps: accessUser,
      kendoParams: {
        objectType: "1",
      },
      kendoFilters: [],//如果有的查询条件时候传数组
      modeltitle: '',
      departmentData: [],//部门树数据
      departmentname: '',//选中的部门名称
      parentsname: '',
      modaldel: false,
      modalTree: false,
      tableDataUser1: [],
      adddepartment: {
        parentId: '',//父级id
        name: '',
        manager: '',
        buList: [],
        orderRule: '',
        departList:[],
        orderRuleNum:''
      },
      BUList: [],
      searchFlag2: true,
      ruleValidate: {
        jobname: [ { required: true, message: ' ', trigger: 'focus' } ],
        orderRuleNum: [ { required: true, message: ' ', trigger: 'focus' } ]
      },
      loading2: false,
      loading1: false,
      selectId:''
    }
  },
  methods: {
    isSetDepart( id ){    //判断该部门是否有组织
      let code = '1';
      this.$post(this.GLOBAL.API_IS_LENOVO_DEPT, id).then(res => {
        if (res.status == '200') {
          if (!res.data.length) {
            return code = '1';
          } else {
            let str = res.data.toString();
            this.$Message.warning(str + '部门已经关联组织');
            return code = '2';
          }
        } else {
          this.$Message.error(res.data.message);
          return code = '2';
        }
      })
    },
    getdepartList(query){     //获取部门列表
      if(query.length>1){
        let params = {
          departmentName: query
        };
        this.$get(this.GLOBAL.API_DEPARTMENT_CODE, params).then(res => {
          if (res.status == '200') {
            this.departList = res.data;
          } else {
            this.$Message.error(res.data.message);
          }
        })
      }
    },
    ObserverDataload1( value ){//获取部门负责人
      if (value !== '') {
        let params = {
          username: value,
        };
        this.$get(this.GLOBAL.API_SERCH_USER, params).then(res => {
          if (res.status == 200) {
            this.loading1 = false;
            this.tableDataUser1 = res.data
          } else {
            this.$Message.error({
              content: res.data.message,
              duration: 5,
            })
          }
        })
      }
    },
    edittree(){//编辑
      this.getbuList();
      this.modeltitle = "编辑组织";
      this.adddepartment.buList = [];
      this.adddepartment.name = '';
      this.adddepartment.manager = '';
      this.parentsname = this.departmentname;
      if (this.departmentname == '') {
        this.$Message.error("请选择节点");
        return;
      }
      if (this.departmentname == '全公司') {
        this.$Message.error("根节点不能编辑");
        return;
      }
      this.$post(this.GLOBAL.API_DEPT_INFO + this.selectId).then(res => {
        this.adddepartment.name = res.data.name;
        this.ObserverDataload1(res.data.managerName);
        this.adddepartment.manager = res.data.manager;
        let arr = []
        res.data.departList.forEach(ele=>{
          let obj ={
            codeKey:ele,
            codeValue:ele
          }
          arr.push(obj)
        })
        this.departList = arr
        this.adddepartment.orderRule = res.data.orderRule
        this.adddepartment.departList = res.data.departList
        this.adddepartment.id = res.data.id;
        this.adddepartment.parentId = res.data.parentId;
        this.adddepartment.buList = res.data.buList;
        this.modalTree = true
      })
    },
    gettreedata(){    //获取树
      this.$post(this.GLOBAL.API_ACCOUNT_DEPTTREE).then(res => {
        let powerData = JSON.stringify(res.data);
        powerData = powerData.replace(/name/g, 'title');
        powerData = powerData.replace(/subDept/g, 'children');
        powerData = powerData.replace(/true/g, 'false');
        powerData = JSON.parse(powerData);
        powerData.expand = true;
        this.departmentData = [];
        this.departmentData.push(powerData)
      })
    },
    deltree(){ //删除树节点
      if (this.departmentname == '') {
        this.$Message.warning("请选择节点");
        return;
      }
      if (this.departmentname == '全公司') {
        this.$Message.warning("根节点不能删除");
      } else {
        this.modaldel = true
      }
    },
    delok(){//确认删除
      this.$post(this.GLOBAL.API_DEPENTTREE_DELETE + this.selectId + '/delete').then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.departmentname = '';
          this.parentId = "";
          this.modaldel = false;
          this.selectId = "";
          this.gettreedata()
        } else {
          this.$Message.warning(res.data.message)
        }
      })
    },
    addchildsave(){//新建下级保存
      if (!this.adddepartment.name) {
        this.$Message.warning("请填写组织名称");
        return;
      }
      if (this.adddepartment.orderRule == '2' && this.adddepartment.orderRuleNum == '') {
        this.$Message.warning("轮循类型必须填写排队数量");
        return;
      }
      if (this.modeltitle == "编辑组织") {
        this.$post(this.GLOBAL.API_DEPT_UPDATE, this.adddepartment).then(res => {
          if (res.status == 200) {
            this.gettreedata();
            this.modalTree = false;
            this.$Message.success('保存成功')
          } else {
            this.$Message.warning(res.data.message)
          }
        })
      } else {
        this.$post(this.GLOBAL.API_DEPT_ADD, this.adddepartment).then(res => {
          this.$Message.success('保存成功');
          this.gettreedata();
          this.modalTree = false;
        })
      }

    },
    modalTreeUserCancel(){//取消
      this.modalTree = false
    },
    departmentselect( arr ){ //树的选中事件
      this.departmentname = arr.length? arr[ 0 ].title: '';
      this.selectId = arr.length? arr[ 0 ].id: ''
      this.kendoFilters = arr.length? [ { field: "deptId", operator: "eq", value: arr[ 0 ].id } ]: [];
      setTimeout(() => {
        this.bus.$emit('kendoReflash');
      }, 100);
      this.$store.state.modelData.deptid = this.selectId;
    },
    addson(){//新建下级
      this.getbuList();
      this.modeltitle = "新建下级";
      if (!this.selectId) {
        this.$Message.warning("请选择组织节点")
      } else {
        this.adddepartment = {
          parentId: this.selectId,//父级id
          name: '',
          manager: '',
          buList: [],
          orderRule: '',
          departList:[],
          orderRuleNum:''
        },
        this.tableDataUser1 = [];
        this.departList = []
        this.parentsname = this.departmentname;
        this.modalTree = true
      }
    },
    getbuList(){//获取buList
      let params = {
        categoryCode: 'bu_type'
      };
      this.$get(this.GLOBAL.API_CODE_GET_LIST, params).then(res => {
        this.BUList = res.data
      })
    }
  },
  created(){
    this.gettreedata();
  }
}
