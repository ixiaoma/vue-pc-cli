<style lang="less" scoped>
    @import "./index.less";
</style>

<template>
    <div class="system-menus">
        <Row>
            <Col span="24">
                <Card>           
                    <!--<p slot="title">系统菜单</p>  -->
                    <Col span="24" style="border:1px solid #efefef" >      
                        <treeModel ref="treeChild" @controlDetail="showDetailData" @saveSelectNode="saveSelectNode"></treeModel>
                        <Col :md="18" :sm="17" style="border-left:1px solid #efefef;height:400px; overflow-y:auto;" >
                            <Col span="24" v-show="detailModal">
                                <h3 class="sysTitle">系统菜单信息</h3>
                            </Col>
                            <Col class="btnBox" span="24" v-show="detailModal">
                                <Col class="sysBtn">
                                    <menuEdit ref="editChild" @getTreeData="getTreeData"></menuEdit>                 
                                </Col>  
                                <Col class="sysBtn">
                                    <menuAdd ref="addChild" @getTreeData="getTreeData"></menuAdd>
                                </Col> 
                                <Col class="sysBtn" span="3">
                                    <Button type="primary" @click="deleteMenus">删除</Button>     
                                </Col>    
                            </Col>     
                            <Col span="24" class="detailInfo" v-show="detailModal">
                                <!-- <Form :label-width="100"> -->
                                    <div>
                                        <Row>
                                            <Col span="24" style="height:30px">
                                                <Col span="4"  style="text-align:right"><label><b>名称&nbsp;:&nbsp;</b></label></Col>
                                                <Col span="16"><span :title="nodeData.name">{{nodeData.name}}</span></Col>
                                            </Col>
                                            <Col span="24" style="height:30px">
                                                <Col span="4"  style="text-align:right"><label><b>url&nbsp;:&nbsp;</b></label></Col>
                                                <Col span="16"><span :title="nodeData.url">{{nodeData.url}}</span></Col>
                                            </Col>
                                            <Col span="24" style="height:30px">
                                                <Col span="4"  style="text-align:right"><label><b>frameUrl&nbsp;:&nbsp;</b></label></Col>
                                                <Col span="16"><span :title="nodeData.frameUrl">{{nodeData.frameUrl}}</span></Col>
                                            </Col>
                                            <Col span="24" style="height:30px">
                                                <Col span="4"  style="text-align:right"><label><b>图标&nbsp;:&nbsp;</b></label></Col>
                                                <Col span="16"><Icon style="font-size:18px" :type="nodeData.icon"></Icon></Col>
                                            </Col>
                                            <Col span="24" style="height:30px">
                                            <Col span="4"  style="text-align:right"><label><b>排序&nbsp;:&nbsp;</b></label></Col>
                                                <Col span="16"><span :title="nodeData.sort">{{nodeData.sortOrder}}</span></Col>
                                            </Col>
                                            <Col span="24" style="height:30px">
                                                <Col span="4"  style="text-align:right"><label><b>是否启用&nbsp;:&nbsp;</b></label></Col>
                                                <Col span="16"><span :title="nodeData.isEnable == true?'启用':'禁用'">{{nodeData.isEnable == true?"启用":"禁用"}}</span></Col>
                                            </Col>
                                            <Col span="24" style="min-height:30px">
                                                <Col span="4"  style="text-align:right"><label><b>角色权限&nbsp;:&nbsp;</b></label></Col>
                                                <Col span="16"><span :title="nodeData.roleName">{{nodeData.roleName}}</span></Col>
                                            </Col>
                                        </Row>
                                    </div>
                                <!-- </Form> -->
                            </Col>          
                        </Col>
                    </Col>
                    <div style="clear:both"></div>
                </Card>
            </Col>
            
        </Row>   
    </div>
</template>

<script src='./index.js'>

</script>


