import request from "./http";
// http://192.168.100.59:3000/banner?type=3

// 获取轮播图数据
export function getBanner() {
    return request({
        url: '/banner?type=3',
        method: "get"
    })
}

// 获取推荐歌单接口
export function getPersonalized() {
    return request({
        url: '/personalized?limit=15',
        method: "get"
    })
}

//获取首页最新专辑上架数据
export function getNewest() {
    return request({
        url: '/album/newest',
        method: "get"
    })
}

//获取最新专辑
export function getnewAlbum() {
    return request({
        url: '/album?id=32311&limit=9',
        method: "get"
    })
}

//获取热门歌手
export function gethotSinger() {
    return request({
        url: '/top/artists?offset=0&limit=3',
        method: "get"
    })
}

//获取热门歌手
export function getNewsong() {
    return request({
        url: '/personalized/newsong',
        method: "get"
    })
}


