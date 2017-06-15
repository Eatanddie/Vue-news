<template lang="html">
  <div class="detail">
    <div class="header">
      <img src="../assets/back.png" @click="goback">
      <span>{{this.$store.state.channels[this.$store.state.channelIndex]}}频道</span>
      <img :src="likeImg" @click="clickCollect()">
    </div>
    <div class="content">
      <div class="container">
        <!-- <div class="title">{{$route.params.item.title}}</div> 给路由传参的写法 -->
        <div class="title">{{channelNewData &&　channelNewData.title}}</div>
        <div class="message">
          <span>{{channelNewData && channelNewData.time || '2017-06-07 12:00'}}</span>
          <span>{{channelNewData && channelNewData.src || '爱新闻'}}</span>
        </div>
        <img :src="channelNewData && channelNewData.pic || require('../assets/tongyong.jpg')">
        <div class="newsContent" v-html="channelNewData && channelNewData.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    channelNewData() {
      return this.$store.state.channelData[this.$store.state.newDataIndex]
    },
    likeImg() {
      return this.$store.state.likeImg
    }
  },
  methods: {
    goback() {
      this.$router.push('/')
    },
    clickCollect() {
      if(this.$store.state.likeImg === require("../assets/like.png")) {
        this.$store.commit('muLikeImg', require("../assets/collect.png"))
        this.$store.commit('muCollect', this.channelNewData)
      } else {
        this.$store.commit('muLikeImg', require("../assets/like.png"))
        this.$store.commit('muLike', this.channelNewData)
      }
      // console.log(this.$store.state.collection)
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
  justify-content: space-between;
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
