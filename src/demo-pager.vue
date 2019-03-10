<template>
    <div>
        <g-pager :total-page="20" :current-page.sync="currentPage"></g-pager>

        <h3>仅有一页也要显示</h3>
        <g-pager :total-page="1" :current-page.sync="currentPage" :hide-if-one-page="false"></g-pager>


    </div>
</template>

<script>
    import GPager from './pager';

    export default {
        components:{
            GPager
        },
        data(){
            return {
                currentPage:1
            }
        },
        created(){

        },
        methods:{
        }
    }
</script>

<style>
    *{margin:0;padding:0;box-sizing:border-box;}
</style>