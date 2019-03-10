<template>
    <div>
        <g-pager :total-page="20" :current-page="3"></g-pager>
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
            }
        },
        created(){

        },
        methods:{
            onChange(selected){
                if(selected ==='home'){
                    alert('hi')
                }
            },
        }
    }
</script>

<style scoped>
    *{margin:0;padding:0;box-sizing:border-box;}
</style>