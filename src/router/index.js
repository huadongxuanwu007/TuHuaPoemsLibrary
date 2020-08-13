import VueRouter from "vue-router";
import base from "../js/base.js";
import store from "../store/index.js";

const router = new VueRouter({
	routes: [{
		name: 'home',
		path: '/home',
		component: (resolve) => require(['../components/HomePage.vue'], resolve),
		meta: {
			keepAlive: true,
			scrollTop: 0,
		}
	},{
		name: 'pcHome',
		path: '/pcHome',
		component: (resolve) => require(['../components/PCHomePage.vue'], resolve),
		meta: {
			keepAlive: true,
			scrollTop: 0,
		}
	}, {
		name: 'search',
		path: '/search',
		component: (resolve) => require(['../components/SearchPage.vue'], resolve),
		meta: {
			keepAlive: true,
			scrollTop: 0,
		}
	}, {
		name: 'collectionDetail',
		path: '/collectionDetail',
		component: (resolve) => require(['../components/CollectionDetailPage.vue'], resolve),
		meta: {
			keepAlive: true,
			scrollTop: 0,
		}
	}, {
		name: 'authorDetail',
		path: '/authorDetail',
		component: (resolve) => require(['../components/AuthorDetailPage.vue'], resolve),
		meta: {
			keepAlive: true,
			scrollTop: 0,
		}
	}, {
		name: 'poetryDetail',
		path: '/poetryDetail',
		component: (resolve) => require(['../components/PoetryDetailPage.vue'], resolve),
		meta: {
			keepAlive: false,
			scrollTop: 0,
		}
	}, {
		name: 'nofind',
		path: '*',
		component: (resolve) => require(['../components/NofindPage.vue'], resolve),
		meta: {
			keepAlive: false,
			scrollTop: 0,
		}
	}]
})

var routerList = [];
router.beforeEach((to, from, next) => {
	var li = routerList.length;
	store.commit('addRouterHistoryLength',1);
	store.commit('changeVisibility', true);
	if (li > 0 && routerList[li - 1] == to.name) {
		/*
		  如果发现to.name等于list中当前最后一个，则说明是返回操作。
		  返回操作的时候，第一步是从list中清掉第一个路由对象。
		  第二步是判断一下当前的from.name是不是在缓存属性中，在的话，就从里面拿掉，因为下一次进入的时候，
		  要重新刷新。
		 */
		routerList.splice(routerList.length - 1, 1);
		if (store.state.includedComponents.indexOf(from.name) > -1) {
			store.commit('removeInclude', from.name);
			store.commit('addToExclude', from.name);
			if (from.meta.keepAlive) {
				from.meta.scrollTop = 0;
			}
		}
	} else {
		if (!base.isEmpty(from.name)) {
			routerList.push(from.name);
			if (from.meta.keepAlive) {
				const $content = document.querySelector('.mycontainer');
				const scrollTop = $content ? $content.scrollTop : 0;
				from.meta.scrollTop = scrollTop;
			}
			if (store.state.excludedComponents.indexOf(to.name) > -1) {
				store.commit('removeExclude', to.name);
				store.commit('addToInclude', to.name);
			}
		}
	}
	next();
});
export default router;
