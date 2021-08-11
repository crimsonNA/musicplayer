<template>
    <div>
        <div class="mvDetails">
            <div class="mV">
                <router-link
                    to="/newmv"
                    tag="span"
                    class="iconfont icon-zuo"
                ></router-link>
                <video
                    controls
                    :src="http"
                    :ref="'video'"
                    @loadeddata="loadeddataFun"
                ></video>
            </div>

            <div class="details">
                <h3>{{ data.name }}</h3>
                <p>相关人物:{{ data.artistName }}</p>
                <p>
                    <span>发布时间: {{ data.publishTime }}</span>
                    <span>播放量 : {{ playCount }}</span>
                </p>
                <div class="icon">
                    <span class="iconfont icon-tuijian">
                        {{ mvdata.likedCount }}
                    </span>
                    <span class="iconfont icon-zhuanfa">
                        {{ mvdata.shareCount }}
                    </span>
                    <span
                        class="iconfont icon-pinglun"
                        @click="isCommentShow = true"
                    >
                        {{ mvdata.commentCount }}
                    </span>
                </div>
            </div>

            <transition name="comment-toggle">
                <div class="mvComment" v-if="isCommentShow">
                    <div class="title">
                        <span
                            class="iconfont icon-zuo"
                            @click="isCommentShow = false"
                        ></span>
                        精彩评论
                    </div>

                    <div class="commentMain">
                        <ul>
                            <li v-for="(item, index) in comments" :key="index">
                                <div class="commentItem">
                                    <div class="img">
                                        <img :src="item.avatarUrl" alt="" />
                                    </div>
                                </div>

                                <div class="commentUser">
                                    <span>{{ item.nickname }}</span>
                                    <span class="iconfont icon-tuijian"></span>
                                    <span>{{ item.likedCount }}</span>
                                    <p>2020年12月11日</p>
                                </div>

                                <div class="commentText">
                                    <p>{{ item.content }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>

            <div class="correlation">
                <div class="title">相关推荐</div>
                <ul>
                    <li
                        v-for="(item, index) in mvs"
                        :key="index"
                        @click="goTo(item.id)"
                    >
                        <div class="img">
                            <img :src="item.cover" alt="" />
                            <span class="iconfont icon-shexiangji">{{
                                item.playCount
                            }}</span>
                        </div>
                        <div>
                            <p>{{ item.name }}</p>
                            <p>{{ item.artistName }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getMvUrl,
    getmvDetail,
    getsimiMv,
    getmvDetailInfo,
    getMvComment,
} from "../../api/mv";
export default {
    data() {
        return {
            id: "",
            http: "",
            data: "",
            playCount: "",
            mvs: "",
            isCommentShow: false,
            comments: "",
            mvdata: "",
        };
    },
    methods: {
        getUrl() {
            let id = this.id;
            console.log(id);
            getMvUrl({ id }).then((data) => {
                this.http = data.data.url;
            });
        },

        // MV数据
        getmvDatailFun() {
            let id = this.id;
            console.log(id);
            getmvDetail(id).then((data) => {
                this.data = data.data;
                console.log(data);

                if (data.data.playCount >= 10000) {
                    this.playCount =
                        Math.floor(data.data.playCount / 10000) + "万";
                }
            });
            // 点赞评论转发数据
            getmvDetailInfo(id).then((data) => {
                console.log(111);
                this.mvdata = data;
                console.log(data);
            });
        },
        getsimiMvFun() {
            let id = this.id;
            getsimiMv({ mvid: id }).then((data) => {
                this.mvs = data.mvs;
                console.log(this.mvs);
            });
        },
        loadeddataFun(event) {
            event.target.play();
        },
        goTo(id) {
            console.log(id);
            getMvUrl({ id }).then((data) => {
                this.http = data.data.url;
            });
            getmvDetail(id).then((data) => {
                this.data = data.data;
                console.log(data);

                if (data.data.playCount >= 10000) {
                    this.playCount =
                        Math.floor(data.data.playCount / 10000) + "万";
                }
            });
            getMvComment(id).then((data) => {
                console.log(data);
                this.comments = data;
                // console.log(this.comments.comments[0].user.avatarUrl);
                let res = this.comments.comments.map((item) => {
                    return {
                        likedCount: item.likedCount,
                        content: item.content,
                        nickname: item.user.nickname,
                        avatarUrl: item.user.avatarUrl,
                    };
                });
                this.comments = res;
                console.log(res);
            });
        },
        getMvCommentFun() {
            let id = this.id;
            console.log(id);
            getMvComment(id).then((data) => {
                console.log(data);
                this.comments = data;
                // console.log(this.comments.comments[0].user.avatarUrl);
                let res = this.comments.comments.map((item) => {
                    return {
                        likedCount: item.likedCount,
                        content: item.content,
                        nickname: item.user.nickname,
                        avatarUrl: item.user.avatarUrl,
                    };
                });
                this.comments = res;
                console.log(res);
            });
        },
    },
    created() {
        this.id = this.$route.params.id;
    },
    beforeMount() {
        this.getUrl();
        this.getmvDatailFun();
        this.getsimiMvFun();
        this.getMvCommentFun();
    },
};
</script>
<style lang="less">
.comment-toggle-enter-active {
    transition: all 0.3s ease;
}
.comment-toggle-leave-active {
    transition: all 0.3s ease;
}
.comment-toggle-enter,
.comment-toggle-leave-to {
    transform: translateY(310px);
    opacity: 0;
}

.mvDetails {
    width: 100%;
    .mV {
        span {
            position: absolute;
            color: white;
            top: 5px;
            left: 15px;
            z-index: 1000;
        }
        video {
            width: 100%;
            display: block;
        }
    }
    .details {
        h3 {
            margin: 10px;
        }

        p:nth-child(2) {
            margin: 10px;
            font-size: 14px;
            color: #8888ff;
        }
        p:nth-child(3) {
            margin: 10px;
            font-size: 14px;
            color: #b2b2b2;
            span {
                margin-right: 10px;
            }
        }
        .icon {
            display: flex;
            justify-content: space-around;
            span {
                display: inline-block;
                font-size: 15px;
                width: 80px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #b2b2b2;
                border: 1px solid #b2b2b2;
                border-radius: 30px;
                margin-bottom: 10px;
            }
        }
    }
    .mvComment {
        z-index: 1000;
        position: fixed;
        width: 100%;
        height: 400px;
        background-color: #fff;
        bottom: 0px;
        overflow-y: scroll;
        .title {
            margin: 10px;
        }
        .commentMain {
            ul {
                li {
                    margin-top: 15px;
                    .commentItem {
                        .img {
                            float: left;
                            margin-left: 10px;
                            margin-right: 10px;
                            img {
                                width: 40px;
                                height: 40px;
                                border-radius: 40px;
                            }
                        }
                    }
                    .commentUser {
                        height: 40px;
                        position: relative;
                        span:nth-child(1) {
                            float: left;
                            font-weight: bold;
                        }
                        span:nth-child(2) {
                            float: right;
                            margin-right: 5px;
                        }
                        span:nth-child(3) {
                            font-size: 14px;
                            float: right;
                            margin-right: 5px;
                        }
                        p {
                            position: absolute;
                            top: 20px;
                            left: 60px;
                            font-size: 14px;
                            color: #b2b2b2;
                        }
                    }
                    .commentText {
                        p {
                            margin-top: 5px;
                            margin-left: 60px;
                            font-size: 14px;
                        }
                        div {
                            float: right;
                            width: 315px;
                            height: 10px;
                            border-bottom: 1px solid #e6e6e6;
                        }
                    }
                }
            }
        }
    }
    .correlation {
        .title {
            height: 30px;
            line-height: 30px;
            background-color: #ececec;
            font-size: 14px;
            text-indent: 15px;
            color: #b2b2b2;
        }
        ul {
            li {
                .img {
                    position: relative;
                    margin-left: 10px;
                    img {
                        width: 100px;
                        border-radius: 5px;
                    }
                    span {
                        color: white;
                        position: absolute;
                        font-size: 12px;
                        top: 0px;
                        left: 2px;
                    }
                }
                display: flex;
                margin: 10px 0px;

                div:nth-child(2) {
                    p:nth-child(1) {
                        font-size: 14px;
                        margin-left: 10px;
                    }
                    p:nth-child(2) {
                        font-size: 12px;
                        color: #b2b2b2;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}
</style>