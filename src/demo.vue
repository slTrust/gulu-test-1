<template>
    <div>
        {{selected}}
        <hr>
        <p>{{selected && selected[0] && selected[0].name || '空'}}</p>
        <p>{{selected && selected[1] && selected[1].name || '空'}}</p>
        <p>{{selected && selected[2] && selected[2].name || '空'}}</p>
        <div style="padding:20px;">
            <g-cascader :source="source" popover-height="200px"
                        :selected="selected" :level="0"
                        @update:selected="selected = $event"
            ></g-cascader>
        </div>

    </div>
</template>

<script>
    import Cascader from './cascader';
    import db from './db'

    function ajax(parentId=0){
        return db.filter((item)=>item.parent_id==parentId)
    }
    console.log(ajax());
    export default {
        name: "demo",
        components:{
            'g-cascader':Cascader
        },
        data(){
            return {
                selected:[],
                source:ajax()
            }
        }
    }
</script>

<style scoped>
    *{margin:0;padding:0;box-sizing: border-box;}
    img{max-width: 100%;}
    :root{
        --button-height:32px;
    }
    body{
        font-style: var(--font-size);
    }
</style>