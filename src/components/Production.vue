<template>
	<div id="production">
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
					this.$http.get(this.$base.format(
							"https://wx.tuhua.ink/api/app/poetrydetails?page={0}&size=10&dynasty={1}&key=&kindCN={2}&authorName=", this.page,
							this.dynasty,
							this.kindCN))
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
			goDetailPage(input) {
				this.$router.push({
					path: 'poemtryDetail',
					query: {
						workId: input
					}
				})
			}
		},
	};
</script>

<style>
	#production {
		width: 95%;
		height: calc(96vh - 31vw);
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}

	#production .mycontainer {
		width: 100%;
		flex: 1;
		overflow-y: auto;
	}

	#production .mycontainer p {
		position: relative;
		bottom: 0;
	}

	#production .topbar {
		width: 100%;
		flex: none;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: inherit;
		justify-content: left;
	}

	#production .topbar p {
		/* 		width: 15vw; */
		font-size: 5vw;
	}

	#production .unfoldBox {
		border-radius: 5px;
		border: #dabc95 1px solid;
		background-color: #dabc95;
		margin: 0.25rem;
		width: 1.5em;
		height: 1.625rem;
	}

	#production .dynastyList {
		flex: 1;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: left;
		overflow-x: hidden;
	}

	#production .dynastyList.unfold {
		flex-wrap: wrap;
		overflow-x: auto;
	}

	#production .dynasty {
		flex: 0 0 20%;

	}

	#production .dynastyItem {
		margin: 0.25rem;
		font-size: 1em;
		color: #646464;
		border-radius: 5px;
		border: #dabc95 1px solid;
	}

	#production .dynastynowChoose {
		color: #ffffff;
		background-color: #dabc95;
	}

	#production .kindCNList {
		flex: 1;
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: left;
		overflow-x: hidden;
	}

	#production .kindCN {
		flex: 0 0 20%;
	}

	#production .dynastyList.unfold {
		flex-wrap: wrap;
		overflow-x: auto;
	}

	#production .kindCNItem {
		margin: 0.25rem;
		font-size: 1em;
		color: #646464;
		border-radius: 5px;
		border: #dabc95 1px solid;
	}

	#production .kindCNnowChoose {
		color: #ffffff;
		background-color: #dabc95;
	}

	#production .mycol {
		padding: 0 !important;
	}

	#production .listItem {
		width: 100%;
		/* 	height: 25vh; */
		border-radius: 10px;
		border: #dabc95 1px solid;
		padding: 0.5rem 1rem;
	}

	#production .listItembox {
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

	#production .listItem span {
		margin-bottom: 0;
		width: 100%;
		color: #565656;
	}

	#production .listItem span:nth-child(1) {
		color: #cd8474;
		font-size: 1.5rem;
		margin-top: 2vw;
	}

	#production .listItem span:nth-child(2) {
		font-size: 1rem;
		margin-top: 2vw;
	}

	/* #production .listItem span:nth-child(3) {
		font-size: 1rem;
		text-align: left;
		text-wrap: wrap;

	} */

	#production .poemContent {
		/* margin-top: 2vw; */
		text-align: center;
		/* background-color: #fff;
		border: none; */
		line-height: 2;
		overflow-y: hidden;
	}
</style>
