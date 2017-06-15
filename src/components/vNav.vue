<template>
  <div>
    <div class="nav-content">
      <div class="nav">
        <div class="channel">
          <ul>
            <li v-for="(channel, index) in channels" :class="{ active : isActive === index }" @click="clickChannel(channel,index)">{{channel}}</li>
          </ul>
        </div>
        <div class="addChannel">
          <img src="../assets/add.png" @click="toChannelManage">
        </div>
      </div>
      <div class="newsContent">
        <div v-show="isLoading" class="loading">
          <img src="../assets/loading.png">
        </div>
        <carousel v-show="this.$store.state.channelIndex === 0"></carousel>
        <div class="section" v-for="(item, index) in newData" @click="toDetail(item, index)">
          <div class="news">
            <div class="news-left">
              <img :src="item.pic || require('../assets/tongyong.jpg')" alt="">
            </div>
            <div class="news-right">
              <div class="newsTitle">{{item.title}}</div>
              <div class="newsMessage">
                <span>{{item.time || '2017-06-07 12:00'}}</span>
                <span>{{item.src || '爱新闻'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/carousel'
export default {
  components: {
    carousel
  },
  created() {
    this.$store.dispatch('acChannels')
    this.$store.dispatch('acGetData', '头条')
    this.$store.commit('loading', true)
  },
  computed: {
    channels() {
      return this.$store.state.channels
    },
    newData() {
      return this.$store.state.channelData
    },
    isLoading() {
      return this.$store.state.load
    },
    isActive() {
      return this.$store.state.isActive
    }
  },
  methods: {
    clickChannel(channel,index) {
      this.$store.state.channelData = ''
      scrollTo(0,0)
      this.$store.state.load = true
      this.isActive = index
      this.$store.commit('muChannelIndex', index)
      this.$store.commit('muIsActive', index)
      this.$store.dispatch('acGetData', this.$store.state.channels[this.$store.state.channelIndex])
    },
    toDetail(item, index) {
      this.$store.commit('muNewDataIndex', index)
      this.$router.push('/detail')
      if(JSON.stringify(this.$store.state.collection).indexOf(JSON.stringify(this.$store.state.channelData[this.$store.state.newDataIndex])) != -1) {
        this.$store.commit('muLikeImg', require("../assets/collect.png"))
      } else {
        this.$store.commit('muLikeImg', require("../assets/like.png"))
      }
      // this.$router.push({name: 'detail', params: { item : item }})
    },
    toChannelManage() {
      this.$router.push('/channelManage')
    }
  }
}
</script>

<style lang="css" scoped>
.nav-content {
  margin-top: 1.2rem;
}
.nav {
  width: 100%;
  height: .96rem;
  background-color: #f4f5f6;
  display: flex;
  position: fixed;
  z-index: 99;
}
.channel {
  display: inline-block;
  flex: 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  font-size: .45rem;
  color: #505050;
}
.channel::-webkit-scrollbar {
  height: 0;
}
.addChannel {
  display: inline-block;
  width: 10%;
  height: 100%;
  border-left: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addChannel img {
  width: .53rem;
  height: .53rem;
}
.channel ul li {
  display: inline-block;
  margin-left: .32rem;
  margin-right: .32rem;
}
.active {
  color: red;
}
.newsContent {
  padding-top: 0.96rem;
}
.loading {
  position: absolute;
  top: 2.16rem;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: #fff;
  z-index: 99;
}
.loading img {
  margin-top: 30px;
  width: 50px;
  height: 50px;
  animation: loading .6s linear infinite
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.section {
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #ccc;
}
.news {
  height: 2.25rem;
  box-sizing: border-box;
  margin: 10px 10px;
  display: flex;
}
.news-left {
  height: 100%;
  width: 2.8rem;
  display: inline-block;
}
.news-left img {
  width: 100%;
  height: 100%;
}
.news-right {
  flex: 1;
  padding-left: 10px;
}
.newsTitle {
  width: 100%;
  height: 62%;
  color: #404040;
  font-size: 18px;
  overflow: hidden;
}
.newsMessage {
  width: 100%;
  height: 38%;
  display: flex;
  align-items: flex-end;
  color: #888;
  justify-content: space-between;
}
</style>
