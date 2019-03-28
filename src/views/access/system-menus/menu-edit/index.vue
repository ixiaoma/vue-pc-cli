<style lang="less" scoped>
    @import './index.less';
</style>
<style>
    #description .ivu-input{
        font-size:12px;
    }
    textarea.ivu-input{
        font-size:12px!important;
    }
    .structure .ivu-form-item-content{
        line-height:32px;
    }
</style>

<template>
    <div class='menu-edit'>
        <Col span="3">
            <Button type="primary" @click="showEditModal">编辑节点</Button>
            <Modal v-model="editModal" title="编辑节点" width='720px'>
                <div class='structure'>
                    <Form :label-width="100">
                        <div>
                            <Row>
                                <Col span="12">
                                    <FormItem :label='"名称"'>
                                        <Input v-model="nodeData.name" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem :label='"url"'>
                                        <Input v-model="nodeData.url" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem :label='"frameUrl"'>
                                    <Input v-model="nodeData.frameUrl" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem :label='"图标"'>
                                    <Input v-model.trim="nodeData.icon" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem :label='"角色权限"'>
                                        <Select v-model="nodeData.roleIds" filterable multiple>
                                            <Option v-for="item in roleArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem :label='"排序"'>
                                        <InputNumber :min="1" v-model="nodeData.sortOrder" size="small"></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem :label='"是否启用"'>
                                        <i-switch v-model="nodeData.isEnable" >
                                            <span slot="open">是</span>
                                            <span slot="close">否</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
                <div slot="footer">
                    <Button @click='cancel()'>取消</Button>
                    <Button type="primary" @click='submit()' :loading="addLoading">提交</Button>
                </div>
            </Modal>
        </Col>
    </div>
</template>
<script src='./index.js'>
    
</script>