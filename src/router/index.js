import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
import { getToken } from '../libs/utils';


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

const LOGIN_PAGE_NAME = 'login'

// router.beforeEach((to, from, next)=>{
//   const token = getToken();
//   if(!token && to.name!==LOGIN_PAGE_NAME){
//     //未登录且要跳转的页面不是登录页
//     next({
//       name: LOGIN_PAGE_NAME
//     })
//   } else if(!token&&to.name===LOGIN_PAGE_NAME){
//     next()
//   } else if(token && to.name===LOGIN_PAGE_NAME) {
//     next()
//   } else {
//     console.log(22)
//     store.dispatch('getUserInfo').then(user => {
//       console.log(user)
//       next()
//     })

//   }
// })

export default router
