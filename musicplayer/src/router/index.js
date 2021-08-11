import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from "../views/recommend.vue";  //同步路由加载
import guidePage from "../components/public/guidePage.vue";  //同步路由加载
import search from "../components/base/search.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/recommend"
  },
  {
    path: "/guidePage",
    name: "guidePage",
    component: guidePage
  },
  {
    path: "/recommend",
    name: "recommend",
    // 添加路由元信息
    meta: {
      headerNav: true
    },
    component: recommend,
  },
  {
    path: "/singer",
    name: "singer",
    meta: {
      headerNav: true
    },
    component: () => import("../views/singer.vue")  //懒加载
  },
  {
    path: "/rank",
    name: "rank",
    meta: {
      headerNav: true
    },
    component: () => import("../views/rank.vue")
  },
  {
    path: "/rank/ranklist",
    name: "ranklist",
    component: () => import("../components/rank/ranklist.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login/login.vue")
  },
  {
    path: "/search",
    name: "search",
    // component: () => import("../components/base/search.vue")
    component: search,

  },
  {
    path: "/gotoLogin",
    name: "gotoLogin",
    component: () => import("../components/login/gotoLogin.vue")
  },
  {
    path: "/phoneLogin",
    name: "phoneLogin",
    component: () => import("../components/login/phoneLogin.vue")
  },
  {
    path: "/newmv",
    name: "newmv",
    meta: {
      headerNav: true
    },
    component: () => import("../views/newmv.vue")
  },
  {
    path: "/diantai",
    name: "diantai",
    component: () => import("../components/remFun/diantai.vue")
  },
  {
    path: "/FM",
    name: "FM",
    component: () => import("../components/remFun/FM.vue")
  },
  {
    path: "/ritui",
    name: "ritui",
    component: () => import("../components/remFun/ritui.vue")
  },
  {
    path: "/zhibo",
    name: "zhibo",
    component: () => import("../components/remFun/zhibo.vue")
  },
  {
    path: "/player",
    name: "player",
    component: () => import("../components/base/player.vue")
  },
  {
    path: "/mvDetails/:id",
    name: "mvDetails",
    component: () => import("../components/base/mvDetails.vue")
  },
  {
    // 歌手详情信息
    path: "/singerDetails",
    name: "singerDetails",
    component: () => import("../components/base/singerDetails.vue")
  },
  {
    // 最新专辑的内容
    path: "/albumDetails",
    name: "albumDetails",
    component: () => import("../components/base/albumDetails.vue")
  },
  {
    // 个人中心
    path: "/userCenter",
    name: "userCenter",
    component: () => import("../components/base/userCenter.vue")
  },
  {
    // 个人中心歌单
    path: "/userPlayList",
    name: "userPlayList",
    component: () => import("../components/base/userPlayList.vue")
  },
  {
    // 首页推荐歌单
    path: "/comPlyaList",
    name: "comPlyaList",
    component: () => import("../components/base/comPlyaList.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 判断是否已经登录
// router.beforeEach((to, from, next) => {
//   let login = window.localStorage.getItem("login");
//   // 登录界面
//   if (to.path == "/login") {
//     next();
//     return;
//   } else {
//     // 判断登录情况
//     if (!login) {
//       next("/login");
//       return;
//     } else {
//       next();
//     }
//   }
// })

export default router
