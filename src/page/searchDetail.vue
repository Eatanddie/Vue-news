<template lang="html">
  <div class="detail">
    <div class="header">
      <img src="../assets/back.png" @click="goback">
      <span>搜索新闻</span>
    </div>
    <div class="content">
      <div class="container">
        <!-- <div class="title">{{$route.params.item.title}}</div> 给路由传参的写法 -->
        <div class="title">{{$route.params.item && $route.params.item.title}}</div>
        <div class="message">
          <span>{{$route.params.item && $route.params.item.time || '2017-06-07 12:00'}}</span>
          <span>{{$route.params.item && $route.params.item.src || '爱新闻'}}</span>
        </div>
        <!-- <img :src="$route.params.item.pic || require('../assets/tongyong.jpg')"> -->
        <div class="newsContent" v-html="$route.params.item && $route.params.item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.back(1)
    }
  }
}
</script>

<style lang="css" scoped>
.detail {
  overflow: hidden;
}
.header {
  width: 100%;
  height: 1.33rem;
  background-color: #d43d3d;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
}
.header img {
  width: 25px;
  height: 25px;
  padding: 0 .19rem;
}
.content {
  padding-top: 1.33rem;
}
.container {
  margin: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.message {
  text-align: center;
  margin: 20px 0;
  color: #888;
}
.message span:last-child {
  margin-left: 10px;
}
.container img {
  width: 100%;
  margin-bottom: 20px;
}
.newsContent {
  font-size: 18px;
  line-height: 30px;
}
</style>
