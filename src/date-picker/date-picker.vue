<template>
    <div class="gulu-date-picker" style="border:1px solid red;" ref="wrapper">
        <g-popover position="bottom" :container="popoverContainer">
            <template>
                <g-input></g-input>
            </template>
            <template slot="content">
                <div class="gulu-date-picker-pop">
                    <div class="gulu-date-picker-nav">
                        <span :class="c('prevYear', 'navItem')">
                            <g-icon name="left-left"></g-icon>
                        </span>
                        <span :class="c('prevMonth', 'navItem')">
                            <g-icon name="left"></g-icon>
                        </span>
                        <span :class="c('yearAndMonth')" @click="onClickMonth">
                            <span @click="onClickYear">2018年</span>
                            <span @click="onClickMonth">12月</span>
                        </span>
                        <span :class="c('nextMonth', 'navItem')">
                            <g-icon name="right"></g-icon>
                        </span>
                        <span :class="c('nextYear', 'navItem')">
                            <g-icon name="right-right"></g-icon>
                        </span>
                    </div>
                    <div class="gulu-date-picker-panels">
                        <div v-if="mode===`years` "class="gulu-date-picker-content">年视图</div>
                        <div v-else-if="mode===`months`" class="gulu-date-picker-content">月视图</div>
                        <div v-else="mode===`days`" class="gulu-date-picker-content">
                            <!-- weekDay -->
                            <div :class="c('weekdays')">
                                <span :class="c('weekday')" v-for="i in [1,2,3,4,5,6,0]" :key="i">{{weekdays[i]}}</span>
                            </div>
                            <div :class="c('row')" v-for="i in helper.range(1, 7)" :key="i">
                                <span
                                        :class="c('cell')"
                                        v-for="j in helper.range(1,8)"
                                        :key="j"
                                >
                                    {{visibleDays[((i - 1) * 7)+ (j-1)].getDate()}}
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
                popoverContainer: null,
                weekdays: ["日", "一", "二", "三", "四", "五", "六"],
                value:new Date()
            }
        },
        mounted(){
            this.popoverContainer = this.$refs.wrapper;
        },
        methods:{
            c(...classNames) {
                return classNames.map(className => `gulu-date-picker-${className}`);
            },
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
                // let array_s = array.map(item=>`${item.getFullYear()}-${item.getMonth()+1}-${item.getDate()}`)
                // console.log(array_s)
                return array;
            },
        }
    }
</script>

<style scoped lang="scss">
@import "var";
.gulu-date-picker{
    &-nav {
    }
    &-popWrapper {
        padding: 0;
    }
    &-navItem,
    &-cell,
    &-weekday {
        width: 32px;
        height: 32px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    &-nav {
        display: flex;
    }
    &-yearAndMonth {
        margin: auto;
    }


    /deep/ .gulu-popover-content-wrapper {
        padding: 0;
    }
}
</style>