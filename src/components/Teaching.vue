<template>
	<div id="teaching">
		<div class="topbar">
			<p>小学：</p>
			<div class="booksList" :class="{ 'unfold':primaryUnfold }">
				<div class="books" v-for="primary in primaryList">
					<div class="booksItem" @click="onClick1(primary)" :class="{'booksnowChoose':primary.isChoose}"><span>{{ primary.name }}</span></div>
				</div>
			</div>
			<div class="unfoldBox" @click="unfoldChange1">
				<b-icon icon="chevron-down" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="!primaryUnfold"></b-icon>
				<b-icon icon="chevron-up" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="primaryUnfold"></b-icon>
			</div>
		</div>
		<div class="topbar">
			<p>初中：</p>
			<div class="booksList" :class="{ 'unfold':juniorUnfold }">
				<div class="books" v-for="junior in juniorList">
					<div class="booksItem" @click="onClick2(junior)" :class="{'booksnowChoose':junior.isChoose}"><span>{{ junior.name }}</span></div>
				</div>
			</div>
			<div class="unfoldBox" @click="unfoldChange2">
				<b-icon icon="chevron-down" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="!juniorUnfold"></b-icon>
				<b-icon icon="chevron-up" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="juniorUnfold"></b-icon>
			</div>
		</div>
		<div class="topbar">
			<p>高中：</p>
			<div class="booksList" :class="{ 'unfold':seniorHighUnfold }">
				<div class="books" v-for="seniorHigh in seniorHighList">
					<div class="booksItem" @click="onClick3(seniorHigh)" :class="{'booksnowChoose':seniorHigh.isChoose}"><span>{{ seniorHigh.name }}</span></div>
				</div>
			</div>
			<div class="unfoldBox" @click="unfoldChange3">
				<b-icon icon="chevron-down" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="!seniorHighUnfold"></b-icon>
				<b-icon icon="chevron-up" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="seniorHighUnfold"></b-icon>
			</div>
		</div>
		<div class="topbar">
			<p>经典：</p>
			<div class="booksList" :class="{ 'unfold':classicUnfold }">
				<div class="books" v-for="classic in classicList">
					<div class="booksItem" @click="onClick4(classic)" :class="{'booksnowChoose':classic.isChoose}"><span>{{ classic.name }}</span></div>
				</div>
			</div>
			<div class="unfoldBox" @click="unfoldChange4">
				<b-icon icon="chevron-down" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="!classicUnfold"></b-icon>
				<b-icon icon="chevron-up" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="classicUnfold"></b-icon>
			</div>
		</div>
		<div class="mycontainer" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50"
		 @touchstart="onSwipestart">
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
			<p class="mb-0" :class=" {'invisible': notEnd  }">没有更多了～</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				contentList: [],
				url: '',
				notEnd: true, // 是否加载完成
				lastPage: false,
				page: 1,
				busy: false,
				collectionId: 0,
				primaryUnfold: false,
				juniorUnfold: false,
				seniorHighUnfold: false,
				classicUnfold: false,
				primaryList: [{
						collectionId: 0,
						name: "不限",
						isChoose: false,
					},
					{
						collectionId: 114,
						name: "小学一册",
						isChoose: false,
					},
					{
						collectionId: 115,
						name: "小学二册",
						isChoose: false,
					},
					{
						collectionId: 116,
						name: "小学三册",
						isChoose: false,
					},
					{
						collectionId: 117,
						name: "小学四册",
						isChoose: false,
					},
					{
						collectionId: 118,
						name: "小学五册",
						isChoose: false,
					}, {
						collectionId: 119,
						name: "小学六册",
						isChoose: false,
					}, {
						collectionId: 120,
						name: "小学七册",
						isChoose: false,
					}, {
						collectionId: 121,
						name: "小学八册",
						isChoose: false,
					}, {
						collectionId: 122,
						name: "小学九册",
						isChoose: false,
					}, {
						collectionId: 123,
						name: "小学十册",
						isChoose: false,
					}, {
						collectionId: 124,
						name: "小学十一册",
						isChoose: false,
					}, {
						collectionId: 125,
						name: "小学十二册",
						isChoose: false,
					},
				],
				juniorList: [{
						collectionId: 0,
						name: "不限",
						isChoose: false,
					},
					{
						collectionId: 126,
						name: "初中一册",
						isChoose: false,
					},
					{
						collectionId: 127,
						name: "初中二册",
						isChoose: false,
					},
					{
						collectionId: 128,
						name: "初中三册",
						isChoose: false,
					},
					{
						collectionId: 129,
						name: "初中四册",
						isChoose: false,
					},
					{
						collectionId: 131,
						name: "初中五册",
						isChoose: false,
					}, {
						collectionId: 132,
						name: "初中六册",
						isChoose: false,
					},
				],

				seniorHighList: [{
						collectionId: 0,
						name: "不限",
						isChoose: false,
					},
					{
						collectionId: 133,
						name: "高中一册",
						isChoose: false,
					},
					{
						collectionId: 134,
						name: "高中二册",
						isChoose: false,
					},
					{
						collectionId: 135,
						name: "高中三册",
						isChoose: false,
					},
					{
						collectionId: 136,
						name: "高中四册",
						isChoose: false,
					},
					{
						collectionId: 137,
						name: "高中五册",
						isChoose: false,
					}, {
						collectionId: 138,
						name: "高中六册",
						isChoose: false,
					},
				],
				classicList: [{
						collectionId: 0,
						name: "不限",
						isChoose: false,
					},
					{
						collectionId: 1,
						name: "唐诗三百首",
						isChoose: false,
					},
					{
						collectionId: 2,
						name: "宋词三百首",
						isChoose: false,
					},
					{
						collectionId: 3,
						name: "给孩子的诗",
						isChoose: false,
					},
					{
						collectionId: 13,
						name: "诗经全集",
						isChoose: false,
					},
					{
						collectionId: 140,
						name: "幼学琼林",
						isChoose: false,
					},
					{
						collectionId: 14,
						name: "古诗十九首",
						isChoose: false,
					},
					{
						collectionId: 74,
						name: "乐府诗集",
						isChoose: false,
					},
					{
						collectionId: 75,
						name: "楚辞全集",
						isChoose: false,
					},

				],
			};
		},
		mounted() {
			this.primaryList[0].isChoose = true;
			this.juniorList[0].isChoose = true;
			this.seniorHighList[0].isChoose = true;
			this.classicList[0].isChoose = true;
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
			onSwipestart() {
				this.primaryUnfold = false;
				this.juniorUnfold = false;
				this.seniorHighUnfold = false;
				this.classicUnfold = false;
			},
			unfoldChange1() {
				this.primaryUnfold = !this.primaryUnfold;
				this.juniorUnfold = false;
				this.seniorHighUnfold = false;
				this.classicUnfold = false;
			},
			unfoldChange2() {
				this.primaryUnfold = false;
				this.juniorUnfold = !this.juniorUnfold;
				this.seniorHighUnfold = false;
				this.classicUnfold = false;
			},
			unfoldChange3() {
				this.primaryUnfold = false;
				this.juniorUnfold = false;
				this.seniorHighUnfold = !this.seniorHighUnfold;
				this.classicUnfold = false;
			},
			unfoldChange4() {
				this.primaryUnfold = false;
				this.juniorUnfold = false;
				this.seniorHighUnfold = false;
				this.classicUnfold = !this.classicUnfold;
			},
			onClick1(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.primaryList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.juniorList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.seniorHighList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.classicList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.juniorList[0].isChoose = true;
					this.seniorHighList[0].isChoose = true;
					this.classicList[0].isChoose = true;
					this.collectionId = nowChooseItem.collectionId;
					this.lastPage = false;
					this.notEnd = true;
					this.page = 1;
					this.contentList.length = 0;
					this.loadMore();
					nowChooseItem.isChoose = true;
				}
			},
			onClick2(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.primaryList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.juniorList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.seniorHighList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.classicList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.primaryList[0].isChoose = true;
					this.seniorHighList[0].isChoose = true;
					this.classicList[0].isChoose = true;
					this.collectionId = nowChooseItem.collectionId;
					this.lastPage = false;
					this.notEnd = true;
					this.page = 1;
					this.contentList.length = 0;
					this.loadMore();
					nowChooseItem.isChoose = true;
				}
			},
			onClick3(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.primaryList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.juniorList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.seniorHighList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.classicList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.primaryList[0].isChoose = true;
					this.juniorList[0].isChoose = true;
					this.classicList[0].isChoose = true;
					this.collectionId = nowChooseItem.collectionId;
					this.lastPage = false;
					this.notEnd = true;
					this.page = 1;
					this.contentList.length = 0;
					this.loadMore();
					nowChooseItem.isChoose = true;
				}
			},
			onClick4(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.primaryList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.juniorList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.seniorHighList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.classicList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.primaryList[0].isChoose = true;
					this.juniorList[0].isChoose = true;
					this.seniorHighList[0].isChoose = true;
					this.collectionId = nowChooseItem.collectionId;
					this.lastPage = false;
					this.notEnd = true;
					this.page = 1;
					this.contentList.length = 0;
					this.loadMore();
					nowChooseItem.isChoose = true;
				}
			},
			loadMore() {
				this.busy = true;
				if (this.lastPage) {
					this.notEnd = false;
				} else {
					if (this.collectionId == 0) {
						this.url = this.$base.format(this.$store.state.url.getPoetryList, this.page, '', '', '诗', '', '');
					} else {
						this.url = this.$base.format(this.$store.state.url.getPoetryList, this.page, '', '', '', '', this.collectionId);
					}
					this.$http.get(this.url)
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
	};
</script>

<style>
	#teaching {
		width: 100%;
		height: calc(100vh - 28vw);
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}


	#teaching .topbar {
		width: 100%;
		flex: none;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: inherit;
		justify-content: left;
		border-bottom: 1px solid #ddd;
		padding: 0 2.5vw;
	}

	#teaching .topbar p {
		font-size: 5vw;
		margin: 0.325rem 0 0 0;
	}

	#teaching .unfoldBox {
		position: fixed;
		right: 0.25rem;
		border-radius: 5px;
		border: #dabc95 1px solid;
		background-color: #dabc95;
		margin: 0.25rem;
		width: 1.5rem;
		height: 1.625rem;
	}

	#teaching .booksList {
		flex: 1;
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-items: stretch;
		justify-content: flex-start;
		height: 2rem;
		overflow-Y: hidden;
	}

	#teaching .booksList.unfold {
		height: auto;
		overflow-x: auto;
	}

	#teaching .books {
		flex: none;


	}

	#teaching .books span {
		margin: 0.3rem;
	}

	#teaching .booksItem {
		margin: 0.325rem 0.25rem;
		font-size: 4vw;
		color: #646464;
		border-radius: 5px;
		border: #dabc95 1px solid;
		padding: 0rem 0.2rem;
	}

	#teaching .booksnowChoose {
		color: #ffffff;
		background-color: #dabc95;
	}

	#teaching .booksList.unfold {
		flex-wrap: wrap;
		overflow-x: auto;
	}

	#teaching .mycontainer {
		width: 100%;
		flex: 1;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		padding: 0 2.5vw;
	}

	#teaching .mycontainer p {
		position: relative;
		bottom: 0;
	}

	#teaching .mycol {
		padding: 0 !important;
	}

	#teaching .listItem {
		width: 100%;
		border-radius: 10px;
		border: #dabc95 1px solid;
		padding: 0.5rem 1rem;
	}

	#teaching .listItembox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-items: center;
		align-content: center;
	}

	#teaching .listItem span {
		margin-bottom: 0;
		width: 100%;
		color: #565656;
	}

	#teaching .listItem span:nth-child(1) {
		color: #cd8474;
		font-size: 1.5rem;
		margin-top: 2vw;
	}

	#teaching .listItem span:nth-child(2) {
		font-size: 1rem;
		margin-top: 2vw;
	}

	#teaching .poemContent {
		text-align: center;
		line-height: 2;
		overflow-y: hidden;
	}
</style>
