<template>
    <div class='table_com'>
        <Form label-position="left" :label-width="260">
            <Collapse v-model="openPage" accordion>
                <Panel v-for="(item,index) in fieldData" :key='index' :name="'open'+index">
                    {{item.field_name}}
                    <Row slot="content" v-if='openPage == `open${index}`'>
                        <Col span='12' v-for="(ele,num) in item.fieldList" :key='num'>
                            <FormItem :label="ele.field_name">
                                <Col span='16'>
                                    <Input v-if="item.field_type == 1 || item.field_type == 13 || item.field_type == 14" size="small" v-model.lazy="item.field_value" :disabled='item.disable_flag==1' style="width:80%"></Input>

                                    <Input v-else-if="item.field_type==2"  v-model.lazy="item.field_value" type="textarea" :rows="3" :disabled='item.disable_flag==1'  style="width:94%"></Input>

                                    <Select v-else-if="item.field_type==3 || item.field_type==4"  size="small" :clearable='item.disable_flag!=1' :multiple='item.field_type==4'  filterable  v-model.lazy="item.field_value" :disabled='item.disable_flag==1' @on-change="selectbankname(item)"  style="width:80%" label-in-value>
                                        <Option  v-for='(selectItem,selectIndex) in item.codelist' :key=" selectIndex+ Math.random()" :value="selectItem.key" >{{selectItem.name}}</Option>
                                    </Select>
                                </Col>
                            </FormItem>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </Form>
    </div>
</template>
<script src='./index.js'></script>
