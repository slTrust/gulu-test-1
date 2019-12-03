<template>
    <div style="margin:20px;">
        <d-jsx></d-jsx>
        {{selected}}
        <g-table :columns="columns"
                 :data-source="dataSource"
                 :order-by.sync="orderBy"
                 borderd
                 @update:orderBy="x"
                 :loading="loading"
                 :height="400"
                 expend-field="description"
                 checkable
                 :selected-items.sync="selected">
            <template slot-scope="xxx">
                <!--
                slot-scope="xxx"
                就是 slot里传递的属性 xxx.item
                -->
                <button @click="edit(xxx.item)">编辑</button>
                <button @click="view(xxx.item)">查看</button>
            </template>
        </g-table>
        <g-table :columns="columns" :data-source="dataSource" borderd></g-table>
        <!--<g-table :columns="columns" :data-source="dataSource" :striped="false"></g-table>-->
    </div>
</template>

<script>
    import DJsx from './demo-jsx'
    import GTable from './table-pro';

    export default {
        components:{
            GTable,DJsx
        },
        data(){
            return {
                loading:false,
                selected:[],
                columns:[
                    {text:'姓名',field:'name',sort:'asc',width:100},
                    {text:'分数',field:'score',sort:'desc'},
                ],
                orderBy:{ // true 开启排序， 但是不确定 asc desc
                    name:true,
                    score:'desc'
                },
                dataSource:[
                    {id:1,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:2,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:3,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:4,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:5,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:6,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:7,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:8,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:9,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:10,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:11,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:12,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:13,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:14,name:'李四',score:99,description:'xxxx xxxx'},
                    {id:15,name:'王五',score:100,description:'xxxx xxxx'},
                    {id:16,name:'赵六',score:99,description:'xxxx xxxx'},
                    {id:17,name:'张三',score:100,description:'xxxx xxxx'},
                    {id:18,name:'李四',score:99,description:'xxxx xxxx'},
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
                    this.dataSource = this.dataSource.sort((a,b)=> a.score - b.score)
                    this.loading = false;
                },1000)
                // 我们模拟一下
            },
            edit(item){
                alert(`开始编辑${item.id}`)
            },
            view(item){
                alert(`开始查看${item.id}`)
            }
        }
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
</style>