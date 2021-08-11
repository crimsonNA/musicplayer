import request from "./http";
// http://127.0.0.1:3000/toplist

// 获取获取排行版类型
export function getTopList() {
    return request({
        url: '/toplist',
        method: "get"
    })
}

// 获取排行榜数据
export function getPlaylistDetail(params) {
    return request({
        url: '/playlist/detail',
        method: "get",
        params
    })
}

// 收藏歌单
export function getSubscribel(params) {
    return request({
        url: '/playlist/subscribe?t=1',
        method: "get",
        params
    })
}

// 取消收藏歌单
export function getNoSubscribel(params) {
    return request({
        url: '/playlist/subscribe?t=2',
        method: "get",
        params
    })
}


