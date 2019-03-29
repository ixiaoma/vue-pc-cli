import md5 from 'js-md5';

export default {
  name: 'login',
  data(){
    return {
      msg: "联想商务智能咨询服务系统",
      arr: [],
      formItem: {
        userName: "",
        password: "",
        code: "",
        urlcodeimg: "",
        token: '',
        client: null
      },
      modal1: false,
      rules: {
        userName: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        aaa: ''
      },
      loading2: false,
      clear1: ''
    };
  },
  beforeDestroy(){
    clearTimeout(this.clear1)
  },
  methods: {
    checkinput( e ){
      this.formItem.code = e.replace(/[^0-9-]+/, '')
    },
    // 登录
    handleSubmit(){
      let url = this.GLOBAL.API_LOGIN;
      let md5_password = md5(this.formItem.password);
      let params = {
        username: this.formItem.userName,
        password: this.formItem.password //md5_password
      };
      if (!params.username) {
        this.$Message.error("请填写用户名称")
        this.$refs.userName.focus()
      } else if (!this.formItem.password) {
        this.$Message.error("请填写密码")
        this.$refs.pass.focus()
      } else {
        this.loading2 = true
        this.$post(url, params).then(res => {
          if (res.status == 200) {
            sessionStorage.setItem('cookieaccess_token', res.headers.authorization)
            sessionStorage.setItem('user', this.formItem.userName);
            this.$router.push({name:'home_index'})
          }
        })
      }
    },
    //忘记密码
    passwordrecovery(){
      this.$router.push({
        name: "passwordrecovery"
      })
    }
  }
}
