<template>
    <button class="gulu-button" :class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')">
        <g-icon v-if="icon && !loading" class="icon" :name="icon"></g-icon>
        <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>

<script>
    import Icon from '../icon'
    export default {
        name:'GuluButton',
        components:{
            'g-icon': Icon
        },
        // props:['icon','iconPosition']
        props:{
            icon:{},
            loading:{
                type : Boolean,
                default : false
            },
            iconPosition:{
                type:String,
                default:'left',
                validator(value){
                    return value === 'left' || value === 'right';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .gulu-button{
        font-size:$font-size;
        height: $button-height;
        padding:0 1em;
        border-radius:$border-radius;
        border:1px solid $border-color;
        background: $button-bg;
        justify-content: center;
        align-items: center;
        display:inline-flex;
        vertical-align: middle;
        &:hover{border-color: $border-color-hover;}
        &:active{background-color: $button-active-bg;}
        &:focus{outline: none;}

        > .icon{order:1; margin-right:.1em;}
        > .content{order:2;}
        &.icon-right{
            > .icon{order:2; margin-left:.1em;margin-right:0;}
            > .content{order:1;}
        }

        .loading{
            @include spin
        }
        & + & {
            margin-left: 4px;
        }
    }

</style>