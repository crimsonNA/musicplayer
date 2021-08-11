<template>
    <div>
        <div class="fm">
            <router-link
                to="/recommend"
                tag="div"
                class="back iconfont icon-zuo"
                ><span>FM</span></router-link
            >FM的内容
        </div>
    </div>
</template>
<script>
import { getFm } from "../../api/FM";
export default {
    data() {
        return {};
    },
    methods: {
        getFmFun() {
            let cookie = window.localStorage.getItem("cookie");
            getFm({ cookie: cookie }).then((data) => {
                console.log(data);
            });
        },
    },
    created() {
        this.getFmFun();
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