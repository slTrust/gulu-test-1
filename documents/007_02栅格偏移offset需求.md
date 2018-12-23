### offset需求

```
 <g-row>
    <g-col span="2">1</g-col>
    <g-col span="20">2</g-col>
</g-row>

总共24份 
第一个col 2份
第二个col 20份

此时这一行后面会空出 2份
```

> 需求是 第一个col 和 第二个 col之间空出 两份

- 第二个col 距离左边 2份

```
<template>
    <div class="col" :class="[`col-${span}`,offset && `offset-${offset}`]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluCol",
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[Number,String]
            }
        }
    }
</script>

<style scoped lang="scss">
    .col{
        height: 100px;
        background: grey;
        width:50%;
        border:1px solid red;
    }

    $class-prefix: col-;

    @for $n from 1 through 24 {

        &.#{$class-prefix}#{$n} {
            width:($n/24) * 100%;
        }
    }

    $class-prefix: offset-;

    @for $n from 1 through 24 {

        &.#{$class-prefix}#{$n} {
            margin-left:($n/24) * 100%;
        }
    }
</style>


:class 里 offset && `offset-${offset}` 
如果不传递 offset 就会导致 offset-undefined
```

```
<g-row>
    <g-col span="2">4</g-col>
    <g-col span="20" offset="2">20</g-col>
</g-row>
```