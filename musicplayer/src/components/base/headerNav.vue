<template>
    <div>
        <div class="header">
            <!-- 跳转到登录页面 -->
            <!-- <router-link
                to="/login"
                class="left iconfont icon-gengduo"
                tag="div"
            >
            </router-link> -->

            <!-- 打开侧栏 -->
            <div class="left iconfont icon-gengduo" @click="change"></div>

            <div class="center">MUSIC-VUE</div>
            <!-- 跳转到搜索页面 -->
            <router-link
                to="/search"
                class="right iconfont icon-sousuo"
                tag="div"
            >
            </router-link>
        </div>

        <div class="navs">
            <router-link to="/recommend" class="item"
                ><span>推荐</span></router-link
            >
            <router-link to="/rank" class="item"><span>歌单</span></router-link>
            <router-link to="/singer" class="item"
                ><span>歌手</span></router-link
            >
            <router-link to="/newmv" class="item"
                ><span @click="pauseplay">MV</span></router-link
            >
        </div>
        <transition name="sidebarToggle">
            <div class="sideBar" v-if="popup">
                <div>
                    <div class="iconfont icon-zuo back" @click="change">
                        返回
                    </div>
                    <!-- <div class="login">
                        <p>登陆网易云音乐</p>
                        <router-link to="/login" tag="div"
                            >立即登录</router-link
                        >
                    </div> -->

                    <gotoLogin v-if="isLogin"></gotoLogin>
                    <div class="user" v-if="!isLogin">
                        <div class="avatar">
                            <img :src="avatarUrl" alt="" />
                        </div>

                        <div class="user-msg">
                            <span>{{ nickname }}</span>
                            <span class="level">Lv.{{ level }}</span>
                            <span class="sign">签到</span>
                        </div>

                        <div class="user-item">
                            <ul>
                                <li>
                                    <router-link to="/userCenter" tag="div">
                                        <span
                                            class="iconfont icon-yonghu"
                                        ></span>
                                        <span>个人中心</span>
                                        <span class="iconfont icon-you"></span>
                                    </router-link>
                                </li>
                                <li>
                                    <div>
                                        <span class="iconfont icon-V"></span>
                                        <span>我的消息</span>
                                        <span class="iconfont icon-you"></span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span
                                            class="iconfont icon-xingzhuang"
                                        ></span>
                                        <span>创作者中心</span>
                                        <span class="iconfont icon-you"></span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span
                                            class="iconfont icon-gouwuche"
                                        ></span>
                                        <span>商城</span>
                                        <span class="iconfont icon-you"></span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span
                                            class="iconfont icon-lingdang"
                                        ></span>
                                        <span>彩铃</span>
                                        <span class="iconfont icon-you"></span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span
                                            class="iconfont icon-diantai"
                                        ></span>
                                        <span>电台</span>
                                        <span class="iconfont icon-you"></span>
                                    </div>
                                </li>

                                <li>
                                    <div>
                                        <span
                                            class="iconfont icon-clothes"
                                        ></span>
                                        <span>个性装扮</span>
                                        <span class="iconfont icon-you"></span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="exit" @click="exit">退出登录</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import gotoLogin from "../login/gotoLogin.vue";
import { getuserdetail } from "../../api/base";

export default {
    data() {
        return {
            popup: false,
            isLogin: true,
            user: [],
            level: null,
            avatarUrl: null,
            nickname: null,
        };
    },
    methods: {
        change() {
            this.popup = !this.popup;
        },
        exit() {
            this.popup = !this.popup;
            // 清除两个登录状态
            window.localStorage.removeItem("phoneLogin");
            window.localStorage.removeItem("login");
            // 重新加载网页
            window.location.reload();
        },
        getuserdetailFun() {
            let id = window.localStorage.getItem("id");
            // console.log(id);
            getuserdetail(id).then((data) => {
                this.user = data;
                this.level = data.level;
                this.avatarUrl = data.profile.avatarUrl;
                this.nickname = data.profile.nickname;
            });
        },
        pauseplay() {
            this.$emit("isPlayFun");
        },
    },
    created() {
        this.getuserdetailFun();
    },
    components: {
        gotoLogin,
    },
    updated() {
        if (
            window.localStorage.getItem("login") ||
            window.localStorage.getItem("phoneLogin")
        ) {
            this.isLogin = false;
        }
    },
};
</script>

<style lang="less" scoped>
// 侧边栏动画
.sidebarToggle-enter-active {
    transition: all 0.3s ease;
}
.sidebarToggle-leave-active {
    transition: all 0.3s ease;
}
.sidebarToggle-enter,
.sidebarToggle-leave-to {
    transform: translateX(-300px);
    opacity: 0;
}
.header {
    height: 40px;
    display: flex;
    background-color: #d4473c;
    color: #fff;
    text-align: center;
    .left,
    .right {
        flex: 0 0 40px;
        line-height: 40px;
    }
    .center {
        flex: 1;
        line-height: 40px;
    }
}

.navs {
    height: 40px;
    display: flex;
    background-color: #d4473c;
    .item {
        flex: 1;
        width: 33.33%;
        text-align: center;
        font-size: 15px;
        span {
            margin-top: 9px;
            display: inline-block;
            height: 21px;
            line-height: 21px;
            border-bottom: 1px solid transparent;
            color: #fff;
        }
        &.router-link-active span {
            font-weight: bold;
            border-color: #fff;
        }
    }
}
.sideBar {
    z-index: 1000;
    width: 300px;
    height: 667px;
    position: fixed;
    top: 0px;
    background-color: #f8f8f8;
    .back {
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
    }
    .user {
        margin-top: 50px;
        .avatar {
            img {
                width: 80px;
                height: 80px;
                border-radius: 80px;
                margin-left: 10px;
            }
        }
        .user-msg {
            margin-top: 10px;
            margin-left: 10px;
            .level {
                display: inline-block;
                text-align: center;
                width: 40px;
                height: 16px;
                line-height: 16px;
                background-color: #ccc;
                margin-left: 20px;
                font-size: 12px;
                border-radius: 10px;
            }
            .sign {
                float: right;
                height: 24px;
                line-height: 24px;
                width: 50px;
                font-size: 14px;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 20px;
                margin-right: 10px;
            }
        }
    }
}
.user-item {
    background-color: #fff;
    margin-top: 30px;
    border-radius: 15px;

    ul {
        li {
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            span:nth-child(1) {
                margin-left: 15px;
                margin-right: 15px;
            }
            span:nth-child(3) {
                float: right;
                margin-right: 15px;
            }
        }
    }
}
.exit {
    width: 200px;
    margin: 20px auto;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    border-radius: 40px;
}
</style>