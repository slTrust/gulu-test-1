### 记不记得之前 btn.spec.js 里有几个没有测试

```
xit('设置 iconPosition 可以改变 order', () => {
    const wrapper = mount(Button,{
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    });
    const vm = wrapper.vm;
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('2')
})
```

- 把 xit 换成 it 结果 expected undefined to equal '1'


### 我们只有打开浏览器才能测试 css

- karma

1. 新建 karma.conf.js
    ```
    var webpackConfig = require('@vue/cli-service/webpack.config.js')
    
    module.exports = function (config) {
      config.set({
        frameworks: ['mocha'],
    
        files: [
          'tests/**/*.spec.js'
        ],
    
        preprocessors: {
          '**/*.spec.js': ['webpack', 'sourcemap']
        },
    
        webpack: webpackConfig,
    
        reporters: ['spec'],
        autoWatch: true,
    
        browsers: ['ChromeHeadless']
      })
    }
    ```
    
2. 安装依赖
    ```
    yarn add -D karma karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack chai sinon sinon-chai
    ```
3. 改写package.json
    ```
    "scripts": {
          ...
        "test": "karma start --single-run",
        "test:unit": "karma start",
        "test:unit:old": "vue-cli-service test:unit",
        ...
    },
    ```
    
4. 运行 
    ```
    npx karma start --single-run
    ```
    
> 参考 https://cli.vuejs.org/zh

- 开发-webpack相关-[审查项目的-webpack-配置](https://cli.vuejs.org/zh/guide/webpack.html#%E5%AE%A1%E6%9F%A5%E9%A1%B9%E7%9B%AE%E7%9A%84-webpack-%E9%85%8D%E7%BD%AE)

有些外部工具可能需要通过一个文件访问解析好的 webpack 配置，比如那些需要提供 webpack 配置路径的 IDE 或 CLI。在这种情况下你可以使用如下路径：


