<template>
    <div>
        <van-loading v-if="flag" type="spinner" color="#D4473C" />

        <div class="banner">
            <div class="imgs">
                <van-swipe
                    class="my-swipe"
                    :autoplay="3000"
                    indicator-color="white"
                >
                    <van-swipe-item v-for="(item, index) in imgs" :key="index">
                        <img :src="item.pic" alt="" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>

        <div class="remFun">
            <div>
                <ul>
                    <router-link to="/ritui" tag="li">
                        <div><span class="iconfont icon-tuijian"></span></div>
                        <p>日推</p>
                    </router-link>

                    <router-link to="/diantai" tag="li">
                        <div><span class="iconfont icon-diantai"></span></div>
                        <p>电台</p>
                    </router-link>

                    <router-link to="/FM" tag="li">
                        <div>
                            <span class="iconfont icon-FM_weixuanze"></span>
                        </div>
                        <p>FM</p>
                    </router-link>

                    <router-link to="/zhibo" tag="li">
                        <div><span class="iconfont icon-zhibo"></span></div>
                        <p>直播</p>
                    </router-link>
                </ul>
            </div>
        </div>

        <div class="remLists">
            <div class="title">推荐歌单</div>
            <div class="content">
                <ul>
                    <li v-for="(item, index) in personalized" :key="index">
                        <router-link
                            :to="'/comPlyaList?id=' + item.id"
                            tag="div"
                            class="img"
                        >
                            <img :src="item.picUrl" alt=""
                        /></router-link>

                        <span
                            ><i class="iconfont icon-icon-"></i
                            >{{ item.playCount | playCountNum }}</span
                        >
                        <p>{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="hotSinger">
            <div class="title">热门歌手</div>
            <div class="content">
                <ul>
                    <li v-for="(item, index) in singer" :key="index">
                        <router-link to="/singerDetails" tag="div" class="img">
                            <img
                                :style="{
                                    'background-image':
                                        'url(' + item.picUrl + ')',
                                    'background-size': 'cover',
                                }"
                        /></router-link>
                        <p>{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div></div>

        <div class="newPlate">
            <div class="title">新碟上架</div>
            <div class="content">
                <ul>
                    <li v-for="(item, index) in newPlate" :key="index">
                        <router-link to="/albumDetails" tag="div" class="img">
                            <img :src="item.picUrl" alt="" />
                        </router-link>
                        <p>{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="newSongs">
            <div class="title">最新歌曲</div>
            <div class="content">
                <ul>
                    <li v-for="(item, index) in newSongs" :key="index">
                        <div @click="setId(item.song.id)">
                            <p>{{ item.song.name }}</p>
                            <p>{{ item.song.artists[0].name }}</p>
                        </div>

                        <div
                            class="iconfont icon-bofang"
                            @click="setId(item.song.id)"
                        ></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getBanner,
    getPersonalized,
    getNewest,
    gethotSinger,
    getNewsong,
} from "../api/recommend";
// import Swiper from "swiper";
export default {
    data() {
        return {
            imgs: null,
            personalized: null,
            newPlate: null,
            singer: null,
            newSongs: "",
            flag: true,
        };
    },
    methods: {
        getBannerFun() {
            // 轮播图数据
            getBanner().then((data) => {
                if (data.code == 200) {
                    this.imgs = data.banners;
                }
            });
        },
        getPersonalizedFun() {
            // 热门歌单数据
            getPersonalized().then((data) => {
                if (data.code == 200) {
                    this.personalized = data.result;
                }
            });
        },
        getNewestFun() {
            getNewest().then((data) => {
                if (data.code == 200) {
                    this.newPlate = data.albums;
                }
            });
        },
        gethotSingerFun() {
            gethotSinger().then((data) => {
                if (data.code == 200) {
                    this.singer = data.artists;
                }
            });
        },
        getNewsongFun() {
            getNewsong().then((data) => {
                if (data.code == 200) {
                    this.newSongs = data.result;
                    this.flag = false;
                }
            });
        },
        setId(id) {
            this.$emit("get-player-id", id);
        },
    },
    created() {
        this.getBannerFun();
        this.getPersonalizedFun();
        this.getNewestFun();
        this.gethotSingerFun();
        this.getNewsongFun();
    },
    filters: {
        playCountNum(value) {
            let w = value > 10000 ? value / 10000 : value; //万计算
            let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万"; //亿计算
            return y;
        },
    },
};
</script>

<style lang="less">
.van-loading {
    text-align: center;
}
.banner {
    width: 100%;
    text-align: center;
    position: relative;
    &::after {
        background-color: #d4473c;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -1;
        width: 100%;
        height: 132px;
        content: "";
        display: block;
    }
    .imgs {
        margin: auto;
        min-height: 100px;
        // background: turquoise;
        width: 96%;
        border-radius: 5px;
        .my-swipe {
            min-height: 100px;
            img {
                width: 100%;
                border-radius: 5px;
            }
        }
    }
}
.remFun {
    margin-top: 10px;
    ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        li {
            div {
                width: 50px;
                height: 50px;
                line-height: 50px;
                border-radius: 50px;
                background-color: #fd5757;
                text-align: center;
                .iconfont {
                    font-size: 32px;
                }
            }
            p {
                margin-top: 5px;
                font-size: 14px;
                font-weight: bold;
                color: #565658;
                text-align: center;
            }
        }
    }
    .iconfont {
        font-size: 50px;
        color: white;
    }
}

.remLists {
    .title {
        height: 60px;
        line-height: 60px;
        text-indent: 5px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
    }
    .content {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li {
                flex: 0 0 33%;
                position: relative;
                span {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    color: #fff;
                    font-size: 10px;
                    i {
                        font-size: 15px;
                        vertical-align: middle;
                    }
                }
                .img {
                    // background-color: aqua;
                    min-height: 50px;
                    width: 100%;
                    border-radius: 3px;
                    img {
                        width: 100%;
                        border-radius: 3px;
                    }
                }
                p {
                    font-size: 12px;
                    color: #565658;
                    line-height: 15px;
                    padding: 5px;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
.hotSinger {
    .title {
        height: 60px;
        line-height: 60px;
        text-indent: 5px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
    }
    .content {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li {
                position: relative;
                .img {
                    min-height: 50px;
                    width: 100%;
                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 50px;
                    }
                }
            }
            p {
                text-align: center;
                font-size: 12px;
                color: #565658;
                line-height: 15px;
                padding: 5px;
                margin-bottom: 5px;
            }
        }
        // ul {
        //     display: flex;
        //     flex-wrap: wrap;
        //     justify-content: space-around;
        //     li {
        //         flex: 0 0 33%;
        //         position: relative;
        //         .img {
        //             background-color: aqua;
        //             min-height: 50px;
        //             width: 100%;
        //             border-radius: 3px;
        //             img {
        //                 width: 100%;
        //                 border-radius: 3px;
        //             }
        //         }
        //     }
        //     p {
        //         font-size: 12px;
        //         color: #565658;
        //         line-height: 15px;
        //         padding: 5px;
        //         margin-bottom: 5px;
        //     }
        // }
    }
}
.newPlate {
    .title {
        height: 60px;
        line-height: 60px;
        text-indent: 5px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
    }
    .content {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li {
                flex: 0 0 33%;
                position: relative;
                .img {
                    background-color: aqua;
                    min-height: 50px;
                    width: 100%;
                    border-radius: 3px;
                    img {
                        width: 100%;
                        border-radius: 3px;
                    }
                }
            }
            p {
                font-size: 12px;
                color: #565658;
                line-height: 15px;
                padding: 5px;
                margin-bottom: 5px;
            }
        }
    }
}
.newSongs {
    .title {
        height: 60px;
        line-height: 60px;
        text-indent: 5px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
    }
    .content {
        ul {
            li {
                display: flex;
                justify-content: space-between;
                div:nth-child(1) {
                    p {
                        margin: 5px;
                    }
                    p:nth-child(1) {
                        font-size: 17px;
                    }
                    p:nth-child(2) {
                        font-size: 12px;
                        color: #888;
                    }
                }
                div:nth-child(2) {
                    height: 54px;
                    line-height: 54px;
                    font-size: 26px;
                    color: #888;
                    margin-right: 5px;
                }
                border-bottom: 1px solid #ebebeb;
            }
        }
    }
}
</style>