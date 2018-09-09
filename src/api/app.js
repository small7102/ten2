import axios from 'axios'

export function addComponents(data) {
        return  axios({
            method: 'post',
            baseURL: '/api',
            url: '/addComponents',
            data: data
          });
}

export function getComponentsList(data){
    return axios({
        baseURL: '/api',
        url: '/getComponentsList',
        params: data
    })
}

export function getAddComponent(data){
    return axios({
        baseURL: '/api',
        url: '/getAddComponent',
        params: data
    })
}

export function editComponent(data){
    return axios({
        baseURL: '/api',
        url: '/editComponent',
        params: data
    })
}

export function delComponent(data) {
    return axios({
        baseURL: '/api',
        url: '/delComponent',
        params: data
    })
}