<style lang="less">
    @import "index.less";
</style>
<template>
    <div class="contacts">
        <Card>               
            <Button type="primary" @click="addClick()" class="addbutton">新建角色</Button>
            <Row style="border:1px solid #efefef">      
                <Col :md="6" :sm="6" id="userRole">
                    <ul class="roleList">
                        <li v-for="(item,index) in roleData" :key="index">
                            <Col :md="14" :sm="14">
                                <Button :class="[item.isEnabled ? 'spanlink' : 'disableRole',{activeBtn:item.id == currentId}]" @click="roleClick(item.id,item.code,item.name,item.remark)">{{item.name}}</Button>
                            </Col>
                            <Col :md="10" :sm="10" v-if='item.code != "ROLE_admin"'>
                                <span class="iconBtn">
                                    <i-Switch v-model="item.isEnabled" size="small" @on-change="changeSwitchState(item.code,item.isEnabled)"></i-Switch>
                                </span>
                                <Button class="iconBtn" type="text" title="编辑" @click="addClick(item.code)"><Icon type="ios-compose-outline"></Icon></Button>
                                <Button class="iconBtn" type="text" title="删除" @click="deleteCLick(item.code)"><Icon type="ios-trash-outline" ></Icon></Button>
                            </Col>
                        </li>
                    </ul>
                </Col>
                <Col :md="18" :sm="18" style="border-left:1px solid #efefef;"> 
                    <Col :md="24" :sm="24" style="padding:15px">
                        <p>{{roleName + '      描述:      ' + roleDescribe}}</p>
                    </Col>                  
                    <Col :md="24" :sm="24" style="padding:15px">
                    <Tabs v-model="currentTab" @on-click="tabclick">
                        <TabPane label="菜单配置" name="name1">
                            <Row>
                                <Col :md="24" :sm="24" style="padding:15px;margin-bottom:50px">
                                <Tree :data="powerData" show-checkbox multiple  ref="tree"></Tree>
                                </Col>
                                <Col offset="9" span="6">
                                <Button type="primary" @click="preserveHandle">保存</Button>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane label="用户配置" name="name2">
                            <Transfer
                            :data="userData"
                            :target-keys="userSaveData"
                            filterable
                            :list-style='{width:"270px",height:"530px"}'
                            :titles='["用户源","已选用户"]'
                            @on-change="userChange"></Transfer>
                        </TabPane> 
                        <TabPane label="业务报表" name="name3">
                            <Transfer
                            :data="reportData"
                            :target-keys="reportSaveData"
                            filterable
                            :list-style='{width:"270px",height:"530px"}'
                            :titles='["报表","已选报表"]'
                            @on-change="reportChange"></Transfer>
                        </TabPane>     
                        <TabPane label="业务报表字段配置" name="name4">
                            <Table size="small" :data="roleReportData" :columns="reportColumns" :show-header="false"></Table>
                        </TabPane> 
                        <TabPane label="数据配置" name="name5">
                            <Row style="margin-bottom:10px">
                                <Col span="1" push="1" style="height: 32px;line-height: 32px;">
                                    报表
                                </Col>
                                <Col span="6" push="1">
                                    <Select filterable v-model="reportId" style="width:200px" @on-change="reportSelect">
                                        <Option v-for="item in roleReportData" :value="item.reportId" :key="item.reportId">{{ item.reportName }}</Option>
                                    </Select>
                                </Col>
                            </Row> 
                            <Table size="small" :data="fieldData" :columns="fieldColumns" :show-header="false"></Table>
                        </TabPane>        
                    </Tabs>                     
                    </Col>                                                        
                </Col>
            </Row>
        </Card>
        <Modal v-model="delmodal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除角色</span>
            </p>
            <div style="text-align:center">
                <p>删除后角色将不能恢复</p>
                <p>是否确认删除？</p>
            </div>
            <div slot="footer">
                <Button type="warning" size="large" long @click="deleteRole">删除</Button>
            </div>
        </Modal>
        <Modal v-model="modelState" :title="titleName">
                <Form  :label-width="100" :rules="editRule">
                    <FormItem label="角色名称" prop="name">
                        <Input size="small" ref="roleName" v-model.trim="name"></Input>
                    </FormItem>
                    <FormItem label="角色描述">
                        <textarea size="small" ref="roleDescribe" class="textarea" v-model="remark"></textarea>
                    </FormItem>
                </Form>
                <div slot="footer">
                <Button   @click="modelState = false">取消</Button>
                <Button type="primary"  @click="confirmClick">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="reportState"
            :title="roleName+'-'+fieldName+'-字段使用'">
            <Table size="small" height="500" ref="selection" :columns="tableColumns" :data="fieldEditData"></Table>
            <div slot="footer">
                <Button   @click="reportState = false">取消</Button>
                <Button type="primary"  @click="reportConfim">保存</Button>
            </div>
        </Modal>
        <Modal v-model="fieldState"
            width="600px"
            title='数据权限值'>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup v-model="selectField" @on-change="checkAllGroupChange">
                <Checkbox  v-for="item in fieldList" :label="item.code" :key="item.code">{{item.name}}</Checkbox>
            </CheckboxGroup>
            <div slot="footer">
                <Button   @click="fieldState = false">取消</Button>
                <Button type="primary"  @click="fieldConfim">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js"></script>
