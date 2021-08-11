<template>
    <div>
        <div class="ritui">
            <div class="back">
                <router-link
                    to="/recommend"
                    tag="span"
                    class="iconfont icon-zuo"
                >
                </router-link>
                <router-link to="/recommend" class="title" tag="span">
                    每日推荐
                </router-link>
            </div>

            <div class="warning" v-if="!isShow">请先登录再查看日推歌曲</div>

            <div class="playAll" v-if="isShow">
                <span class="iconfont icon-bofang"></span> 播放全部
            </div>

            <div
                class="songList"
                v-for="(item, index) in (picUrl, arName, songsName, songs)"
                :key="index"
            >
                <div class="songitem">
                    <div class="img">
                        <img
                            :src="picUrl[index]"
                            alt=""
                            @click="setId(songs[index].id)"
                        />
                    </div>

                    <div>
                        <p class="songnames">{{ songsName[index] }}</p>
                        <p class="arname">{{ arName[index] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 无法获取数据的接口
import { getremSongs } from "../../api/base";
export default {
    data() {
        return {
            isShow: false,
            songs: null, //songs.id是单曲id
            ar: null,
            songsName: [], //歌名
            arName: [], //歌手名
            picUrl: [], //图片路径
        };
    },
    methods: {
        // 获取每日推荐
        getremSongsFun() {
            let cookie = localStorage.getItem("cookie");
            getremSongs(cookie).then((data) => {
                if (data.code == 301) {
                    this.isShow = false;
                } else if (data.code == 200) {
                    this.isShow = true;
                    console.log(data);
                    this.songs = data.data.dailySongs;
                    // 将歌名,歌手名,图片路径推入数组
                    for (let item in this.songs) {
                        this.songsName.push(this.songs[item].name);

                        this.ar = this.songs[item].ar;

                        this.arName.push(this.ar[0].name);

                        this.picUrl.push(this.songs[item].al.picUrl);
                    }
                }
            });
        },
        setId(id) {
            this.$emit("get-player-id", id);
        },
    },
    created() {
        this.getremSongsFun();
    },
};
</script>
<style lang="less">
.back {
    font-size: 18px;
    margin-left: 12px;
    .title {
        height: 50px;
        line-height: 50px;
        text-indent: 5px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
    }
}
.warning {
    margin-left: 10px;
}
.playAll {
    margin-left: 5px;
}

.songitem {
    display: flex;
    margin-top: 10px;

    .img {
        margin-left: 5px;
        margin-right: 5px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 8px;
        }
    }
    .songnames {
        font-size: 16px;
        margin: 5px 0px;
    }
    .arname {
        font-size: 12px;
        color: #7e7e7e;
    }
}
</style>