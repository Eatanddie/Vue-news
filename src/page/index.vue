<template>
  <div>
    <my v-show="showMy"></my>
    <v-header class="pos-header"></v-header>
    <v-nav></v-nav>
  </div>
</template>

<script>
import vHeader from '@/components/vHeader'
import vNav from '@/components/vNav'
import my from '@/components/my'
export default {
  created() {
    this.$store.commit('muShowMy', false)
    // this.$store.commit('muShowLogin', false)
  },
  components: {
    vHeader,
    vNav,
    my
  },
  computed: {
    showMy() {
      return this.$store.state.showMy
    }
  }
}
</script>

<style lang="css" scoped>
.pos-header {
  position: fixed;
  top: 0;
}
</style>
