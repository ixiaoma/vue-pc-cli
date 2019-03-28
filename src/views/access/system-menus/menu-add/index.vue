<style lang="less" scoped>
  @import './index.less';
</style>
<style>
  #description .ivu-input {
    font-size: 12px;
  }
</style>
<template>
  <div class='menu-add'>
    <Col span="3">
      <Button type="primary" @click="showAddModal">新建子节点</Button>
      <Modal v-model="addModal" title="新建子节点" width='720px'>
        <Form :label-width="100">
          <div class='structure'>
            <Row>
              <Col span="12">
                <FormItem :label='"名称"'>
                  <Input v-model="argument.title" size="small"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label='"url"'>
                  <Input v-model="argument.url" size="small"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label='"frameUrl"'>
                  <Input v-model="argument.frameUrl" size="small"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label='"图标"'>
                  <Input v-model.trim="argument.icon" size="small"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label='"角色权限"'>
                  <Select v-model="selectRoleArr" filterable multiple>
                    <Option v-for="item in roleArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label='"排序"'>
                  <InputNumber :min="1" v-model="argument.sortOrder" size="small"></InputNumber>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label='"是否启用"'>
                  <i-switch v-model="argument.isEnable" >
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </FormItem>
              </Col>
            </Row>
          </div>
        </Form>
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