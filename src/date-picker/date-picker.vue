<template>
    <div style="border:1px solid red;">
        <g-popover position="bottom">
            <template>
                <g-input></g-input>
                {{mode}}
            </template>
            <template slot="content">
                <div class="gulu-date-picker-pop">
                    <div class="gulu-date-picker-nav">
                        <span><g-icon name="left"></g-icon></span>
                        <span><g-icon name="left"></g-icon></span>
                        <span @click="onClickYear">2018年</span>
                        <span @click="onClickMonth">12月</span>
                        <span><g-icon name="right"></g-icon></span>
                        <span><g-icon name="right"></g-icon></span>
                    </div>
                    <div class="gulu-date-picker-panels">
                        <div v-if="mode===`years`"class="gulu-date-picker-content">年视图</div>
                        <div v-else-if="mode===`months`" class="gulu-date-picker-content">月视图</div>
                        <div v-else="mode===`days`" class="gulu-date-picker-content">
                            <!-- weekDay -->
                            <div>
                                <span v-for="i in [1,2,3,4,5,6,0]" :key="i">{{i}}</span>
                            </div>
                            <div v-for="i in helper.range(1, 7)" :key="i">
                                <span
                                        v-for="j in helper.range(1,8)"
                                        :key="j"
                                >
                                    {{visibleDays[((i - 1) * 7)+ (j-1)]}}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="gulu-date-picker-actions"></div>
                </div>
            </template>
        </g-popover>

    </div>
</template>

<script>
    import GInput from "../input";
    import GIcon from "../icon";
    import ClickOutside from "../click-outside";
    import GPopover from "../popover";
    import helper from "./helper";

    export default {
        name: "GuluDatePicker",
        components:{
            GInput, GIcon, GPopover
        },
        directives: { ClickOutside },
        data(){
            return {
                mode:'days', // days months years
                helper: helper, // FIXME helper 放这里不好
                value:new Date()
            }
        },
        mounted(){

            console.log(this.visibleDays);
        },
        methods:{
            onClickYear(){
                this.mode = 'years';
            },
            onClickMonth(){
                this.mode = 'months'
            }
        },
        computed:{
            visibleDays() {
                let date = this.value;
                let first = helper.firstDayOfMonth(date);
                let last = helper.lastDayOfMonth(date);
                let array = [];
                let [year,month,day] = helper.getYearMonthDate(date);
                // 本月前面补充的上个月-月末 根据本月第一天是周几 如果是周一就不补充
                // 注意 0 是周末 1 是周一
                let weekDay = first.getDay();
                let startDay = first - (weekDay === 0 ? 6 : weekDay - 1) * 3600 * 24 * 1000;
                for (let i = 0; i < 42; i++) {
                    array.push(new Date(startDay + i * 3600 * 24 * 1000));
                }
                let array_s = array.map(item=>`${item.getFullYear()}-${item.getMonth()+1}-${item.getDate()}`)
                console.log(array_s)
                return array;
            },
        }

    }
</script>

<style scoped lang="scss">

</style>