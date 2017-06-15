<template lang="html">
  <div>
    <div class="collection-header">
      <img src="../assets/back.png" @click="goback">
      <span>我的收藏</span>
    </div>
    <div class="collection-content">
      <div class="new-container" v-for="(item, index) in collectionData">
        <div class="cancel">
          <img src="../assets/delete.png" @click="deleteCollect(item, index)">
        </div>
        <div class="section" @click="toCollectDetail(item, index)">
          <div class="new-left">
            <img :src="item.pic || require('../assets/tongyong.jpg')">
          </div>
          <div class="new-right">
            <div class="new-title">{{item.title}}</div>
            <div class="new-message">
              <span>{{item.time || '2017-06-07 12:00'}}</span>
              <span>{{item.src || '爱新闻'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    collectionData() {
      if(this.$store.state.collection) {
        return this.$store.state.collection
      }
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    toCollectDetail(item, index) {
      this.$router.push({name: 'collectDetail', params: { item : item, index : index }})
    },
    deleteCollect(item, index) {
      this.$store.state.collection.splice(index, 1)
    }
  }
}
</script>

<style lang="css" scoped>
.collection-header {
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
.collection-header img {
  width: 25px;
  height: 25px;
  padding: 0 .19rem;
}
.collection-content {
  padding-top: 1.33rem;
}
.new-container {
  width: 94%;
  height: 4.3rem;
  margin: .27rem auto;
}
.cancel {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cancel img {
  width: 0.5rem;
  height: 0.5rem;
}
.section {
  width: 100%;
  height: 3.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: .13rem;
}
.new-left {
  display: inline-block;
  width: 30%;
  height: 90%;
}
.new-left img {
  width: 100%;
  height: 100%;
}
.new-right {
  display: inline-block;
  width: 64%;
  height: 90%;
  margin-left: .21rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.new-title {
  width: 100%;
  height: 54%;
  overflow: hidden;
  font-size: 18px;
  color: #404040;
}
.new-message {
  width: 100%;
  height: 36%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: #888;
}
</style>
