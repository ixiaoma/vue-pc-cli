<template>
    <Card>
        <div>
            <Button type="primary" @click="add" style="margin-bottom:5px">新建用户</Button>
            <Input style="width:200px;margin-bottom:5px;margin-left:200px" size="small" v-model="nicknamesearch" placeholder="请输入昵称"></Input>
            <Input style="width:200px;margin-bottom:5px" size="small" v-model="itcodesearch" placeholder="请输入ITcode"></Input>
            <Button type="primary" @click="userdataLoad(1)" style="margin-bottom:5px">查询</Button>
            <Table border :columns="userColumns" :data="userData"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page show-total show-sizer :page-size-opts="pagesizeOP" :page-size="pageSize" :total="total" :current.sync="pageNum" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <Modal v-model="modal1" :title="title" width="460">
            <Form :label-width="120" :rules="ruleValidate">
                <FormItem label="用户昵称" prop="nickname">
                    <Input v-model="nickname" placeholder="" @on-keyup="nicknameinput(nickname)"></Input>
                </FormItem>
                <FormItem label="Itcode" prop="code">
                    <Input v-model="code" placeholder="" v-if="title=='编辑'" disabled></Input>
                    <Input v-model="code" placeholder="" v-else @on-keyup="checkinput(code)"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="password" placeholder="" type="password"></Input>
                </FormItem>
            </Form>
            <div style="clear:both"></div>
            <div slot="footer">
                <Button @click="modal1=false">取消</Button>
                <!--<Button type="primary" @click="save">确认</Button>-->
                <Button type="primary" :loading="loading" @click="save">
                    <span v-if="!loading">保存</span>
                    <span v-else>保存...</span>
                </Button>
            </div>
        </Modal>
        <Modal :mask-closable="false" v-model="isDelete" width="360">
        <p slot="header" class="modal-header">
            <Icon type="information-circled"></Icon>
            <span>确认删除</span>
        </p>
        <div class="modal-content">
            <p>是否删除此用户？</p>
        </div>
        <div slot="footer" class="modal-footer">
            <Button type="error" size="large" long @click="deleteFn">删除</Button>
        </div>
        </Modal>
    </Card>
</template>
<script src='./user.js'></script>