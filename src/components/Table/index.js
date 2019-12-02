// import listData from '@/libs/addlist.json'
export default {
    data () {
        return {
            fieldData:[],
            openPage:'open0'
        }
    },
    created(){
        let arr = []
        listData.forEach(ele=>{
            if(ele.field_type == 12){
                ele.fieldList = []
                arr.push(ele)
            }else{
                arr[arr.length-1].fieldList.push(ele)
            }
        })
        this.fieldData = arr
    }
}