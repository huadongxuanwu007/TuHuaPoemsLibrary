<template>
	<div id="collectionDetail">
		<div class="topbar">
			<span>{{ collectionName }}</span>

		</div>
		<div class="mycontainer" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
			<!-- container-fluid的作用是100%的宽度，占据全部视口（viewport）的宽度  justify-content-center -->
			<div class="container-fluid">
				<div id="rowdiv" class="row">
					<div class="mycol col-12 " v-for="data in contentList" @click="goDetailPage(data.workId)">
						<div class="listItem mt-2">
							<div class="listItembox">
								<span>{{ data.title }}</span>
								<span>{{ data.dynasty }} · {{ data.authorName }}</span>
								<b-form-textarea class="poemContent" plaintext no-resize v-model="data.content"></b-form-textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<scrollTop />
		</div>
		<p class="mb-0" :class=" {'invisible': notEnd  }">没有更多了～</p>
	</div>
</template>

<script>
	export default {
		name:'collectionDetail',
		data() {
			return {
				contentList: [],
				collectionName: '',
				collectionId: 0,
				notEnd: true, // 是否加载完成
				lastPage: false,
				page: 1,
				busy: false,
			};
		},
		mounted() {
			console.log("加载数据：",this.$options.name);
			this.collectionName = this.$route.query.collectionName;
			this.collectionId = this.$route.query.collectionId;
			this.loadMore();
		},activated() {
		    const scrollTop = this.$route.meta.scrollTop;
		    const $content = document.querySelector('.mycontainer');
		    if (scrollTop && $content) {
		      $content.scrollTop = scrollTop;
		    }
		},
		methods: {
			goDetailPage(id) {
				this.$router.push({
					path: 'poemtryDetail',
					query: {
						workId: id
					}
				})
			},
			loadMore() {
				this.busy = true;
				if (this.lastPage) {
					this.notEnd = false;
				} else {
					this.$http.get(this.$base.format(
							"https://wx.tuhua.ink/api/app/poetrydetails?page={0}&size=10&dynasty=&key=&kindCN=&authorName=&collectionId={1}", this.page,
							this.collectionId))
						.then(response => {
							console.log("data:", response.data);
							this.contentList = this.contentList.concat(response.data);
							if (response.data.length < 10) {
								this.lastPage = true;
							}
							this.busy = false;
							this.page++;
						})
						.catch(err => {
							console.log(err);
							this.busy = false;
						})
				}
			},
		},
	};
</script>

<style>
	#collectionDetail {
		width: 100%;
		height: calc(96vh - 3vw);
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		/* justify-items: center; */
		/* padding: 0 2.5vw; */
	}
	#collectionDetail .topbar {

		width: 100%;
		flex: none;
		height: 15vh;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		border-bottom: #f6f1e8 1rem solid;
	}

	#collectionDetail .topbar span {
		/* 		width: 15vw; */
		text-align: center;
		flex: none;
		color: #747474;
		font-size: 10vw; 
	}
	#collectionDetail .mycontainer {
		width: 100%;
		flex: 1;
		padding: 0 2.5vw;
		overflow-y: auto;
	}

	#collectionDetail .mycontainer p {
		position: relative;
		bottom: 0;
	}




	#collectionDetail .mycol {
		padding: 0 !important;
	}

	#collectionDetail .listItem {
		width: 100%;
		/* 	height: 25vh; */
		border-radius: 10px;
		border: #dabc95 1px solid;
		padding: 0.5rem 1rem;
	}

	#collectionDetail .listItembox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		display: flex;
		display: -webkit-flex;
		/* 		flex-wrap: wrap; */
		flex-direction: column;
		justify-items: center;
		align-content: center;
	}

	#collectionDetail .listItem span {
		margin-bottom: 0;
		width: 100%;
		color: #565656;
	}

	#collectionDetail .listItem span:nth-child(1) {
		color: #cd8474;
		font-size: 1.3rem;
		margin-top: 1vw;
	}

	#collectionDetail .listItem span:nth-child(2) {
		font-size: 1rem;
		margin-top: 1vw;
	}

	/* #collectionDetail .listItem span:nth-child(3) {
		font-size: 1rem;
		text-align: left;
		text-wrap: wrap;

	} */

	#collectionDetail .poemContent {
		/* margin-top: 2vw; */
		text-align: center;
		/* background-color: #fff;
		border: none; */
		line-height: 2;
		overflow-y: hidden;
	}
</style>
