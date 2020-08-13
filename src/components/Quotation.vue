<template>
	<div id="quotation">
		<div class="topbar">
			<p>朝代：</p>
			<div class="dynastyList" :class="{ 'unfold':dynastyUnfold }">
				<div class="dynasty" v-for="dynasty in dynastyList">
					<div class="dynastyItem" @click="onClick(dynasty)" :class="{'dynastynowChoose':dynasty.isChoose}">{{ dynasty.name }}</div>
				</div>
			</div>
			<div class="unfoldBox" @click="unfoldChange">
				<b-icon icon="chevron-down" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="!dynastyUnfold"></b-icon>
				<b-icon icon="chevron-up" variant="white" style="width: 3vw; height:3vw;" scale="1.5" v-show="dynastyUnfold"></b-icon>
			</div>
		</div>
		<div class="topbar">
			<p>体裁：</p>
			<div class="kindCNList">
				<div class="kindCN" v-for="kindCN in kindCNList">
					<div class="kindCNItem" @click="onClick1(kindCN)" :class="{'kindCNnowChoose':kindCN.isChoose}">{{ kindCN.name }}</div>
				</div>
			</div>
			<div class="unfoldBox invisible">
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
								<b-form-textarea class="poemContent" plaintext no-resize v-model="data.content" max-rows="1"></b-form-textarea>
								<span>{{ data.dynasty }} · {{ data.authorName }} 《{{ data.title }}》</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<scrollTop />
			<p class="mb-0" :class="{ 'invisible': notEnd }">没有更多了～</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				contentList: [],
				dynasty: null,
				kindCN: null,
				notEnd: true, // 是否加载完成
				lastPage: false,
				page: 1,
				busy: false,
				dynastyUnfold: false,
				dynastyList: [{
						dynasty: "",
						name: "不限",
						isChoose: false,
					},
					{
						dynasty: "商",
						name: "商",
						isChoose: false,
					},
					{
						dynasty: "周",
						name: "周",
						isChoose: false,
					},
					{
						dynasty: "秦",
						name: "秦",
						isChoose: false,
					},
					{
						dynasty: "汉",
						name: "汉",
						isChoose: false,
					},
					{
						dynasty: "三国",
						name: "三国",
						isChoose: false,
					},
					{
						dynasty: "魏",
						name: "魏",
						isChoose: false,
					},
					{
						dynasty: "晋",
						name: "晋",
						isChoose: false,
					},
					{
						dynasty: "南北朝",
						name: "南北",
						isChoose: false,
					},
					{
						dynasty: "隋",
						name: "隋",
						isChoose: false,
					},
					{
						dynasty: "唐",
						name: "唐",
						isChoose: false,
					},
					{
						dynasty: "五代十国",
						name: "五代",
						isChoose: false,
					},
					{
						dynasty: "宋",
						name: "宋",
						isChoose: false,
					},
					{
						dynasty: "金",
						name: "金",
						isChoose: false,
					},
					{
						dynasty: "元",
						name: "元",
						isChoose: false,
					},
					{
						dynasty: "明",
						name: "明",
						isChoose: false,
					},
					{
						dynasty: "清",
						name: "清",
						isChoose: false,
					},
					{
						dynasty: "现代",
						name: "现代",
						isChoose: false,
					},
				],
				kindCNList: [{
						kindCN: "",
						name: "不限",
						isChoose: false,
					},
					{
						kindCN: "诗",
						name: "诗",
						isChoose: false,
					},
					{
						kindCN: "词",
						name: "词",
						isChoose: false,
					},
					{
						kindCN: "曲",
						name: "曲",
						isChoose: false,
					},
					{
						kindCN: "文",
						name: "古文",
						isChoose: false,
					},
				],
			};
		},
		mounted() {
			this.dynasty = this.dynastyList[0].dynasty;
			this.dynastyList[0].isChoose = true;
			this.kindCN = this.kindCNList[0].kindCN;
			this.kindCNList[0].isChoose = true;
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
				this.dynastyUnfold = false;
			},
			unfoldChange() {
				this.dynastyUnfold = !this.dynastyUnfold;
			},
			onClick(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.dynastyList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.dynasty = nowChooseItem.dynasty;
					this.lastPage = false;
					this.notEnd = true;
					this.page = 1;
					this.contentList.length = 0;
					this.loadMore();
					nowChooseItem.isChoose = true;
				}
			},
			onClick1(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.kindCNList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.kindCN = nowChooseItem.kindCN;
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
					this.$http.get(this.$base.format(this.$store.state.url.getPoetryList, this.page, this.dynasty, '', this.kindCN, '',
							''))
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
	#quotation {
		width: 100%;
		height: calc(100vh - 28vw);
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}

	#quotation .mycontainer {
		width: 100%;
		flex: 1;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		padding: 0 2.5vw ;
	}

	#quotation .mycontainer p {
		position: relative;
		bottom: 0;
	}

	#quotation .topbar {
		width: 100%;
		flex: none;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: inherit;
		justify-content: left;
		border-bottom: 1px solid #ddd;
		padding: 0 2.5vw ;
	}

	#quotation .topbar p {
		font-size: 5vw;
		margin: 0.325rem 0 0 0;
	}

	#quotation .unfoldBox {
		border-radius: 5px;
		border: #dabc95 1px solid;
		background-color: #dabc95;
		margin: 0.25rem;
		width: 1.5em;
		height: 1.625rem;
	}

	#quotation .dynastyList {
		flex: 1;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: left;
		overflow-x: hidden;
	}

	#quotation .dynastyList.unfold {
		flex-wrap: wrap;
		overflow-x: auto;
	}

	#quotation .dynasty {
		flex: 0 0 20%;

	}

	#quotation .dynastyItem {
		margin: 0.325rem 0.25rem;
		font-size: 1em;
		color: #646464;
		border-radius: 5px;
		border: #dabc95 1px solid;
	}

	#quotation .dynastynowChoose {
		color: #ffffff;
		background-color: #dabc95;
	}

	#quotation .kindCNList {
		flex: 1;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: left;
		overflow-x: hidden;
	}

	#quotation .kindCN {
		flex: 0 0 20%;
	}

	#quotation .dynastyList.unfold {
		flex-wrap: wrap;
		overflow-x: auto;
	}

	#quotation .kindCNItem {
		margin: 0.325rem 0.25rem;
		font-size: 1em;
		color: #646464;
		border-radius: 5px;
		border: #dabc95 1px solid;
	}

	#quotation .kindCNnowChoose {
		color: #ffffff;
		background-color: #dabc95;
	}

	#quotation .mycol {
		padding: 0 !important;
	}

	#quotation .listItem {
		width: 100%;
		border-radius: 10px;
		border: #dabc95 1px solid;
		padding: 0.5rem 1rem;
	}

	#quotation .listItembox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-items: center;
		align-content: center;
	}

	#quotation .listItem span {
		margin-bottom: 0;
		width: 100%;
		color: #565656;
		font-size: 1.2rem;
	}

	#quotation .poemContent {
		color: #cd8474;
		font-size: 1rem;
		text-align: center;
		line-height: 2;
		overflow-y: hidden;
	}
</style>
