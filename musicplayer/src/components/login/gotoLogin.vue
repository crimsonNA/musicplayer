<template>
    <div>
        <div class="gotoLogin">
            <p>登录后即可查看个人中心</p>
            <router-link to="/login" tag="div">立即登录</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showplayer: true,
        };
    },
    methods: {},
};
</script>
<style lang="less">
.gotoLogin {
    text-align: center;
    p {
        margin-top: 30px;
    }
    div {
        margin: 0 auto;
        margin-top: 20px;
        height: 30px;
        line-height: 30px;
        width: 80px;
        border: 1px solid #b2b2b2;
        border-radius: 30px;
    }
}
</style>