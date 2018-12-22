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

> 排查问题

- 一定记住:出现问题先提交代码这样代码就不会消失
- 一定记住:出现问题先提交代码这样代码就不会消失
- 一定记住:出现问题先提交代码这样代码就不会消失

```
git log 查看所有提交改动  
然后重置版本 到对面的 commit id

回到前一次的改动 排查
git reset --hard 11d7f0a1cd794c8fef7e1393003632ea6df58c98

经过版本回归 
我们发现在 xxx版本的时候我们添加了 一个 index.js
```

> nodejs的坑


```
npx parcel 的时候 首先会去找 index.js
相当于 npx parcel index.js

我们回到我们之前最后一次 commit
git reset --hard xxxx版本号

重新运行命令

npx parcel index.html --no-cache
```

#### 分析我们的排错过程

比如代码每次提交 都有版本

- A版本
- B版本
- C版本

```
1。 C不能运行
2。 A能运行
3。 git reset --hard A
4。 二分法 (A+C)/2的位置 来试试行不行 最终锁定某一版本导致的问题
5。 B造成了问题 
6。 对比 A 和 B  git show B

```


