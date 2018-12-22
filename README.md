# 轱辘 - 一个 Vue UI 组件

[![Build Status](https://www.travis-ci.org/slTrust/gulu-test-1.svg?branch=master)](https://www.travis-ci.org/slTrust/gulu-test-1)

## 介绍

这是我在学习 Vue 过程中做的一个 UI 框架，希望对你有用。

## 开始使用

1. 添加 CSS 样式

    使用本框架前，请在 CSS 中 开启 border-box
    
    ```
    *{box-sizing: border-box;}
    ```
    
    IE8 及以上浏览器支持此样式
    
    你还需要设置默认颜色变量(后续会改为 SCSS 变量)
    
    ```
    html{
        --button-height:32px;
        --font-size:14px;
        --button-bg:white;
        --button-active-bg:#eee;
        --border-radius:4px;
        --color:#333;
        --border-color:#999;
        --border-color-hover:#666;
    }
    
    IE15 及以上浏览器支持此样式
    ```
    
 2. 安装 gulu 
 
 ```
 npm i -S gulu-test-0-1
 或
 yarn add gulu-test-0-1
 ```
 
 3. 引入gulu
 
 ```
 import {Button,ButtonGroup,Icon} from 'gulu-test-0-1'
 import 'gulu-test-0-1/dist/index.css'

 export default {
   name: 'app',
   components: {
     HelloWorld,
     'g-button':Button,
     'g-icon':Icon,
     'g-button-group':ButtonGroup
   }
 }
 ```
 


## 文档

## 安装

## 提问

## 变更记录


## 联系方式

## 贡献代码




