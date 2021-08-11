<template>
    <div>
        <div class="mvlists" ref="mvlists">
            <van-loading v-if="falgload" type="spinner" color="#D4473C" />
            <ul>
                <li v-for="(item, index) in mvList" :key="index">
                    <div
                        class="imgs"
                        v-show="playNum != index"
                        @click="getUrlShow(index, item.id)"
                        :style="{
                            'background-image': 'url(' + item.cover + ')',
                            'background-size': 'cover',
                        }"
                    >
                        <span class="iconfont icon-arrow-right-filling"></span>
                    </div>
                    <div
                        class="imgs"
                        v-show="playNum == index"
                        @click="mvPlayend"
                    >
                        <video
                            :src="item.mvurl"
                            controls
                            :ref="'video' + index"
                            @loadeddata="loadeddataFun"
                        ></video>
                    </div>
                    <p @click="getTo(item.id)">{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getMvList, getMvUrl } from "../api/mv.js";
export default {
    data() {
        return {
            mvList: [],
            playNum: null,
            offset: 0, //偏移数量 , 用于分页
            flag: true,
            falgload: true,
        };
    },
    created() {
        getMvList({
            limit: 5,
            offset: this.offset,
        }).then((data) => {
            console.log(data);
            this.mvList = data.data;
            console.log(this.mvList);
            this.falgload = false;
        });
    },
    methods: {
        getTo(id) {
            this.$router.push({ path: `/mvDetails/${id}` });
        },
        getUrlShow(index, id) {
            if (this.playNum || this.playNum == 0) {
                this.$refs["video" + this.playNum][0].pause();
            }
            this.playNum = index;
            getMvUrl({ id }).then((data) => {
                console.log(data);
                // this.mvList[index].mvurl = data.data.url;
                // 数据没有通过视图
                this.$set(this.mvList[index], "mvurl", data.data.url);
            });
        },
        loadeddataFun(event) {
            event.target.play();
        },
        mvPlayend() {
            // console.log(this.$refs['video' + this.playNum]);
            this.$refs["video" + this.playNum][0].pause();
            this.playNum = null;
        },
        // 添加数据
        addData() {
            // 防抖
            if (this.flag) {
                this.flag = false;
                this.offset += 5; //第五条数据后添加五条数据
                getMvList({
                    limit: 5,
                    offset: this.offset,
                }).then((data) => {
                    console.log(data);
                    this.mvList = this.mvList.concat(data.data);
                    this.flag = true;
                });
            }
        },
        // 滚动条监听
        handleScroll() {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop; //滚动条偏移量
            let lis = this.$refs.mvlists.getElementsByTagName("li");
            let num = lis.length;
            let liHeight = lis[num - 3].offsetTop;
            if (scrollTop > liHeight) {
                //触发添加数据
                this.addData();
            }
        },
    },

    mounted() {
        this.$nextTick(() => {
            // 监听滚动事件
            window.addEventListener("scroll", this.handleScroll);
        });
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>

<style lang="less" scoped>
.van-loading {
    text-align: center;
}
.mvlists {
    width: 100%;
    li {
        .imgs {
            width: 100%;
            height: 211px;
            background-repeat: no-repeat;
            background-size: contain;
            position: relative;
            text-align: center;
            span {
                position: absolute;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                margin: auto;
                width: 40px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                color: #fff;
                font-size: 24px;
            }
            video {
                height: 211px;
                margin: 0 auto;
                display: block;
            }
        }
        p {
            font-size: 14px;
            padding: 10px;
        }
    }
}
</style>