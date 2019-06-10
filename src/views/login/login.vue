<style lang="less">
@import "./login.less";
</style>
<template>
	<div class="login" ref="login" :style="{backgroundImage: 'url(' + (imagesrc) + ')'}" @keyup.enter.native="handleSubmit()">
		<div class="login-box">
			<h1>{{ msg }}</h1>
			<Form ref="loginForm" :model="formItem" :label-width="80" :rules="rules">
				<FormItem prop="userName" label="账号:">
					<Input v-model="formItem.userName" style="width:290px" autofocus ref="userName" size="large" placeholder="请输入用户名和手机号" @keyup.enter.native="handleSubmit()"></Input>
				</FormItem>
				<FormItem prop="password" label="密码:">
					<Input v-model.trim="formItem.password" style="width:290px" ref="pass" type="password" size="large" placeholder="请输入密码" @keyup.enter.native="handleSubmit()"></Input>
				</FormItem>
				<FormItem label="验证码:" prop="code" class='code'>
					<Col span="12">
					<Input v-model="formItem.code" type="text" :maxlength="4" style="width:145px" size="large" ref="code" placeholder="请输入验证码" @keyup.enter.native="handleSubmit()" @on-keyup="checkinput(formItem.code)"></Input>
					</Col>
					<Col span="12">
					<img style="cursor: pointer;border-radius: 5px;height:36px;float:right" class="codebtn" v-bind:src="formItem.urlcodeimg" title="看不清，点击换一张" v-on:click="getcodeimgurl()" />
					</Col>
				</FormItem>
				<Button type="primary" long @click="handleSubmit" style="margin-left:80px;width:290px">
					<span v-if="!loading2">登录</span>
					<span v-else>登录中...</span>
				</Button>
				<div>
					<a @click="register" style="float:left;color:#fff; font-size: 14px;margin:10px 0 0 80px;">注册账号</a>
					<a @click="passwordrecovery" style="float:right;color:#fff; font-size: 14px;margin-top:10px;">忘记密码？</a>
				</div>
			</Form>
		</div>
	</div>
</template>

<script src='./login.js'></script>
