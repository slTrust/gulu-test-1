### 引入 持续集成的icon

https://travis-ci.org

```
登录后选择你的项目
然后main区域 点击 build按钮
选择markdown 就给你一个链接地址
如下
[![Build Status](https://www.travis-ci.org/slTrust/gulu-test-1.svg?branch=master)](https://www.travis-ci.org/slTrust/gulu-test-1)
```

各种标的网址

shields.io


#### css兼容性

https://caniuse.com


#### 解决 g-icon里 svg问题

```
把 svg的js下载到本地
<script src="//at.alicdn.com/t/font_974904_ushycxf2p1b.js"></script>
然后在icon.vue里引入
import './svg'

重新 运行
npx parcel --no-cache
成功后打开 localhost:1234
遇到了问题。。。。 提示找不到页面

一定记住 出现问题
先提交代码这样代码就不会消失
```


