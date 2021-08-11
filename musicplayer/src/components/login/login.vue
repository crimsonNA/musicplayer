<template>
    <div>
        <div class="login">
            <router-link
                to="/recommend"
                tag="div"
                class="back iconfont icon-zuo"
            ></router-link>
            <!-- <div class="logo">
                <div class="img">
                    <img src="../../assets/img/wyylogo1.png" alt="" />
                </div>
            </div> -->

            <div class="submit">
                <div class="phone">
                    <span>+86</span>
                    <input
                        type="text"
                        placeholder="请输入手机号"
                        v-model="phone"
                    />
                </div>
                <div class="code">
                    <input
                        type="text"
                        placeholder="请输入验证码"
                        v-model="code"
                    />
                    <span @click="getCode">点击发送</span>
                </div>
                <div class="button" @click="submit">登录</div>
            </div>

            <div class="method">
                <router-link to="/phoneLogin" tag="span">密码登录</router-link>
                |
                <span>注册/找回</span>
            </div>
        </div>
    </div>
</template>
<script>
import { Notify } from "vant";
import { getCaptcha, getCaptchaVerify } from "../../api/login.js";
export default {
    data() {
        return {
            phone: "",
            code: "",
        };
    },
    methods: {
        getCode() {
            console.log(this.phone);
            // 1.验证手机号
            let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
            if (!reg.test(this.phone)) {
                Notify({ type: "warning", message: "请输入正确手机号码" });
                return;
            }

            // 请求验证码接口
            getCaptcha({ phone: this.phone }).then((data) => {
                console.log(data);
                if (data.data) {
                    Notify({ type: "success", message: "验证码发送成功" });
                } else {
                    Notify({ type: "danger", message: "验证码发送失败" });
                }
            });
        },
        submit() {
            // window.localStorage.setItem("login", "true");
            // 个人中心判断是否登录
            // this.$router.push("/userInfo")
            // 必须登录才能使用

            // 跳转到首页;
            // if (window.localStorage.getItem("guidePage")) {
            //     this.$router.push("/recommend");
            // } else {
            //     this.$router.push("/guidePage");
            // }

            if (window.localStorage.getItem("login")) {
                this.$router.push("/recommend");
            }
            let reg = /^[0-9]{4}$/;
            if (!reg.test(this.code)) {
                Notify({ type: "warning", message: "请输入正确验证码" });
                return;
            }

            getCaptchaVerify({
                phone: this.phone,
                captcha: this.code,
            })
                .then((data) => {
                    console.log(data);
                    if (data.code == 200) {
                        Notify({ type: "success", message: "登录成功" });

                        window.localStorage.setItem("login", "true");
                        // 个人中心判断是否登录
                        // this.$router.push("/userInfo")
                        // 必须登录才能使用
                        if (window.localStorage.getItem("login")) {
                            this.$router.push("/recommend");
                        }
                    } else {
                        Notify({ type: "danger", message: "登录失败" });
                    }
                })
                .catch(function () {
                    Notify({ type: "danger", message: "登录失败" });
                });
        },
    },
};
</script>
<style lang="less">
.login {
    height: 667px;
    background: url(../../assets/img/login.png);
    background-size: cover;
    .back {
        height: 50px;
        line-height: 50px;
        margin-left: 15px;
    }
}
input::-webkit-input-placeholder {
    /* placeholder颜色 */
    // color: #aab2bd;
    /* placeholder字体大小 */
    font-size: 14px;
}
// .logo {
//     height: 150px;
//     .img {
//         height: 150px;
//         text-align: center;
//         line-height: 150px;
//         img {
//             width: 50px;
//             // border-radius: 30px;
//             display: inline-block;
//             vertical-align: middle;
//         }
//     }
// }
.submit {
    margin-top: 300px;
    .phone {
        background-color: #e2e2e2;
        height: 40px;
        line-height: 40px;
        width: 300px;
        margin: 0 auto;
        border-radius: 30px;
        margin-bottom: 10px;
        span {
            font-size: 12px;
            font-weight: bold;
            margin-left: 8px;
            margin-right: 8px;
        }
        input {
            box-shadow: none;
            outline: none;
            border: none;
            background-color: #e2e2e2;
        }
    }
    .code {
        background-color: #e2e2e2;
        height: 40px;
        line-height: 40px;
        width: 300px;
        margin: 0 auto;
        border-radius: 30px;
        margin-bottom: 10px;
        text-align: left;
        input {
            box-shadow: none;
            outline: none;
            border: none;
            background-color: #e2e2e2;
            margin-left: 36px;
        }
        span {
            font-size: 14px;
            color: #757575;
            border-left: 1px solid #757575;
            height: 25px;
            width: 65px;
            line-height: 25px;
            display: inline-block;
            text-align: center;
        }
    }
    .button {
        width: 300px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        border-radius: 30px;
        background-color: #ff5147;
        color: #e2e2e2;
        margin-bottom: 10px;
        text-align: center;
    }
}
.method {
    text-align: center;
    span {
        font-size: 14px;
        color: #757575;
    }
}
</style>