import request from "./http";


// 获取热门搜索
export function getsearchHot() {
    return request({
        url: 'search/hot',
        method: "get",
    })
}

// 获取热门详细
export function getsearchHotDretail() {
    return request({
        url: 'search/hot/detail',
        method: "get",
    })
}

//获取搜索建议
export function getSuggest(params) {
    return request({
        url: 'search/suggest?keywords=' + params,
        method: "get",
    })
}

//获取搜索
export function getSearch(params) {
    return request({
        url: '/search',
        method: "get",
        params
    })
}

// 传入搜索关键词可获得搜索结果
export function getSearchMultimatch(params) {
    return request({
        url: '/search/multimatch',
        method: "get",
        params
    })
}
