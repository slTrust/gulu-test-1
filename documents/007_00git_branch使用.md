### git branch 是啥

如果不搞 分支 假如项目完成20多个轮子，你看代码瞬间懵逼。

![](https://raw.githubusercontent.com/slTrust/note/master/gulu/g07_01.png)

> 我们上次的提交是 v-model

- HEAD 代表当前最新的一次提交的位置

#### 需求：以后能单独看到 当前提交的代码，与正常的迭代分离

- 开分支 branch1 (这样 当前v-model阶段的代码 就留在这里) 你继续在master上写
- 此时在提交 已经超过了 branch1 这个分支，但是 branch1还停留在 v-model那个阶段

> 实际操作

```
# 新建分支
git branch button-and-input
# 此时宇宙一分为二 master 和 button-and-input
# 而且你还在 master 分支上

# 查看所有分支
git branch
``` 

> 增加新的提交

```
src/下新增
row.vue
col.vue

-------------------
git add .
git commit -m 'add row and col'
```

> ##### 此时 分支 button-and-input 还在你的本地

推送分支到远程

```
git push origin button-and-input:button-and-input

语法
git push origin 分支名xxx:分支名xxx
``` 

