<template>
    <div>
        <div class="search">
            <div class="box"></div>
            <div class="input">
                <router-link to="./recommend" class="backto">
                    <span class="iconfont icon-zuo"></span>
                </router-link>
                <span class="iconfont icon-sousuo"></span>
                <input
                    type="text"
                    placeholder="搜索歌曲、歌手、专辑"
                    v-model="keywords"
                    @keyup.enter="getSearchFun"
                />
                <span class="iconfont icon-shanchu" @click="clearSearch"></span>
            </div>

            <div class="content" v-show="!isSearch">
                <div>
                    <p class="hot">热门搜索</p>
                    <ul class="main">
                        <li
                            v-for="(item, index) in Hot"
                            :key="index"
                            @click="getWord"
                        >
                            <p>
                                <span>{{ item.first }}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="searchList" v-show="isSearch">
                <ul>
                    <li
                        v-for="(item, index) in searchLists"
                        :key="index"
                        @click="setId(item.id)"
                    >
                        <div>
                            <p>{{ item.name }}</p>
                            <p>{{ item.artists[0].name }}</p>
                        </div>

                        <div>
                            <span class="iconfont icon-bofang"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
// 搜索建议接口
import {
    getsearchHot,
    getSearch,
    // getSuggest,
    // getSearchMultimatch,
} from "../../api/search";
// 搜索接口
// import { getsearchHot, getSearch } from "../../api/search";
export default {
    data() {
        return {
            searchLists: [],
            Hotlist: [],
            Hot: [],
            isSearch: false,
            keywords: "",
            id: null,
        };
    },
    methods: {
        getSearchFun() {
            this.isSearch = true;

            // getSuggest(this.keyword).then((data) => {
            //     if (data.code == 200) {
            //         this.searchLists = data.result.songs;
            //         console.log(this.searchLists);
            //         this.id = data.id;
            //     }
            // });
            getSearch({ keywords: this.keywords }).then((data) => {
                console.log(data);
                this.searchLists = data.result.songs;
            });
        },
        getWord(event) {
            console.log(event.target.innerText);
            this.keywords = event.target.innerText;
        },
        clearSearch() {
            this.keywords = "";
            this.isSearch = false;
        },
        setId(id) {
            this.$emit("get-player-id", id);
        },
    },

    created() {
        getsearchHot().then((data) => {
            this.Hotlist = data.result;
            this.Hot = this.Hotlist.hots;
        });
    },
};
</script>
<style lang="less">
.backto {
    position: absolute;
    top: 15px;
    left: -5px;
    span {
        font-size: 20px;
    }
}
.box {
    width: 100%;
    height: 15px;
}

.input {
    width: 300px;
    background-color: #e0e0e0;
    height: 35px;
    line-height: 35px;
    border-radius: 30px;
    margin: 0 auto;
    span {
        margin-left: 15px;
    }
    span:nth-child(4) {
        margin-left: 45px;
    }
    input {
        height: 35px;
        text-indent: 10px;
        box-shadow: none;
        outline: none;
        border: none;
        background-color: #e2e2e2;
    }
}
.content {
    .hot {
        margin: 10px;
    }
    .main {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 10px;
        li {
            p {
                display: inline-block;
                border: 1px solid #b2b2b2;
                font-size: 16px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                border-radius: 28px;
                margin: 5px 5px;
                span {
                    margin: 0px 10px;
                }
            }
        }
    }
}
.searchList {
    margin-top: 30px;
    ul {
        li {
            margin-left: 5px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e9e9e9;
            div:nth-child(1) {
                p:nth-child(1) {
                    margin-left: 5px;
                    margin-bottom: 5px;
                }
                p:nth-child(2) {
                    margin-left: 5px;
                    margin-bottom: 5px;
                    font-size: 14px;
                    color: #b2b2b2;
                }
            }
            div:nth-child(2) {
                span {
                    font-size: 24px;
                    color: #b2b2b2;
                    display: block;
                    height: 50px;
                    line-height: 50px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>