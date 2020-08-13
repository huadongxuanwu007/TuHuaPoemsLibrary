import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from "axios";
import base from "./js/base.js";
import store from "./store/index.js";
import router from './router/index.js';
import infiniteScroll from 'vue-infinite-scroll'
import {
	BootstrapVue,
	IconsPlugin
} from 'bootstrap-vue'
import ScrollTop from './components/ScrollTop.vue'


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.component('scrollTop', ScrollTop)
Vue.prototype.$base = base;
Vue.prototype.$store = store;
Vue.config.productionTip = false;



Vue.filter('toaddress', function(extra) {
	var array = extra.split("·");
	var newextra = array[0] + '·' + array[1];
	return newextra;
});



// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
	// router: myrouter,
	router: router,
	store: store,
	render: h => h(App),
	mounted() {
		return this.$router.push({
			path: 'home'
		});
	}
}).$mount('#app')
