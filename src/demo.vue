<template>
    <div>
        <!--{{selected}}-->
        <hr>
        <!--<p>{{selected && selected[0] && selected[0].name || '空'}}</p>-->
        <!--<p>{{selected && selected[1] && selected[1].name || '空'}}</p>-->
        <!--<p>{{selected && selected[2] && selected[2].name || '空'}}</p>-->
        <div style="padding:20px;">
            <g-cascader :source.sync="source" popover-height="200px"
                        :selected.sync="selected"
                        @update:selected="xxx"
                        :loadData="loadData"
            ></g-cascader>
        </div>

    </div>
</template>

<script>
    import Cascader from './cascader';
    import db from './db'

    function ajax(parentId=0,success,fail){
        let result = db.filter((item)=>item.parent_id==parentId)
        let id = setTimeout(()=>{
            success(result)
        },300)
        return id;
    }

    function ajax2(parentId=0){
        return new Promise((success,fail)=>{
            setTimeout(()=>{
                let result =  db.filter((item)=>item.parent_id==parentId)
                result.forEach(node=>{
                    if(db.filter(item=>item.parent_id === node.id).length > 0){
                        node.isLeaf = false
                    }else{
                        node.isLeaf = true
                    }
                })
                success(result);
            },300)

        })

    }

    export default {
        name: "demo",
        components:{
            'g-cascader':Cascader
        },
        data(){
            return {
                selected:[],
                source:[]
            }
        },
        created(){
            ajax2(0).then((result)=>{
                console.log(result)
                this.source = result
            })

            /*
            // promise 版
            ajax2(0).then((result)=>{
                this.source = result
            })
            */
        },
        methods:{
            xxx(){
                console.log(this.selected)
                ajax2(this.selected[0].id).then(res=>{
                    let lastLevelSelected = this.source.filter(item=>item.id === this.selected[0].id)[0]
                    // lastLevelSelected.children = res;
                    this.$set(lastLevelSelected,'children',res)
                })
            },
            loadData(node,callback){
                let {id,name,parent_id} = node;
                ajax2(id).then(res=>{
                    callback(res)
                })
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