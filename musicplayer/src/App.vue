<template>
    <div id="app">
        <div class="main">
            <!-- 顶部组件 -->
            <header-nav
                v-if="$route.meta.headerNav"
                @isPlayFun="isPlayFun"
            ></header-nav>

            <!-- 路由视图 -->
            <router-view
                @get-player-id="getPlayerId"
                @get-play-all-id="getPlayAllId"
            ></router-view>

            <!-- 播放音乐 -->
            <player
                @get-player-id="getPlayerId"
                v-show="isPlay"
                :player-id="playerId"
                :list-id="listId"
            ></player>

            <!-- 登录功能 -->
            <!-- <login class="login"></login> -->
        </div>
    </div>
</template>

<script>
import headerNav from "./components/base/headerNav.vue";
import player from "./components/base/player.vue";
export default {
    data() {
        return {
            playerId: null,
            listId: null,
            isplaymus: false,
            isPlay: false,
        };
    },
    components: {
        headerNav,
        player,
    },
    created() {
        console.log(this);
    },
    methods: {
        getPlayerId(id) {
            // console.log("歌曲id：", id);
            this.playerId = id;
            this.isPlay = true;
        },
        getPlayAllId(id) {
            this.listId = id;
            this.isPlay = true;
        },
        isPlayFun() {
            this.isPlay = null;
        },
    },
};
</script>

<style lang="less">
@import "./assets/css/base.css";
</style>