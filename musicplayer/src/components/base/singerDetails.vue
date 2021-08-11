<template>
    <div>
        <div class="singerDetails">
            <router-link
                to="/recommend"
                tag="div"
                class="back iconfont icon-zuo"
            >
                返回
            </router-link>
            歌手主页
        </div>
    </div>
</template>
<script>
import {
    // getArtistdesc,
    getArtist,
    // getArtistSong,
    // getArtistMv,
} from "../../api/singer";
export default {
    data() {
        return {};
    },
    created() {
        this.getArtistFun();
    },
    methods: {
        getArtistFun() {
            let id = 6452;
            getArtist({ id: id }).then((data) => {
                console.log(data);
            });
        },
    },
};
</script>
<style lang="less">
.back {
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    margin-left: 15px;
}
</style>