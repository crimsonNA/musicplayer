<template>
    <div>
        <div class="login">
            <router-link
                to="/recommend"
                tag="div"
                class="iconfont icon-zuo back"
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
                        type="password"
                        placeholder="请输入密码"
                        v-model="password"
                    />
                </div>
                <div class="button" @click="submit">登录</div>
            </div>

            <div class="method">
                <router-link to="/login" tag="span">验证码登录</router-link>
                |
                <span>注册/找回</span>
            </div>
        </div>
    </div>
</template>
<script>
import { Notify } from "vant";
import { getPhone, userStatus } from "../../api/login";
export default {
    data() {
        return {
            phone: "",
            password: "",
            login: null,
        };
    },
    methods: {
        submit() {
            userStatus().then((data) => {
                console.log(222);
                console.log(data);
            });
            if (window.localStorage.getItem("phoneLogin")) {
                this.$router.push("/recommend");
            } else {
                // 使用账号密码登录
                getPhone({
                    phone: this.phone,
                    password: this.password,
                })
                    .then((data) => {
                        console.log(data);
                        if (data.code == 200) {
                            Notify({ type: "success", message: "登录成功" });
                            window.localStorage.setItem("phoneLogin", "true");
                            window.localStorage.setItem("token", data.token);
                            window.localStorage.setItem("id", data.account.id);
                            console.log(data.cookie);
                            window.localStorage.setItem("cookie", data.cookie);

                            // console.log(data);

                            if (window.localStorage.getItem("phoneLogin")) {
                                this.$router.push("/recommend");
                            }
                        } else {
                            Notify({
                                type: "danger",
                                message: "登录失败,请检查账号密码",
                            });
                        }
                    })
                    .catch(function () {
                        Notify({ type: "danger", message: "登录失败" });
                    });
            }
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
            margin-left: 36.36px;
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