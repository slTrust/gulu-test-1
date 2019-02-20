### 改用vue-cli

- 先用的webpack4 失败
- 改用 vue-cli 构建项目

1. 安装 vue-cli
    ```
    npm install -g @vue/cli@3
    或
    yarn global add @vue/cli
    ```
2. 创建 hello-world
    ```
    vue create hello-world
    
    选项如下：

     Vue CLI v3.0.0
     ? Please pick a preset:
         default (babel, eslint)
         ❯ Manually select features
     ? Check the features needed for your project:
         ◉ Babel
         ◯ TypeScript
         ◯ Progressive Web App (PWA) Support
         ◯ Router
         ◯ Vuex
         ◉ CSS Pre-processors
         ❯◯ Linter / Formatter
         ◉ Unit Testing
         ◯ E2E Testing
     ? Pick a CSS pre-processor 
         ❯ SCSS/SASS
         LESS
         Stylus
     ? Pick a unit testing solution:
         ❯ Mocha + Chai
         Jest
     ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.?
         In dedicated config files
         ❯ In package.json
     ? Save this as a preset for future projects? (y/N) n
     ```

3. 将 hello-world 的 package.json 和 babel.config.js 拷贝到你的项目

4. 回到你的项目，新建 src/main.js
    ```
     import Vue from "vue";
     import Demo from "./demo.vue";
    
     Vue.config.productionTip = false;
    
     new Vue({
     render: h => h(Demo)
     }).$mount("#app");
    ```

5. 创建 src/demo.vue，在 src/demo.vue 里面使用你自己的组件
6. 运行 yarn serve 即可开始开发
7. 完成
