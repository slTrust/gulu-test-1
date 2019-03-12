<template>
    <div style="margin:20px;">
        {{selected}}
        <g-table :columns="columns"
                 :data-source="dataSource"
                 :order-by.sync="orderBy"
                 borderd
                 compact
                 @update:orderBy="x"
                 :loading="loading"
                 height="400px"
                 :selected-items.sync="selected"></g-table>
        <!--<g-table :columns="columns" :data-source="dataSource" borderd></g-table>-->
        <!--<g-table :columns="columns" :data-source="dataSource" :striped="false"></g-table>-->
    </div>
</template>

<script>
    import GTable from './table';

    export default {
        components:{
            GTable
        },
        data(){
            return {
                loading:false,
                selected:[],
                columns:[
                    {text:'姓名',field:'name',sort:'asc'},
                    {text:'分数',field:'score',sort:'desc'},
                ],
                orderBy:{ // true 开启排序， 但是不确定 asc desc
                    name:true,
                    score:'desc'
                },
                dataSource:[
                    {id:1,name:'张三',score:100},
                    {id:2,name:'李四',score:99},
                    {id:3,name:'王五',score:100},
                    {id:4,name:'赵六',score:99},
                    {id:5,name:'张三',score:100},
                    {id:6,name:'李四',score:99},
                    {id:7,name:'王五',score:100},
                    {id:8,name:'赵六',score:99},
                    {id:9,name:'张三',score:100},
                    {id:10,name:'李四',score:99},
                    {id:11,name:'王五',score:100},
                    {id:12,name:'赵六',score:99},
                    {id:13,name:'张三',score:100},
                    {id:14,name:'李四',score:99},
                    {id:15,name:'王五',score:100},
                    {id:16,name:'赵六',score:99},
                    {id:17,name:'张三',score:100},
                    {id:18,name:'李四',score:99},
                ]
            }
        },
        methods:{
            x(value){
                // 监听排序事件
                // api/users?score='desc'
                // ajax(url,orderBy).then(
                //     (res)=>{
                //         this.dataSource = res.data
                //     }
                // )

                console.log(value);
                this.loading = true
                setTimeout(()=>{
                    this.dataSource = this.dataSource.sort((a,b)=>a.score - b.score)
                    this.loading = false;
                },2000)
                // 我们模拟一下
            }
        }
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
</style>