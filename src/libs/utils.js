import Cookies from 'js-cookie'
import config from 'src/config'

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

/**
 * @param {String} fmt 传入时间格式
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export function dateFmt(fmt,date) {
  const o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') homeRoute = item
    }
  }
  console.log(homeRoute)
  return homeRoute
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [Object.assign(homeRoute, { to: homeRoute.path }), ...res]
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}
 
/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

export const getNextName = (list, name) =>{
  let res = ''
  if(list.length===2){
    res='home'
  }else{
    if(list.findIndex(item=>item.name===name)===list.length-1) res = list[list.length-2].name
    else res = list[list.findIndex(item=>item.name===name) + 1].name
  }

  return res
}


export function ajax(content) {
  console.log("ajax request " + content , dateFmt("yyyy-MM-dd hh:mm:ss", new Date()));
}


//防抖
export function debounce(fun, delay) {
  let timer
  console.log(dateFmt("yyyy-MM-dd hh:mm:ss", new Date()))
  return function (args) {
    console.log(timer)
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(()=> {
         // console.log(timer)
          fun.call(this, args)
      }, delay)
  }
}

//节流
export function throttle(fun, delay) {
  let last, deferTimer
  return function (args) {
      let that = this
      let _args = arguments
      let now = +new Date()
      console.log('now:'+now)
      if (last && now < last + delay) {
          clearTimeout(deferTimer)
          deferTimer = setTimeout(function () {
              last = now
              fun.apply(that, _args)
          }, delay)
      }else {       
          last = now
          console.log('last:'+last)
          fun.apply(that,_args)
      }
  }
}
