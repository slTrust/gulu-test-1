### datepicker 的需求

> 参考同行

- [iview](https://www.iviewui.com/)
- [ant-design](https://ant.design/)

> 需求

- 选日期
    - 默认日期
    - 今天高亮
    - 清除
- 选两个日期
- 选年
- 选月

API

```
<g-date-picker @update:value> 选择一个日期
<g-daterange-picker v-model="value"> 选择一段时间
<g-month-picker> 选择一个月
<g-year-picker> 选择一年
```

#### 分析展示的日期

- 为什么是6行
- 因为有的月刚好1号是周一 如果是这个月30天 刚好显示5行，这样日期控件就会上下抖动了。
- 所以显示 6行 刚好不会又超过7行的可能

> 本月第一天

```
let date = new Date(2018,0,31); // 2018-01-31
let firstDate = date.setDate(1); // 2018-01-01  没问题
```

> #### 一个日期的bug

- 本月第一天是没问题的，但是 本月最后一天是有问题的
    - 你肯定这样想 `date.setMonth(date.getMonth()+1) 设置成 +1月` 但是一定会月份加一吗？
        -

```
// 获取这个月最后一天
let date = new Date(2018,0,31); // 2018-01-31
date.setMonth(date.getMonth()+1)
let lastDate = date.setDate(0)
console.log(lastDate) // 2018-02-28 而 我们想要的是 2018-01-31
```

**原因是 month + 1 在 js理解 就是 `当前日期加上 x 天 x = 当月天数`**

**秘诀就是**

- 把当前日期回拨 到 **28号及以前**，因为 这样无论怎么加都不会超过一个月的最少天数

```
let date = new Date(2018,0,31); // 2018-01-31
date.setDate(28)
date.setMonth(date.getMonth()+1)
let lastDate = date.setDate(0)
```

> 显示的日期为42个，有很多思路

- 拿到当月的所有日期
  - 判断本月第一天是周几
    - 如果是周一 前面不补充，后面补充下个月的 n 天 (n = 42 - 本月天数)
    - 如果不是周一 前面补充 上月的 x 天(x = 本月第一天是周几 - 1) ,注意getDay()时候周末是0， 同时 后面补充下个月的 y天 (y=42 - 本月天数 - x)
- 拿到本月第一天，判断它的第一天是周几，然后找到 展示日期的第一行第一列的那一天
    - 通过 for 循环 遍历 它到他后面的 41 天
    ```
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
    }
    ```

> #### 跨越组件加样式

我们的 popover组件有padding但是 date-picker里 我们不想要这个padding

- `/deep/ 选择器{ ... }` 跨越组件加样式

```
/deep/ .gulu-popover-content-wrapper {
    padding: 0;
}
```


#### 踩了两个坑

- 在 vue标签上是无法直接把 ref 传递过去的
    - 我们通过定义 data 里的 popoverContainer
    - 在 mounted的时候 进行赋值`this.popoverContainer = this.$refs.wrapper;`
- 由于我们用了 scoped 的样式添加样式非常麻烦，我们用到了 `/deep/` 来跨越组件添加样式
