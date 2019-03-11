<template>
    <div style="margin:20px;">
        {{selected}}
        <g-table :columns="columns" :data-source="dataSource" borderd compact :selected-items.sync="selected"></g-table>
        <g-table :columns="columns" :data-source="dataSource" borderd></g-table>
        <g-table :columns="columns" :data-source="dataSource" :striped="false"></g-table>
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
                selected:[],
                columns:[
                    {text:'姓名',field:'name'},
                    {text:'分数',field:'score'},
                ],
                dataSource:[
                    {id:1,name:'张三',score:100},
                    {id:2,name:'李四',score:99},
                    {id:3,name:'王五',score:100},
                    {id:4,name:'赵六',score:99},
                ]
            }
        },
        methods:{
        }
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
</style>