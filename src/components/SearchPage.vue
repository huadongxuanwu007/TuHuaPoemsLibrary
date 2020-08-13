-<template>
	<div id="searchPage">
		<div class="topbar">
			<div class="searchBar">
				<div class="searchBox">
					<b-icon class="ic ml-4 mr-2" icon="search" variant="#747474"></b-icon>
					<input ref="search" class="search" v-model="searchpro" type="text" placeholder="请输入关键字继续" @keyup.enter="search">
					<b-icon class="ic mr-4" icon="x-circle" variant="#747474" :class="{ 'invisible': searchpro == '' }" @click="cleardata"></b-icon>
				</div>
			</div>
		</div>
		<goBackButton/>
		<div class="mycontainer" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
			<!-- container-fluid的作用是100%的宽度，占据全部视口（viewport）的宽度  justify-content-center -->
			<div class="container-fluid">
				<div id="rowdiv" class="row">
					<div class="mycol col-12 " v-for="data in contentList" @click="goDetailPage(data.id)">
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
		<div class="topSearch" v-if="!startSearch">
			<p>热门推荐</p>
			<div class="topSearchItem" v-for="data in topSearchList" @click="onClick(data)">
				<span>{{ data }}</span>
			</div>
		</div>
		<p class="mb-0" :class=" {'invisible': notEnd  }">没有更多了～</p>
	</div>
</template>

<script>
	export default {
		name: 'search',
		data() {
			return {
				contentList: [],
				startSearch: false,
				empty: false,
				searchpro: '',
				notEnd: true, // 是否加载完成
				lastPage: false,
				page: 1,
				busy: true,
				topSearchList: [
					"水调歌头",
					"如梦令",
					"将进酒",
					"满江红",
					"元日",
					"浣溪沙",
					"爱莲说",
					"鹊桥仙",
					"沁园春",
					"春望",
					"苏幕遮",
					"点绛唇"
				],
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.$refs.search.focus();
			})
		},
		activated() {
			const scrollTop = this.$route.meta.scrollTop;
			const $content = document.querySelector('.mycontainer');
			if (scrollTop && $content) {
				$content.scrollTop = scrollTop;
			}
		},
		methods: {
			cleardata() {
				this.busy = true;
				const $content = document.querySelector('.mycontainer');
				if (scrollTop && $content) {
					$content.scrollTop = 0;
				}
				this.contentList.length = 0;
				this.searchpro = '';
				this.startSearch = false;
				this.lastPage = false;
				this.notEnd = true;
				this.page = 1;

			},
			onClick(input) {
				this.busy = true;
				const $content = document.querySelector('.mycontainer');
				if (scrollTop && $content) {
					$content.scrollTop = 0;
				}
				this.searchpro = input;
				this.lastPage = false;
				this.notEnd = true;
				this.page = 1;
				this.contentList.length = 0;
				this.loadMore();
				this.startSearch = true;
			},
			search() {
				this.busy = true;
				const $content = document.querySelector('.mycontainer');
				if (scrollTop && $content) {
					$content.scrollTop = 0;
				}
				this.$nextTick(() => {
					this.$refs.search.blur();
				})
				this.lastPage = false;
				this.notEnd = true;
				this.page = 1;
				this.contentList.length = 0;
				this.loadMore();
				this.startSearch = true;
			},
			loadMore() {
				this.busy = true;
				if (this.lastPage) {
					this.notEnd = false;
				} else {
					this.$http.get(this.$base.format(this.$store.state.url.getPoetryList, this.page,'',
							this.searchpro,'','',''))
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
			goDetailPage(input) {
				this.$router.push({
					path: 'poetryDetail',
					query: {
						workId: input
					}
				})
			}
		},
	}
</script>

<style>
	#searchPage {
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		align-items: center;
	}

	#searchPage .topbar {
		width: 100%;
		flex: none;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#searchPage .searchBar {
		background-color: #dabc95;
		height: 13vw;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}

	#searchPage .searchBox {
		background-color: #ffffff;
		height: 70%;
		width: 90%;
		border-radius: 10vw;
		display: flex;
		display: -webkit-flex;
		justify-content: stretch;
		align-items: center
	}

	#searchPage .searchBox .ic {
		flex: none;
		width: 5vw;
		height: 5vw;
	}

	#searchPage .searchBox .search {
		flex: 1;
		background: none;
		outline: none;
		border: none;
		font-size: 5vw;
	}

	#searchPage .searchBox .search::-webkit-input-placeholder {
		color: #ccc;
	}

	#searchPage .searchBox .search::-moz-placeholder {
		color: #ccc;
	}

	#searchPage .searchBox .search::-moz-placeholder {
		color: #ccc;
	}

	#searchPage .searchBox .search::-ms-input-placeholder {
		color: #ccc;
	}
	

	#searchPage .topSearch {
		position: fixed;
		top: calc(16vw + 5vh);
		height: 100%;
		background-color: #FFFFFF;
		z-index: 50;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: left;
		align-content: flex-start;
		padding: 1rem;
	}

	#searchPage .topSearch p {
		width: 100%;
		font-size: 2rem;
		text-align: left;
		margin-bottom: 0;
	}

	#searchPage .topSearchItem {
		flex: none;
		margin: 0.5rem 0.5rem;
		border-radius: 50px;
		border: #dabc95 2px solid;
		padding: 0.2rem 1rem;
	}

	#searchPage .topSearchItem span {
		font-size: 1.1rem;
	}

	#searchPage .mycontainer {
		width: 95%;
		flex: 1;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	#searchPage .mycontainer p {
		position: relative;
		bottom: 0;
	}

	#searchPage .mycol {
		padding: 0 !important;
	}

	#searchPage .listItem {
		width: 100%;
		border-radius: 10px;
		border: #dabc95 1px solid;
		padding: 0.5rem 1rem;
	}

	#searchPage .listItembox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-items: center;
		align-content: center;
	}

	#searchPage .listItem span {
		margin-bottom: 0;
		width: 100%;
		color: #565656;
	}

	#searchPage .listItem span:nth-child(1) {
		color: #cd8474;
		font-size: 1.5rem;
		margin-top: 2vw;
	}

	#searchPage .listItem span:nth-child(2) {
		font-size: 1rem;
		margin-top: 2vw;
	}

	#searchPage .poemContent {
		text-align: center;
		line-height: 2;
		overflow-y: hidden;
	}
</style>
