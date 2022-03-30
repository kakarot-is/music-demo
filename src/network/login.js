import { request } from './request'

export function getPhoneLogin(phone, password) { // 用户登录
    return request({
        url: '/login/cellphone',
        params: {
            phone,
            password,
        }
    })
}
export function getPhoneLoginOut() { // 用户退出
    return request({
        url: 'logout',
    })
}

export function getUserSonglist(uid) { //获取用户歌曲列表
    return request({
        url: 'user/playlist',
        params: {
            uid,
        }
    })
}