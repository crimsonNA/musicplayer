import request from "./http";


// 获取用户信息, 头像, 昵称 ,等级
// http://localhost:3000/user/detail?uid=453736671
export function getUser(id) {
    return request({
        url: '/user/detail?uid=' + id,
        method: "get",
    })
}


// 获取用户全部的歌单
export function getPlayList(id) {
    return request({
        url: '/user/playlist?uid=' + id,
        method: "get",
    })
}

// 获取账号信息
export function getAccount(params) {
    return request({
        url: '/user/account',
        method: "get",
        params
    })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getSubcount(params) {
    return request({
        url: '/user/subcount',
        method: "get",
        params
    })
}

// 获取用户喜欢音乐的列表
export function getLikeList(params) {
    return request({
        url: '/likelist',
        method: "get",
        params
    })
}

