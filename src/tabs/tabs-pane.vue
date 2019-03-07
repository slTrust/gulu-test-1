<template>
    <div class="tabs-pane" :class="classes" v-if="active">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluTabsPane",
        inject:['eventBus'],
        data(){
            return {
                active:false // 激活的 tab
            }
        },
        props:{
            name:{
                type:String|Number,
                default:true
            }
        },
        computed:{
            classes(){
                return {
                    active:this.active
                }
            }
        },
        created: function () {
            this.eventBus.$on('update:selected', (name) => {
                this.active = name == this.name;
            })
        },

    }
</script>

<style scoped lang="scss">
    .tabs-pane{
        padding:1em;
        &.active{
        }
    }
</style>