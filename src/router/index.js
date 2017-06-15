import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import detail from '@/page/detail'
import channelManage from '@/page/channelManage'
import search from '@/page/search'
import searchDetail from '@/page/searchDetail'
import collection from '@/page/collection'
import collectDetail from '@/page/collectDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/collectDetail',
      name: 'collectDetail',
      component: collectDetail
    },
    {
      path: '/channelManage',
      component: channelManage
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/searchDetail',
      name: 'searchDetail',
      component: searchDetail
    },
    {
      path: '/collection',
      component: collection
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
