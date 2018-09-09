import axios from 'axios'

export function checkLogin(name, pw) {
        return  axios({
            method: 'post',
            baseURL: '/api',
            url: '/checkLogin',
            data: {
                name,
                pw
            }
          });
}

export function getUserInfo(token){
    return  axios({
        baseURL: '/api',
        url: 'getUser',
        params: {
            token
        }
      });
}