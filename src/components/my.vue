<template lang="html">
  <div>
    <div class="mask" @click="clickMask"></div>
    <transition name="fade">
      <div class="login-information" v-if="showLogin">
        <div class="login-content" v-show="showContent">
          <div class="login-head">
            <div class="avatar">
              <img src="../assets/tongyong.jpg">
            </div>
            <div class="username">书生脚气</div>
          </div>
          <div class="login-list">
            <ul>
              <router-link to="/collection"><li><img src="../assets/collection.png">我的收藏</li></router-link>
              <li><img src="../assets/aboutme.png">关于我</li>
              <li @click="cancel"><img src="../assets/cancel.png">注销</li>
            </ul>
          </div>
        </div>
        <div class="nologin" v-show="showNologin">
          <div class="nologin-content">
            <input type="text" placeholder="邮箱">
            <input type="password" placeholder="密码">
            <button @click="clickLogin">登录</button>
            <div class="register">
              <span>立即注册</span>
              <span>忘记密码</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: true,
      showNologin: false
    }
  },
  created() {
    this.$store.commit('muShowLogin', false)
  },
  methods: {
    clickMask() {
      this.$store.state.showMy = false
      this.$store.state.showLogin = false
    },
    cancel() {
      this.showContent = false
      this.showNologin = true
    },
    clickLogin() {
      this.showContent = true
      this.showNologin = false
    }
  },
  computed: {
    showLogin() {
      return this.$store.state.showLogin
    }
  }
}
</script>

<style lang="css" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.8);
  z-index: 100;
}
.login-information {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 3rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  z-index: 101;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter {
  transform: translateX(-100%);
}
.login-content, .nologin {
  width: 90%;
  height: 100%;
}
.login-head {
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: .5rem;
  color: #888;
}
.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: .27rem;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.login-list {
  margin-top: .8rem;
  font-size: .43rem;
  color: #404040;
}
.login-list ul li {
  height: 1.2rem;
  line-height: 1.2rem;
  display: block;
  border-bottom: 1px solid #ccc;
}
.login-list img {
  width: .64rem;
  height: .64rem;
  vertical-align: middle;
  margin-right: .8rem;
}
.nologin-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.33rem;
}
.nologin-content input {
  width: 80%;
  height: 1.07rem;
  margin-bottom: .53rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #888;
}
.nologin-content button {
  width: 80%;
  height: 1rem;
  background-color: #f33;
  border: 1px solid #f33;
  color: #fff;
  letter-spacing: 5px;
  border-radius: 3px;
}
.register {
  width: 90%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.register span:last-child {
  color: red;
}
</style>
