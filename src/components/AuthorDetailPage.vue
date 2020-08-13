<template>
	<div id="authorDetail">
		<goBackButton />
		<div class="topbar">
			<p>{{ authorName }}</p>
			<p>[{{ dynasty }}] {{ birthYear }}-{{ deathYear }}</p>
			<b-form-textarea class="topbarDesc" plaintext no-resize v-model="desc"></b-form-textarea>
		</div>
		<div class="subfield"></div>
		<div class="mycontainer" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
			<!-- container-fluid的作用是100%的宽度，占据全部视口（viewport）的宽度  justify-content-center -->
			<div class="container-fluid">
				<div id="rowdiv" class="row">
					<div class="mycol col-12 " v-for="data in contentList" @click="goDetailPage(data.id)">
						<div class="listItem mt-2">
							<div class="listItembox">
								<span>{{ data.title }}</span>
								<b-form-textarea class="poemContent" plaintext no-resize v-model="data.content"></b-form-textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
			<scrollTop />
		</div>
		<div class="loading" v-if="!loadingEnd">
			<b-spinner class="loadItem"></b-spinner>
		</div>
		<p class="mb-0" :class=" {'invisible': notEnd  }">没有更多了～</p>
	</div>
</template>

<script>
	export default {
		name: 'authorDetail',
		data() {
			return {
				contentList: [],
				loadingEnd: false,
				author: null,
				authorName: '',
				dynasty: '',
				birthYear: '',
				deathYear: '',
				desc: '',
				notEnd: true, // 是否加载完成
				lastPage: false,
				page: 1,
				busy: false,
			};
		},
		mounted() {
			this.getAuthorDetail();
			this.loadMore();
		},
		activated() {
			const scrollTop = this.$route.meta.scrollTop;
			const $content = document.querySelector('.mycontainer');
			if (scrollTop && $content) {
				$content.scrollTop = scrollTop;
			}
		},
		methods: {
			goDetailPage(id) {
				this.$router.push({
					path: 'poetryDetail',
					query: {
						workId: id
					}
				})
			},
			getAuthorDetail() {
				this.$http.get(this.$base.format(
						this.$store.state.url.getAuthorDetail, this.$route.query.authorId))
					.then(response => {
						this.authorName = response.data.name;
						this.dynasty = response.data.dynasty;
						this.birthYear = response.data.birthYear;
						this.deathYear = response.data.deathYear;
						this.desc = response.data.desc;
						this.loadingEnd = true;
					})
					.catch(err => {
						console.log(err);
						this.busy = false;
					})
			},
			loadMore() {
				this.busy = true;
				if (this.lastPage) {
					this.notEnd = false;
				} else {
					this.$http.get(this.$base.format(
							this.$store.state.url.getPoetryList, this.page,
							this.$route.query.dynasty, '', '', this.$route.query.authorName, ''))
						.then(response => {
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
	#authorDetail {
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		align-items: center;
		padding: 0 0 2.5vw 0;
	}

	#authorDetail .subfield {
		width: 100%;
		height: 5vw;
		background-color: #f6f1e8;
		flex: none;
	}

	#authorDetail .mycontainer {
		width: 95%;
		flex: 1;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	#authorDetail .mycontainer p {
		position: relative;
		bottom: 0;
	}

	#authorDetail .topbar {
		width: 95%;
		height: 25vh;
		flex: none;
		border-radius: 10px;
		border: #dabc95 1px solid;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		flex-wrap: inherit;
		justify-content: left;
		padding: 0.5rem;
		margin-bottom: 2vw;
	}

	#authorDetail .topbar p {
		margin-bottom: 0.5rem;
		/* 		width: 15vw; */
		font-size: 5vw;
	}

	#authorDetail .topbar p:nth-child(1) {
		color: #cd8474;
		font-size: 1.5rem;

	}

	#authorDetail .topbar p:nth-child(2) {
		font-size: 1rem;
	}

	#authorDetail .topbar .topbarDesc {
		flex: 1;
	}

	#authorDetail .mycol {
		padding: 0 !important;
	}

	#authorDetail .listItem {
		width: 100%;
		/* 	height: 25vh; */
		border-radius: 10px;
		border: #dabc95 1px solid;
		padding: 0.5rem 1rem;
	}

	#authorDetail .listItembox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-items: center;
		align-content: center;
	}

	#authorDetail .listItem span {
		margin-bottom: 0;
		width: 100%;
		color: #565656;
	}

	#authorDetail .listItem span:nth-child(1) {
		color: #cd8474;
		font-size: 1.1rem;
		margin-top: 2vw;
	}

	#authorDetail .listItem .poemContent {
		text-align: center;
		height: 2rem;
		line-height: 2;
		overflow-y: hidden;
	}

	#authorDetail .loading {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		z-index: 50;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}

	#authorDetail .loadItem {
		flex: none;
		color: #dabc95;
	}
</style>
