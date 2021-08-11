import Vue from 'vue'
import vant from "vant"
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// $cnpm i vant -S
import "vant/lib/index.css"
Vue.use(vant);
// 字体图标
import "./assets/font/iconfont.css"
import "swiper/css/swiper.min.css";
// $cnpm i axios -S

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
