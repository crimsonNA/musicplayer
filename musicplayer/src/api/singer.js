import request from "./http";

// 获取热门歌手
// /top/artists?offset=0&limit=30
export function getTopArtists() {
    return request({
        url: '/top/artists',
        method: "get",
        params: {
            limit: 10
        }
    })
}

// /artist/list?type=1&area=96&initial=b
// 获取歌手分类
export function getArtistList(params) {
    return request({
        url: '/artist/list',
        method: "get",
        params
    })
}

// 获取歌手热门歌曲50首
// /artist/top/song?id=6452
export function getArtistTopSong(params) {
    return request({
        url: '/artist/top/song',
        method: "get",
        params
    })
}

// 获取歌手全部歌曲
// /artist/top/song?id=6452
export function getArtistSong(params) {
    return request({
        url: '/artist/songs',
        method: "get",
        params
    })
}

// 获取歌手单曲和部分信息
export function getArtist(params) {
    return request({
        url: '/artists',
        method: "get",
        params
    })
}

// 获取歌手的MV
export function getArtistMv(params) {
    return request({
        url: '/artist/mv',
        method: "get",
        params
    })
}

// 获取歌手详情
export function getArtistdesc(params) {
    return request({
        url: '/artist/desc',
        method: "get",
        params
    })
}



