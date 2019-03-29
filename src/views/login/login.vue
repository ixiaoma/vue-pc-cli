<style lang="less" scoped>
  @import "./login.less";
</style>
<template>
  <div class="login" ref="login" style="background:url('/static/login_bg.jpg') no-repeat;background-size:100% 100%"
       @keyup.enter.native="handleSubmit()">
    <div class="login-box">
      <h1>{{ msg }}</h1>
      <Form ref="loginForm" :model="formItem" :label-width="80" :rules="rules">
        <FormItem prop="userName" label="账号:">
          <Input v-model="formItem.userName" style="width:290px" autofocus ref="userName" size="large" placeholder="请输入账号"
                 @keyup.enter.native="handleSubmit()"></Input>
        </FormItem>
        <FormItem prop="password" label="密码:">
          <Input v-model.trim="formItem.password" style="width:290px" ref="pass" type="password" size="large" placeholder="请输入密码"
                 @keyup.enter.native="handleSubmit()"></Input>
        </FormItem>
        <Button type="primary" long @click="handleSubmit" style="margin-left:80px;width:290px">
          <span v-if="!loading2">登录</span>
          <span v-else>登录中...</span>
        </Button>
      </Form>
    </div>
  </div>
</template>

<script src='./login.js'></script>

