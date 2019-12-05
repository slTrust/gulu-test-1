<template>
    <div style="padding:100px">
       <g-date-picker :value="d" @input="d = $event"></g-date-picker>

        <div style="height: 200px;"></div>
        <g-date-picker-t :value="d" @input="d = $event"></g-date-picker-t>
    </div>
</template>

<script>
    import GDatePickerT from './date-picker/date-picker-t';

    import GDatePicker from './date-picker/date-picker';

    export default {
        components:{
            GDatePicker,
            GDatePickerT
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