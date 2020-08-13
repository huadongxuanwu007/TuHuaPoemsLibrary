<template>
	<div id="app" class="sticky-top">
		
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
	};
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		height: 100%;
	}

	div {
		margin: 0;
		padding: 0;
	}

	
	.view {
		
		width: 100%;
		height: 100%;
	}

	
</style>
