import md5 from 'js-md5';

export default {
  name: 'login',
  data() {
    return {
      msg: "话务系统",
      formItem: {
        userName: "",
        password: "abcd-8888",
        code: "",
        urlcodeimg: "",
        token: ''
      },
      imagesrc: '',
      rules: {
        userName: [{ required: true, message: " ", trigger: "blur" }],
        password: [{ required: true, message: " ", trigger: "blur" }],
        code: [{ required: true, message: " ", trigger: "blur" }]
      },
      loading2: false,
      client: null
    };
  },
  methods: {
    checkinput(e) {
      this.formItem.code = e.replace(/[^0-9-]+/, '')
    },
    // 验证码
    getcodeimgurl() {
      this.$get(this.GLOBAL.API_LOGIN_CODE).then(res => {
        if (res.data.retCode == 200) {
          this.formItem.urlcodeimg = "data:image/jpg;base64," + res.data.data.captcha; // 验证码图片
          this.formItem.token = res.data.data.token; // token
        } else {
          this.$Message.error('获取验证码失败');
        }
      })
    },
    // 登录
    handleSubmit() {
      let md5_password = md5(this.formItem.password);
      let params = {
        username: this.formItem.userName,
        password: md5_password,
        captcha: this.formItem.code,
        token: this.formItem.token
      }
      if (!this.formItem.userName) {
        this.$Message.error("请填写用户名称")
        this.$refs.userName.focus()
      } else if (!this.formItem.password) {
        this.$Message.error("请填写密码")
        this.$refs.pass.focus()
      } else if (!this.formItem.code) {
        this.$Message.error("请填写验证码")
        this.$refs.code.focus()
      } else {
        this.loading2 = true
        this.$post(this.GLOBAL.API_LOGIN, params).then(res => {
          if (res.data.retCode == "200") {
            if (res.data.data.access_token) {
              sessionStorage.setItem('user', this.formItem.userName);
              sessionStorage.setItem('userId', res.data.data.userId);
              sessionStorage.setItem('newUser', res.data.data.firstLogin);
              sessionStorage.setItem('cookieaccess_token', res.data.data.access_token);
              sessionStorage.setItem('wwwpd', md5_password);
              sessionStorage.setItem('switchUser', res.data.data.switchUser);
              this.getUserInfo()              
              // this.$store.commit('connect');             
            }
          } else {
            this.$Message.error(res.data.message)
            this.loading2 = false
            this.getcodeimgurl();
          }
        })
      }
    },
    //忘记密码
    passwordrecovery() {
      this.$router.push({
        name: "passwordrecovery"
      })
    },
    //注册账号
    register() {
      this.$router.push({
        name: "register"
      })
    },
    getUserInfo() {//这是电话控件要用的信息,我的待办，邮寄，共享等等页面使用的
      this.$get(this.GLOBAL.API_GET_CURRENTUSER).then(res => {
        if (res.data.retCode == "200") {
          let userInfo = JSON.stringify(res.data.data)
          localStorage.setItem("userInfo", userInfo)
          this.$router.push({
              name: "home_index"
            })
        } else {
          this.$Message.error(res.data.message);
        }
      })
    }
  },
  created() {
    this.imagesrc = '/static/' +  Math.floor(Math.random() * 5 + 1) + '.jpg'
    this.getcodeimgurl()
    localStorage.clear()
    sessionStorage.clear(); 
  }
}
