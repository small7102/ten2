import {checkLogin,getUserInfo} from '../api/user';
import { setToken, getToken } from '../libs/utils';

const SET_USER_NAME='SET_USER_NAME'
const SET_USER_ID='SET_USER_ID'
const SET_TOKEN = 'SET_TOKEN'
const SET_ACCESS = 'SET_ACCESS'

export default {
    state: {
        userName: '',
        userId: '',
        token: getToken(),
        access:''
    },
    mutations: {
        [SET_USER_NAME](state, name){
            state.userName = name
        },
        [SET_USER_ID](state, id){
            state.userId=id
        },
        [SET_TOKEN](state, token){
            state.token = token;
            setToken(token)
        },
        [SET_ACCESS](state, access){
            state.access=access
        }
    },
    actions: {
        //登录
        handleLogin({commit},userName,password){
            return new Promise((resolve, reject)=>{
                checkLogin(userName,password).then((res)=>{
                    if(res.data.success){
                        commit(SET_TOKEN,res.data.token)
                        console.log(333)
                        resolve()
                    }
                }).catch((err)=>{
                    reject(err)
                })
            })
        },
        getUserInfo({commit, state}){
            return new Promise((resolve, reject)=>{
                getUserInfo(state.token).then((res)=>{
                    commit(SET_USER_NAME, res.data.name)
                    resolve(res)
                }).catch((err)=>{
                    reject(err)
                })
            })
        }
    }
}