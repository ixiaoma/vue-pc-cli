<style lang="less">@import "./index.less";</style>
<template>
  <div class="settingcontacts">
    <Card>
      <Row class="linemargin">
        <Col span="6">
          <span class="usertreepaddingleft">组织：{{departmentname}}</span>
          <Icon type="plus" size=18 class="usertreepaddingleft" @click.native="addson"></Icon>
          <Icon type="ios-compose" size=18 class="usertreepaddingleft" @click.native="edittree"></Icon>
          <Icon type="ios-trash" size=18 class="usertreepaddingleft" @click.native="deltree"></Icon>
          <Tree :data="departmentData" @on-select-change='departmentselect'></Tree>
        </Col>
        <Col span="18" style="border-left:1px solid #efefef;height :600px; ">
          <!-- <page-config ref='kendoChild'
                       :kendoParams="kendoParams"
                       :kendoProps="kendoProps"
                       :kendoFilters="kendoFilters">
          </page-config> -->
        </Col>
      </Row>
    </Card>
    <Modal v-model="modalTree" :title="modeltitle" width="60%">
      <Form :label-width="160" :model="adddepartment" ref="formValidate" :rules="ruleValidate">
        <Col span="20">
          <FormItem label="上级组织" v-if="modeltitle!='编辑组织'">
            <Input size="small" v-model="parentsname" placeholder="请输入" disabled></Input>
          </FormItem>
        </Col>
        <Col span="20">
          <FormItem label="组织名称" prop="jobname">
            <Input size="small" v-model.trim="adddepartment.name" placeholder="请输入"></Input>
          </FormItem>
        </Col>
        <Col span="20">
          <FormItem label="组织负责人" prop="manager">
            <Select
              size="small" filterable remote
              v-model="adddepartment.manager"
              :remote-method="ObserverDataload1"
              :loading="loading1">
              <Option v-for="item in tableDataUser1" :value="item.id" :key="item.id">{{item.code}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="20">
          <FormItem label="BU">
              <Select size="small" multiple v-model="adddepartment.buList" width="100%">
                  <Option v-for="item in BUList" :value="item.codeKey" :key="item.codeKey">{{item.codeKey}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col span="20">
          <FormItem label="规则类型" prop="orderRule">
            <Select size="small" v-model="adddepartment.orderRule" width="100%">
              <Option v-for="item in orderRule" :value="item.key" :key="item.key">{{item.value}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="20" v-if="adddepartment.orderRule == '2' ">
          <FormItem label="排队数量" prop="orderRuleNum">
            <InputNumber :min="1" v-model.trim="adddepartment.orderRuleNum" size="small"></InputNumber>
          </FormItem>
        </Col>
        <Col span="20">
          <FormItem label="选择部门">
            <Select
                size="small"
                v-model="adddepartment.departList"
                multiple
                filterable
                remote
                :remote-method="getdepartList">
                <Option v-for="(option, index) in departList" :value="option.codeKey" :key="index">{{option.codeValue}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Form>
      <div style="clear:both"></div>
      <div slot="footer">
        <Button @click="modalTreeUserCancel">取消</Button>
        <Button type="primary" @click="addchildsave">确认</Button>
      </div>
    </Modal>
    <Modal v-model="modaldel" width="360">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>确认删除</span>
      </p>
      <div>
        <p>是否删除此数据？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="delok">删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script src="./index.js"></script>




