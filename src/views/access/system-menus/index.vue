<style lang="less">
    @import "./index.less";
</style>

<template>
    <div class="system-menus">
        <Card>           
            <Row>  
                <Col :md="6" :sm="7">
                    <div class="treeWrap">
                        <Tree :data="treeStructure"  :render="renderContent" ></Tree>
                    </div>
                </Col>    
                <Col :md="18" :sm="17" class="sysdetail">
                    <div >
                        <h3 class="sysTitle">菜单信息</h3>
                        <Col>
                            <Button type="primary" size='small' v-if="nodeData.type==1" @click="createNode(1)">新建节点</Button>   
                            <Button type="primary" size='small' v-if="detailModal" @click="createNode()">编辑节点</Button> 
                            <Button type="primary" size='small' v-if="detailModal" @click="deleteMenus">删除</Button>
                        </Col>        
                        <Form :label-width="100"  :rules="rule" v-if="detailModal">
                            <FormItem label="名称:" prop="name">{{nodeData.name}}</FormItem>
                            <FormItem :label="nodeData.type==2 ? 'code:':'routerName:' ">{{ nodeData.type==2 ? nodeData.code : nodeData.url}}</FormItem>
                            <FormItem label="节点类型:" prop="name">{{nodeData.type==1 ? '菜单' : '按钮'}}</FormItem>
                            <FormItem label="排序:" prop="name">{{nodeData.sortOrder}}</FormItem>
                            <FormItem label="是否启用:">{{nodeData.isEnable == true?"启用":"禁用"}}</FormItem>
                            <FormItem label="角色权限:" prop="name">{{roleName}}</FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Card>
        <Modal v-model="addModal" :title="modelTitle" width='720px'>
            <Form :label-width="100" class="clearfix" v-if="addModal">
                <Col span="12">
                    <FormItem label="节点类型">
                        <Select v-model="nodeData.type" size="small" :disabled='modelTitle=="编辑节点" ? true : false'>
                            <Option :value="1">菜单</Option>
                            <Option :value="2">按钮</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="名称">
                        <Input v-model="nodeData.name" size="small"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="routerName" v-if='nodeData.type == 1'>
                        <Input v-model="nodeData.url" size="small"></Input>
                    </FormItem>
                    <FormItem label="code" v-else>
                        <Input v-model="nodeData.code" size="small"></Input>
                    </FormItem>
                </Col>
                <Col span="12" v-if='nodeData.type == 1'>
                    <FormItem label="菜单图标">
                        <Input v-model="nodeData.icon" size="small"></Input>
                    </FormItem>
                </Col>
                <Col span="12" v-if='nodeData.type == 1'>
                    <FormItem label="排序">
                        <InputNumber :min="1" v-model="nodeData.sortOrder" size="small"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="6" v-else>
                    <FormItem label="排序">
                        <InputNumber :min="1" v-model="nodeData.sortOrder" size="small"></InputNumber>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="是否启用">
                        <i-switch v-model="nodeData.isEnable" >
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="角色权限">
                        <Select size="small" v-model="nodeData.roles" filterable multiple class="mutilSelect">
                            <Option v-for="(item,index) in roleArr" :value="item.code" :key="index">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Form>
            <div slot="footer">
                <Button @click='addModal = false' size='small'>取消</Button>
                <Button type="primary" @click='submit' size='small'>提交</Button>
            </div>
        </Modal>
        <Modal :mask-closable="false" v-model="deleteModel" width="360">
            <p slot="header" class="modal-header">
                <Icon type="information-circled"></Icon>
                <span>确认删除</span>
            </p>
            <div class="modal-content">
                <p>是否删除此数据？</p>
            </div>
            <div slot="footer" class="modal-footer">
                <Button type="error" size="small" long @click="deleConfirm">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script src='./index.js'>

</script>


