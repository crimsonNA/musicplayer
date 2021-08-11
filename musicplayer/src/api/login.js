import request from "./http";
// http://127.0.0.1:3000/toplist

// 二维码登录
export function qrKey() {
    return request({
        url: '/login/qr/key',
        method: "get",
    })
}

// 二维码生成接口
export function qrCreate() {
    return request({
        url: '/login/qr/create',
        method: "get",
    })
}


// 通过id 手机验证码
export function getCaptcha(params) {
    return request({
        url: '/captcha/sent',
        method: "get",
        params
    })
}

// 通过id 手机验证码验证
export function getCaptchaVerify(params) {
    return request({
        url: '/captcha/verify',
        method: "get",
        params
    })
}

// 账号密码登录
export function getPhone(params) {
    return request({
        url: '/login/cellphone',
        method: "get",
        params
    })
}

// 查看登录状态
export function userStatus() {
    return request({
        url: '/login/status',
        method: "get",
    })
}


