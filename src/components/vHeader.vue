<template lang="html">
  <div class="header">
    <img src="../assets/identify.png" @click="clickIcon">
    <span>爱新闻</span>
    <img src="../assets/search.png" @click="toSearch">
  </div>
</template>

<script>
export default {
  methods: {
    toSearch() {
      this.$router.push('/search')
    },
    clickIcon() {
      this.$store.state.showMy = true
      this.$store.state.showLogin = true
    }
  }
}
</script>

<style lang="css" scoped>
.header {
  width: 100%;
  height: 1.2rem;
  background-color: #d43d3d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 3px;
  z-index: 99;
}
img {
  width: .67rem;
  height: .67rem;
  padding: .4rem;
}
</style>
