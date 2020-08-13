<template>
	<div id="classical">
		<div class="lunboBox">
			<div class="lunbo">
				<b-carousel id="carousel" style="border-radius: 3vw; overflow: hidden;" indicators img-width="300" img-height="150">
					<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=10"></b-carousel-slide>
					<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=12"></b-carousel-slide>
					<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=22"></b-carousel-slide>
					<b-carousel-slide img-src="https://picsum.photos/1024/480/?image=23"></b-carousel-slide>
				</b-carousel>
			</div>
		</div>
		<div class="mycontainer" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
			<!-- container-fluid的作用是100%的宽度，占据全部视口（viewport）的宽度  justify-content-center -->
			<div class="container-fluid">
				<div id="rowdiv" class="row justify-content-center">
					<div class="mycol col-3 col-sm-3 col-md-2 col-lg-auto " v-for="data in contentList" @click="goDetailPage(data.name,data.collectionId)">
						<div class="listItem" :class="{ 'invisible': data.collectionId==0  }">
							<div class="listItemImg" :style="'background-image:url('+data.cover+')'"></div>
							<p class="listItemText">{{ data.name }}</p>
						</div>
						<!-- <b-card v-bind:title="data.name" v-bind:img-src="data.cover" img-alt="Image" img-top tag="article" style="max-width: 20rem;"
						 class="mt-2 mb-2" >
						</b-card> -->
					</div>
				</div>
			</div>
			<scrollTop/>
		</div>
		<p class="mb-0" :class=" {'invisible': notEnd  }">没有更多了～</p>
		
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				contentList: [],
				kindId: 1,
				notEnd: true, // 是否加载完成
				lastPage: false,
				busy: false,
				kindIdList: ["选集", "主题", "写景", "节日", "节气", "教材", "词牌", "时令", "用典", "地标"]
			};
		},activated() {
		    const scrollTop = this.$route.meta.scrollTop;
		    const $content = document.querySelector('.mycontainer');
		    if (scrollTop && $content) {
		      $content.scrollTop = scrollTop;
		    }
		},
		methods: {
			loadMore() {
				this.busy = true;
				if (this.lastPage) {
					this.notEnd = false;
				} else {
					var dom = document.querySelector("#rowdiv");
					var p1 = document.createElement("p");
					p1.className = "kindId";
					p1.textContent = this.kindIdList[this.kindId - 1];
					dom.appendChild(p1);
					var c = 4;
					var w = window.innerWidth;
					if (w < 768) {

						c = 4;
					} else if (w < 1270) {

						c = 6;
					} else {
						c = Math.floor(w / 120);

						// console.log("size",size);
					}
					this.$http.get(this.$base.format("https://wx.tuhua.ink//api/app/collectionsbylkindid?kindId={0}", this.kindId))
						.then(response => {
							var data = response.data;
							for (var a = 0; a < data.length; a++) {
								//data[a].imageUrl += "?imageView2/1/w/280/h/200/format/jpg/q/75";
								this.contentList.push(data[a]);
							}

							var d = data.length % c; //取余
							if (d != 0) {
								var da = this.$base.clone(data[0]);
								da.collectionId = 0;
								for (var e = 0; e < c - d; e++) {
									this.contentList.push(da);
								}
							}
							if (this.kindId == 10) {
								this.lastPage = true;
							}
							this.busy = false;
							this.kindId++
						})
						.catch(err => {
							console.log(err);
							this.busy = false;
						})
				}

			},
			goDetailPage(name,id) {
				this.$router.push({
					path: 'collectionDetail',
					query: {
						collectionName: name,
						collectionId: id
					}
				})
			},
			// handleScroll(e) {
			// 	var scrollTop = this.$refs.myscroll.scrollTop;
			// 	console.log("滚动高度：", scrollTop);
			// },
			// GoScrollTop(e){
			// 	var scrollTop = this.$refs.myscroll.scrollTop;
			// 	console.log("滚动高度：", scrollTop);
			// 	this.$refs.myscroll.scrollTop=0;
			// 	e.currentTarget.parentElement
			// 	console.log("回到底部");
			// }
		},
	};
</script>

<style>
	#classical {
		width: 95%;
		height: calc(96vh - 31vw);
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}

	#classical .lunboBox {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-content: center;
	}

	#classical .lunbo {
		flex: none;
		width: 90%;
		height: 45vw;
	}

	#classical .mycontainer {
		width: 100%;
		flex: 1;
		/* 		height: calc(109vh - 84vw); */
		overflow-y: auto;
	}

	#classical .mycontainer span {
		position: relative;
		bottom: 0;
	}

	#classical .kindId {
		width: 94vw;
		line-height: 100%;
		padding-left: 3vw;
		padding-right: 3vw;
		text-align: left;
		font-size: 1.5em;
	}

	#classical .listItem {

		width: 100%;
		height: 0;
		padding-top: 75%;
		padding-bottom: 75%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: space-around;
		align-content: center;
	}

	#classical .listItemImg {
		background-size: cover;
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		border-radius: 10%;
		overflow: hidden;
	}

	#classical .listItemText {
		font-size: 0.5em;
	}

	/* #classical .mycol {
		padding-left: 5px !important;
		padding-right: 5px !important;
	} */

	
</style>
