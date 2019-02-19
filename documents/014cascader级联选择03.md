#### scss用法

var.scss

```
$border-color-hover:#666;
$border-color:#999;
$border-radius:4px;
$box-shadow-color:rgba(0,0,0,0.5);
$button-active-bg:#eee;
$button-bg:white;
$button-height:32px;
$color:#333;
$font-size:14px;
$height:32px;
$input-height:32px;
$red:#F1453D;
.box-shadow{
  box-shadow: 0 0 5px rgba(0,0,0,0.15);
}
```

> #### 继承的用法 extend

```
.right{
    @extend .box-shadow;
}

.left{
    @extend .box-shadow;
}
```

> #### minxin用法

- 缺陷每次 minxin都会把scss里的内容复制一份

```
@mixin box-shadow2(){
    box-shadow:0 0 5px rgba(0,0,0,0.15)
}

.right{
    @include box-shadow2;
}

.left{
    @include box-shadow2;
}
```

#### lighten函数 颜色控制

```
$border-color:#999;
$border-color-light:lighten($border-color,25%);
```

#### 此时出现一个问题 parcel渲染 scss突然变慢

- 想屎的感觉。。。

#### 命令行翻墙

- [https://jscode.me/](https://jscode.me/)
- [命令行翻墙](https://jscode.me/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%BF%BB%E5%A2%99)