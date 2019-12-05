<template>
    <div style="padding:100px">
       <g-date-picker :value="d" @input="d = $event"></g-date-picker>
    </div>
</template>

<script>
    import GDatePicker from './date-picker/date-picker';

    export default {
        components:{
            GDatePicker
        },
        data(){
            return {
                d: new Date(),
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