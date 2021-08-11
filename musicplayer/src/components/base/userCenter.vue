<template>
    <div>
        <div class="userCenter">
            <div class="backhome">
                <router-link
                    to="/recommend"
                    class="iconfont icon-zuo"
                    tag="span"
                ></router-link>
            </div>
            <div class="userMsg">
                <div class="background">
                    <img :src="userMsg.backgroundUrl" alt="" />
                </div>

                <div class="head-portrait">
                    <div class="img">
                        <img :src="userMsg.avatarUrl" alt="" />
                    </div>

                    <p class="name">{{ userMsg.nickname }}</p>
                    <p class="follow">
                        <span>关注{{ userMsg.follows }}</span>
                        <span>粉丝{{ userMsg.followeds }}</span>
                    </p>
                    <div class="alter">
                        <span class="iconfont icon-xiugai-copy"></span>
                        <span>修改资料</span>
                    </div>
                </div>
            </div>

            <div class="line">收藏的歌单</div>

            <div class="songsList">
                <ul>
                    <li
                        v-for="(item, index) in playList"
                        :key="index"
                        @click="goto(item.id)"
                    >
                        <router-link
                            :to="'/userPlayList?id=' + item.id"
                            tag="div"
                            class="list"
                        >
                            <div>
                                <img :src="item.coverImgUrl" alt="" />
                            </div>

                            <div>
                                <p>{{ item.name }}</p>
                                <p>
                                    <span>共{{ item.trackCount }}首</span>
                                    <span>播放{{ item.playCount }}次</span>
                                </p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getUser,
    // getLikeList,
    getPlayList,
    // getAccount,
    // getSubcount,
} from "../../api/user";
export default {
    data() {
        return {
            userMsg: "",
            playList: "",
            ids: [],
        };
    },
    methods: {
        getUserFun() {
            let id = window.localStorage.getItem("id");
            // console.log(id);
            getUser(id).then((data) => {
                // console.log(data);
                this.userMsg = data.profile;
                // console.log(this.userMsg);
            });
        },
        getPlayListFun() {
            let id = window.localStorage.getItem("id");
            getPlayList(id).then((data) => {
                // console.log(data);
                this.playList = data.playlist;
                // console.log(this.playList);
            });
        },

        // 判断是否喜欢的方法(未完成)
        // getLikeListFun() {
        //     let id = window.localStorage.getItem("id");
        //     let cookie = window.localStorage.getItem("cookie");
        //     getLikeList({ id: id, cookie: cookie }).then((data) => {
        //         console.log(data);
        //         this.ids = data.ids;
        //     });
        // },
        goto(id) {
            console.log(id);
        },
    },
    created() {
        this.getUserFun();
        this.getPlayListFun();
        // this.getLikeListFun();
    },
};
</script>
<style lang="less">
.backhome {
    height: 50px;
    line-height: 50px;
    position: absolute;
    span {
        color: white;
        font-size: 18px;
        margin-left: 15px;
    }
}
.userMsg {
    .background {
        z-index: -1;
        position: absolute;
        img {
            width: 100%;
            -webkit-filter: blur(2px);
            -moz-filter: blur(2px);
            -ms-filter: blur(2px);
            filter: blur(2px);
        }
    }
    .head-portrait {
        .img {
            margin: 0 auto;
            padding-top: 80px;
            width: 80px;
        }
        img {
            border-radius: 80px;
            width: 80px;
            height: 80px;
        }
        .name {
            font-size: 18px;
            color: white;
            text-align: center;
            margin-top: 10px;
        }
        .follow {
            font-size: 14px;
            color: white;
            text-align: center;
            margin-top: 10px;
            span {
                margin: 0px 10px;
            }
        }
        .alter {
            color: white;
            text-align: center;
            font-size: 14px;
            margin: 0 auto;
            margin-top: 10px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #b2b2b2;
            border-radius: 20px;
        }
    }
}
.line {
    background-color: #e8eae9;
    margin-top: 70px;
    height: 30px;
    line-height: 30px;
    text-indent: 10px;
}
.songsList {
    ul {
        li {
            margin: 10px 0px;
            .list {
                img {
                    width: 80px;
                    border-radius: 5px;
                }
                display: flex;
                div:nth-child(1) {
                    margin: 0px 10px;
                }
                div:nth-child(2) {
                    p {
                        margin: 13px 0px;
                    }
                    p:nth-child(1) {
                        width: 275px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    p:nth-child(2) {
                        span {
                            color: #b2b2b2;
                            font-size: 14px;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>