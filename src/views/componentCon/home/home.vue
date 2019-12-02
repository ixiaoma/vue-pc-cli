<template>
    <div>
       <Form label-position="left" :label-width="260">
            <Scroll :on-reach-bottom="handleReachEdge">
                <Col span='12' v-for="(ele,num) in fieldList" :key='num'>
                    <FormItem :label="ele.field_name">
                        <Col span='16'>
                            <Input size='small' v-model.trim="ele.field_value"></Input>
                        </Col>
                    </FormItem>
                </Col>
            </Scroll>
        </Form>
    </div>
</template>
<script>
// import listData from '@/libs/addlist.json'
export default {
    title:'首页',
    name:'home_index',
    data(){
        return{
            fieldList:[]
        }
    },
    methods:{
        handleReachEdge(){
            console.log('bottom')
        }
    },
    created(){
        this.fieldList = listData.splice(0,50)
    }
}
</script>
<style>
.ivu-scroll-container{
    height: 100%!important;
}
</style>

