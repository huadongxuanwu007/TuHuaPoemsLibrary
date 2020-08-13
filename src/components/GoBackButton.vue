<template>
	<div id="goBackButton">
		<div class="Button" @click="goBackPage">
			<b-icon class="gobackIcon" icon="chevron-left" variant="#747474" ></b-icon>
			<span>返回</span>
		</div>
	</div>
</template>

<script>
	export default {

		methods: {
			goBackPage() {
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
	#goBackButton {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
	}

	#goBackButton .Button {
		flex: none;
		margin: 0.625rem 0.625rem 0.625rem 0.625rem;
		padding: 0.1rem 0.65rem 0.1rem 0.25rem;
		border-radius: 5px;
		border: #dabc95 1px solid;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		z-index: 300;
	}
	#goBackButton .Button span{
		color: #747474;
	}
</style>
