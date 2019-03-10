<template>
    <div class="gulu-pager">
        <span class="gulu-pager-nav prev" :class="{disabled:currentPage===1}">
            <g-icon name="left"></g-icon>
        </span>
        <template v-for="page in pages">
            <template v-if="page===currentPage">
                <span class="gulu-pager-item current">{{page}}</span>
            </template>
            <template v-else-if="page==='...'">
                <g-icon class="gulu-pager-separator" name="dots"></g-icon>
            </template>
            <template v-else>
                <span class="gulu-pager-item other">{{page}}</span>
            </template>
        </template>
        <span class="gulu-pager-nav next" :class="{disabled:currentPage===totalPage}">
            <g-icon name="right"></g-icon>
        </span>
    </div>
</template>

<script>
    import GIcon from './icon'
    export default {
        name: "GuluPager",
        components:{GIcon},
        props:{
            totalPage:{
                type:Number,
                required:true,
            },
            currentPage:{
                type:Number,
                required:true
            },
            hideIfOnePage:{
                type:Boolean,
                default:true
            }
        },
        data(){
            let pages = [1,this.totalPage,
                this.currentPage,
                this.currentPage - 1, this.currentPage - 2 ,
                this.currentPage + 1 ,this.currentPage + 2
            ].filter((n)=> n>=1 && n<= this.totalPage);

            let u = unique(pages.sort((a,b)=> a-b))
            let u2 = u.reduce((prev,current,index,array)=>{
                prev.push(current)
                array[index + 1] !== undefined && array[index + 1] - array[index] > 1 && prev.push('...')
                return prev
            },[])
            return {
                pages:u2
            }
        }
    }

    // 去重
    function unique(array) {
        // array = [1,1,2,3,5,20]
        // return [... new Set(array)] 兼容性太差
        const object = {}
        array.map((number)=>{
            object[number] = true
        })
        return Object.keys(object).map((s)=>parseInt(s))

    }
</script>

<style scoped lang="scss">
    @import 'var';
    .gulu-pager{
        $height:20px;
        $width:20px;
        $font-size: 12px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &-separator{
            width:$width;
            font-size: $font-size;
        }
        &-item{
            border:1px solid #e1e1e1;
            border-radius: $border-radius;
            padding:0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: $font-size;
            min-width: $width;
            height: $height;
            margin:0 4px;
            cursor:pointer;
            &.current,&:hover{
                border-color:$blue;
            }
            &.current{
                cursor:default;
            }
        }
        &-nav{
            margin:0 4px;
            display:inline-flex;
            justify-content: center;
            align-items: center;
            background: $grey;
            width: $width;
            height: $height;
            border-radius: $border-radius;
            font-size: $font-size;
            &.disabled{
                svg{
                    fill: darken($grey,30%);
                }
            }
        }
    }
</style>