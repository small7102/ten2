import { addComponents, editComponent, getComponentsList, delComponent } from '../api/app';
import {getHomeRoute, getBreadCrumbList, setTagNavListInLocalstorage, getTagNavListFromLocalstorage } from '../libs/utils'

const SET_MODAL_SHOW = 'SET_MODAL_SHOW'
const SET_COMPONENT_LIST = 'SET_COMPONENT_LIST'
const SET_FORM_CUSTOM = 'SET_FORM_CUSTOM'
const SET_MODAL_FOOTER = 'SET_MODAL_FOOTER'
const SET_COMPONENT_MODAL_TYPE = 'SET_COMPONENT_MODAL_TYPE'
const SET_MODAL_TITLE = 'SET_MODAL_TITLE'
const SET_AUTO_FOCUS = 'SET_AUTO_FOCUS'
const SET_BREAD_CRUMB = 'SET_BREAD_CRUMB'
const SET_ROUTES = 'SET_ROUTES'
const SET_TAG_NAV_LIST = 'SET_TAG_NAV_LIST'
const ADD_TAG = 'ADD_TAG'
const SET_TOTAL_ITEM_LENGTH = 'SET_TOTAL_ITEM_LENGTH'

export default {
    state: {
        isModalShow: false,
        isModalFooterHide: true,
        componentsList: [],
        formCustom: {},
        componentModalType: 'add',
        modalTitle: '我是一个标题',
        modalAutofocus: true,
        breadcrumbList: [],
        routes: [],
        tagNavList: [],
        totalItemLength: 0
    },
    getters: {
        isModalShow: state => state.isModalShow,
        componentsList: state => state.componentsList,
        formCustom: state => state.formCustom,
        isModalFooterHide: state => state.isModalFooterHide,
        componentModalType: state => state.componentModalType,
        modalTitle: state => state.modalTitle,
        modalAutofocus: state => state.modalAutofocus,
        breadcrumbList: state => state.breadcrumbList,
        tagNavList: state=> state.tagNavList,
        totalItemLength: state=> state.totalItemLength
    },
    mutations: {
        [SET_MODAL_SHOW](state, bool) {
            state.isModalShow = bool
        },
        [SET_COMPONENT_LIST](state, list) {
            state.componentsList = list
        },
        [SET_FORM_CUSTOM](state, data){
            state.formCustom = data
        },
        [SET_MODAL_FOOTER](state, bool){
            state.isModalFooterHide = bool
        },
        [SET_COMPONENT_MODAL_TYPE](state, type){
            state.componentModalType = type
        },
        [SET_MODAL_TITLE](state, title){
            state.modalTitle = title
        },
        [SET_AUTO_FOCUS](state, bool){
            state.modalAutofocus = bool
        },
        [SET_BREAD_CRUMB](state, routeMetched){
            state.breadcrumbList = getBreadCrumbList(routeMetched, getHomeRoute(state.routes))
        },
        [SET_ROUTES](state, routes){
            state.routes = routes
        },
        [SET_TAG_NAV_LIST](state, list){
            if (list) {
                state.tagNavList = [...list]
                setTagNavListInLocalstorage([...list])
              } else state.tagNavList = getTagNavListFromLocalstorage()
        },
        [ADD_TAG](state, item, type='unshitf'){
            if(state.tagNavList.findIndex(tag=>tag.name===item.name)<0){
                if(type==='push') state.tagNavList.push(item)
                else state.tagNavList.unshift(item)
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },
        [SET_TOTAL_ITEM_LENGTH](state, num){
            state.totalItemLength = num
        }
    },
    actions: {
        submitComponent({ commit, dispatch }, { query, type }) {
            return new Promise((resolve, reject) => {
                let requestFn, notice;
                switch (type) {
                    case 'add':
                        requestFn = addComponents;
                        notice = '添加成功';
                        break;
                    case 'edit':
                        requestFn = editComponent;
                        notice = '编辑成功';
                        break;
                    case 'delete':
                        requestFn = delComponent;
                        notice = '删除成功'
                }

                console.log(query)
                requestFn(query).then((res) => {                 
                    if (res.data && res.data.success) {
                        console.log(notice)
                        resolve(notice)
                        return dispatch('getComponentsList').then(() => {
                            commit(SET_MODAL_SHOW, false)
                        })
                    }
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        getComponentsList({ commit }, options) {
            getComponentsList(options).then(res => {
                if (res.data && res.data.success) {
                    const list = res.data.data.map((item) => {
                        item.cover = item.cover === "" ? "https://cn.vuejs.org/images/logo.png" : item.cover
                        return item
                    })

                    commit(SET_TOTAL_ITEM_LENGTH, res.data.count)
                    commit(SET_COMPONENT_LIST, list)
                }
            })
        }
    }
}