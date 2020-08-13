<template>
	<div id="app" class="sticky-top">
		<div id="title">
			<b-icon icon="chevron-left" variant="white" style="position: fixed; left: 1.5rem; width: 5vw; height:5vw;" @click="goBackPage"
			 v-show="$store.state.gobackButtonVisibility"></b-icon>
			<span>趣学诗文数据库</span>
		</div>
		<div class="view">
			<keep-alive :include="includedComponents" :exclude="excludedComponents">
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				visiable: false, //默认不显示,
				routerHistoryLength: 0,
			};
		},
		computed: {
			includedComponents() {
				return this.$store.state.includedComponents;
			},
			excludedComponents() {
				return this.$store.state.excludedComponents;
			}

		},
		methods: {
			goBackPage() {
				console.log("路由历史：", this.$store.state.routerHistoryLength);
				if (this.$store.state.routerHistoryLength > 1) {
					this.$router.go(-1);
				} else {
					this.$router.replace({
						path: 'home'
					});
				}
				this.$store.state.routerHistoryLength--;
			},
		},
	};
</script>

<style>
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
	}

	div {
		margin: 0;
		padding: 0;
	}

	#title {
		height: calc(3vw + 4vh);
		background-color: #dabc95;
		display: flex;
		display: -webkit-flex;
		/* Safari */
		justify-content: center;
		align-items: center;
	}

	#title span {
		color: #ffffff;
		font-size: calc(1em + 2vw);

	}

	.view {
		position: absolute;
		top: calc(3vw + 4vh);
		width: 100%;
		height: 100%;
	}

	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		width: 100%;
		margin: 0 10px;
		font: 5vw sans-serif;
	}

	a {
		color: #42b983;
	}
</style>
