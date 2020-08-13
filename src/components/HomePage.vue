<template>
	<div id="homePage">
		<!-- sticky-top -->
		<div class="topbar">
			<div class="searchBar">
				<div class="searchBox" @click="goToSearchPage">
					<b-icon icon="search" variant="dark" style="width: 5vw; height:5vw;" class="ml-4 mr-2"></b-icon>
					<span>请输入关键字继续</span>
				</div>
			</div>
			<div class="labelBar">
				<div class="labelContent" v-for="classification in classifications" :class="{'nowChoose':classification.isChoose}"
				 @click="changeclassification(classification)">
					<a>{{ classification.name }}</a>
					<div class="underLine"></div>
				</div>
			</div>
		</div>
		<component v-bind:is="nowComponent"></component>
	</div>
</template>

<script>
	export default {
		name:'home',
		data() {
			return {
				classifications: [{
						componentName: "classical",
						name: "分类",
						isChoose: false,
					},
					{
						componentName: "author",
						name: "作者",
						isChoose: false,
					},
					{
						componentName: "production",
						name: "作品",
						isChoose: false,
					},
					{
						componentName: "quotation",
						name: "名句",
						isChoose: false,
					},
					{
						componentName: "teaching",
						name: "教材",
						isChoose: false,
					},
				],
				nowComponent: null,
			}
		},
		components: {
			classical: (resolve) => require(['./Classical.vue'], resolve),
			author: (resolve) => require(['./Author.vue'], resolve),
			production: (resolve) => require(['./Production.vue'], resolve),
			quotation: (resolve) => require(['./Quotation.vue'], resolve),
			teaching: (resolve) => require(['./Teaching.vue'], resolve),
		},
		mounted() {
			this.changeclassification(this.classifications[0]);
		},
		activated() {
			this.$store.commit('changeVisibility',false);
		},
		methods: {
			changeclassification(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.classifications.forEach((item, index) => {
						item.isChoose = false;
					});
					this.nowComponent = nowChooseItem.componentName;
					nowChooseItem.isChoose = true;
				}
			},
			goToSearchPage() {
				this.$router.push({
					path: 'search',
				})
			}
		}
	}
</script>

<style scoped>
	#homePage {
		display: flex;
		width: 100%;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#homePage .topbar {
		width: 100%;
		flex: auto;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 1px 1px 1px #ddd;
		margin-bottom: 5px;
	}

	#homePage .searchBar {
		background-color: #dabc95;
		height: 13vw;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}

	#homePage .searchBox {
		background-color: #ffffff;
		height: 70%;
		width: 90%;
		border-radius: 10vw;
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center
	}

	#homePage .searchBox span {
		color: #757575;
		font-size: 5vw;
	}

	#homePage .labelBar {
		height: 12vw;
		width: 100%;
		background-color: #fff;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
	}

	#homePage .labelContent {
		flex: 0 0 20%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: baseline;
		align-items: center;
	}

	#homePage .labelContent a {
		font-size: 1.1em;
		color: #646464;
	}

	#homePage .nowChoose a {
		height: 1.3em;
		font-size: 1.3em;
	}

	#homePage .nowChoose .underLine {
		height: 1vw;
		width: 8vw;
		border-radius: 10vw;
		background-color: #dabc95;
	}
</style>
