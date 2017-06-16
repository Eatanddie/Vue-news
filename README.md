# Vue.js写的一个移动端新闻
刚学Vue，就自己动手撸了一个项目，项目可能不成熟，请大家多提意见

## 预览图
![](http://opu73ixj7.bkt.clouddn.com/GIF.gif)

## 技术栈
**Vue2**：采用最新Vue2的语法

**Vuex**：状态管理，实现不同组件之间的状态共享

**vue-router**：路由管理，实现路由的跳转

**axios**：发起http请求

**Express**：处理跨域请求问题

**Webpack**：自动化构建工具，大部分配置vue-cli脚手架已经弄好了，很方便

**淘宝flexible**：通过改变font-size,利用rem解决移动端适配问题

## 使用 Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 遇到的问题
* 布局问题：在做项目之前，应该构思好大致的布局结构，各个组件的结构设计与联系要想好，本人做这个项目就是布局出了问题，导致后面要修改一大堆的东西，这个            项目也是重做了两次。
* 异步编程问题：本项目使用了极速数据的API，后端的API编写也要解决请求数据的异步问题，JS实现异步的方法有`回调`、`Generator`、`Promise`、`Async`。
               回调层次多了，有回调地狱问题，代码的重用性、可观性不好；Generator需要手动执行（`co`模块可解决），相比之下，`Promise`和`Async`是比                较理想的。
* 
