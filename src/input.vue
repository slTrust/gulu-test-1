<template>
    <div class="wrapper" :class="{error}">
        <input :value="value" type="text" :disabled="disabled" :readonly="readonly"
               @change="$emit('change',$event.target.value)"
               @input="$emit('input',$event.target.value)"
               @focus="$emit('focus',$event.target.value)"
               @blur="$emit('blur',$event.target.value)"
        >
        <template v-if="error">
            <g-icon name="error" class="icon-error"></g-icon>
            <span class="errorMessage">{{error}}</span>
        </template>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        name:'GuluInput',
        components:{
            'g-icon':Icon
        },
        props:{
            value:{
                type:String
            },
            disabled:{
                type:Boolean,
                default:false
            },
            readonly:{
                type:Boolean,
                default: false
            },
            error:{
                type:String
            }

        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .wrapper{
        display: inline-flex;font-size: $font-size;
        align-items: center;justify-content: center;
        > :not(:last-child){margin-right: .5em;}
        > input{
            height: $height;border:1px solid $border-color;border-radius: $border-radius;padding:0 8px;font-size: inherit;
            &:hover{border-color:$border-color-hover;}
            &:focus{box-shadow: inset 0 1px 3px $box-shadow-color;outline: none;}
            &[disabled],&[readonly]{color: #bbb;border-color : #bbb;cursor:not-allowed}
        }
        &.error{
            > input{border-color: $red;}
        }
        .icon-error{fill:$red;}
        .errorMessage{color:$red;}
    }
</style>