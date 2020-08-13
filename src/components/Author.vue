<template>
	<div id="author">
		<div class="topbar">
			<p>朝代：</p>
			<div class="dynastyList">
				<div class="dynasty" v-for="dynasty in dynastyList">
					<div class="dynastyItem" @click="onClick(dynasty)" :class="{'dynastynowChoose':dynasty.isChoose}">{{ dynasty.name }}</div>
				</div>
			</div>
		</div>
		<div class="mycontainer">
			<!-- container-fluid的作用是100%的宽度，占据全部视口（viewport）的宽度  justify-content-center -->
			<div class="container-fluid">
				<div id="rowdiv" class="row">
					<div id="top"></div>
					<div class="mycol col-12 " v-for="data in contentList" @click="goDetailPage(data)">
						<div class="listItem mt-2">
							<div class="listItembox">
								<p>{{ data.name }}</p>
								<p>[{{ data.dynasty }}] {{ data.birthYear }}-{{ data.deathYear }}</p>
								<p>简介</p>
								<p>{{ data.desc }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<scrollTop />
		</div>
	</div>
</template>

<script>
	import ScrollTop from './ScrollTop.vue'
	export default {
		data() {
			return {
				contentList: [],
				dynasty: null,
				busy: false,
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
					// {
					// 	name: "当代",
					// 	isChoose: false,
					// },
					{
						dynasty: "现代",
						name: "现代",
						isChoose: false,
					},
				],
				// // 回到顶部参数
				// scroll: {
				// 	// 回到顶部的方式 0 - 马上回到顶部，css实现（默认） 1 - 匀速回到顶部，js实现
				// 	way: 1,
				// 	// 滚动多少像素显示“回到顶部”图标
				// 	distance: 200,
				// 	// 向上滚动间隔
				// 	time: 600,
				// 	// 运动方式 Bounce
				// 	sportWay: 'Quad',
				// 	// 缓急方式 easeInOut
				// 	slowWay: 'easeIn',
				// 	// 回到顶部后回调方法
				// 	callback: this.onScollTop,
				// },
			};
		},
		components: {
			ScrollTop
		},
		mounted() {
			this.onClick(this.dynastyList[0]);
		},activated() {
		    const scrollTop = this.$route.meta.scrollTop;
		    const $content = document.querySelector('.mycontainer');
		    if (scrollTop && $content) {
		      $content.scrollTop = scrollTop;
		    }
		},
		methods: {
			onClick(nowChooseItem) {
				if (nowChooseItem.isChoose == false) {
					this.dynastyList.forEach((item, index) => {
						item.isChoose = false;
					});
					this.dynasty = nowChooseItem.dynasty;
					this.contentList.length = 0;
					this.getData();
					nowChooseItem.isChoose = true;
				}
			},
			getData() {
				this.$http.get(this.$base.format("https://wx.tuhua.ink/api/app/libraryauthors?dynasty={0}", this.dynasty))
					.then(response => {
						this.contentList = response.data;
					})
					.catch(err => {
						console.log(err);
					})
			},
			goDetailPage(input) {
				this.$router.push({
					path: 'authorDetail',
					query: {
						author: input,
					}
				})
			}
		},
	};
</script>

<style>
	#author {
		width: 95%;
		height: calc(96vh - 31vw);
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}

	#author .mycontainer {
		flex: 1;
		width: 100%;
		/* height: calc(109vh - 84vw); */
		/* height: 100%; */
		overflow-y: auto;
	}

	#author .mycontainer p {
		position: relative;
		bottom: 0;
	}

	#author .topbar {
		width: 100%;
		flex: none;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: left;
	}

	#author .topbar p {
		/* 		width: 15vw; */
		font-size: 5vw;
	}

	#author .dynastyList {
		flex: 1;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: left;
	}

	#author .dynasty {
		flex: 0 0 16.6%;
	}

	#author .dynastyItem {
		margin: 0.25rem;
		font-size: 1em;
		color: #646464;
		border-radius: 5px;
		border: #dabc95 1px solid;
	}

	#author .dynastynowChoose {
		color: #ffffff;
		background-color: #dabc95;
	}

	#author .mycol {
		padding: 0 !important;
	}

	#author .listItem {
		width: 100%;
		height: 25vh;
		border-radius: 10px;
		border: #dabc95 1px solid;
		padding: 0.5rem 1rem;
	}

	#author .listItembox {
		width: 100%;
		height: 100%;
		overflow-y: hidden;

	}

	#author .listItem p {
		margin-bottom: 0;
		text-align: left;
		color: #565656;
	}

	#author .listItem p:nth-child(1) {
		color: #cd8474;
		font-size: 1.5rem;
	}

	#author .listItem p:nth-child(2) {
		font-size: 1rem;
	}

	#author .listItem p:nth-child(3) {
		color: #000000;
		font-weight: bold;
		font-size: 1rem;
	}

	#author .listItem p:nth-child(4) {
		font-size: 1rem;
	}
</style>
