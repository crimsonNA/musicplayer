import request from "./http";

// 获取每日推荐歌曲
// http://localhost:3000/
export function getFm(params) {
    return request({
        url: '/personal_fm',
        method: "get",
        params
    })
}