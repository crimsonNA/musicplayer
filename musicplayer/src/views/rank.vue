<template>
    <div>
        <div class="toplist">
            <van-loading v-if="flag" type="spinner" color="#D4473C" />
            <div class="item" v-for="(item, index) in lists" :key="index">
                <div class="img">
                    <router-link :to="'/rank/ranklist?id=' + item.id">
                        <img :src="item.coverImgUrl" alt="" />
                    </router-link>
                </div>
                <ul>
                    <li v-for="(key, i) in item.tracks" :key="i" v-show="i < 3">
                        {{ i + 1 }}.{{ key.name }} - {{ key.ar[0].name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getTopList, getPlaylistDetail } from "../api/rank";

export default {
    data() {
        return {
            lists: [],
            flag: true,
        };
    },
    // 组件路由最早钩子
    beforeRouteEnter(to, from, next) {
        // 第一种写法,页面渲染前获取数据
        // 请求一个接口
        getTopList().then((data) => {
            // next();//跳转路由
            // 指定methods数据方法 调用方法
            next((vm) => vm.getPlaylistDetailFun(data.list));
        });
    },

    methods: {
        getPlaylistDetailFun(list) {
            for (let i = 0; i < list.length; i++) {
                let id = list[i].id;
                getPlaylistDetail({ id }).then((data) => {
                    // console.log(data);
                    this.lists.push(data.playlist);
                });
            }
            this.flag = false;
        },
    },
    created() {
        // 第一种写法,页面渲染后获取数据
        // 排行榜
        // getTopList().then(data=>{
        //     // console.log(data);
        //     for(let i = 0;i < data.list.length;i++){
        //         let id = data.list[i].id;
        //         getPlaylistDetail({id}).then(data=>{
        //             console.log(data.playlist)
        //             this.lists.push(data.playlist);
        //         })
        //     }
        // })
    },
    mounted() {
        // console.log(this.lists);
    },
};
</script>

<style lang="less">
.van-loading {
    margin-top: 50px;
    text-align: center;
}
.toplist {
    margin-top: 5px;
    .item {
        margin: 0px 8px;
        padding: 2px 0px;
        border-bottom: 1px solid #e1e2e2;
        height: 90px;
        display: flex;
        .img {
            flex: 0 0 90px;
            margin-right: 18px;
            background-color: chocolate;
            width: 90px;
            height: 90px;
            border-radius: 2px;
            img {
                width: 90px;
                height: 90px;
            }
        }
        ul {
            flex: 1;
            height: 90px;
            margin-top: 4px;
            li {
                height: 27px;
                line-height: 27px;
                font-size: 12px;
                color: #1b1b28;
                overflow: hidden;
            }
        }
    }
}
</style>