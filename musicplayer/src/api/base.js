import request from "./http";

// 通过id 获取歌曲url
// /song/url?id=1854142292
export function getSongUrl(params) {
    return request({
        url: '/song/url',
        method: "get",
        params
    })
}
// 通过id 获取歌曲url
// /song/detail?ids=1854142292
export function getSongDetail(params) {
    return request({
        url: '/song/detail',
        method: "get",
        params
    })
}


// 通过id 获取歌词
// http://localhost:3000/
export function getLyric(params) {
    return request({
        url: '/lyric',
        method: "get",
        params
    })
}


// 获取电台个性推荐
// http://localhost:3000/dj/personalize/recommend?limit=5
export function getperFm() {
    return request({
        url: '/dj/personalize/recommend',
        method: "get",
    })
}

// 获取每日推荐歌曲
// http://localhost:3000/
export function getremSongs(cookie) {
    return request({
        url: '/recommend/songs',
        method: "get",
        params: {
            cookie
        }
    })
}

// 获取用户信息
export function getuserdetail(id) {
    return request({
        url: '/user/detail?uid=' + id,
        method: "get",
    })
}

// 获取评论
export function getcomment(id) {
    return request({
        url: '/comment/music',
        method: "get",
        params: { id }

    })
}
// 添加音乐到喜欢
export function getLike(params) {
    return request({
        url: '/like',
        method: "get",
        params
    })
}
// 添加音乐到喜欢
export function getDisLike(params) {
    return request({
        url: '/like',
        method: "get",
        params
    })
}

