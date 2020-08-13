<template>
	<div id="classical">
		<div class="mycontainer" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
			<div class="lunboBox">
				<div class="lunbo">
					<b-carousel id="carousel" style="border-radius: 3vw; overflow: hidden;" indicators img-width="300" img-height="150">
						<b-carousel-slide img-src="http://tuhuapublic.tuhua.ink/WebPage/Images/001.jpg"></b-carousel-slide>
						<b-carousel-slide img-src="http://tuhuapublic.tuhua.ink/WebPage/Images/002.jpg"></b-carousel-slide>
						<b-carousel-slide img-src="http://tuhuapublic.tuhua.ink/WebPage/Images/003.jpg"></b-carousel-slide>
						<b-carousel-slide img-src="http://tuhuapublic.tuhua.ink/WebPage/Images/004.jpg"></b-carousel-slide>
						<b-carousel-slide img-src="http://tuhuapublic.tuhua.ink/WebPage/Images/005.jpg"></b-carousel-slide>
						<b-carousel-slide img-src="http://tuhuapublic.tuhua.ink/WebPage/Images/006.jpg"></b-carousel-slide>
					</b-carousel>
				</div>
			</div>
			<!-- container-fluid的作用是100%的宽度，占据全部视口（viewport）的宽度  justify-content-center -->
			<div class="container-fluid">
				<div id="rowdiv" class="row justify-content-center">
					<div class="mycol col-3 col-sm-3 col-md-2 col-lg-auto " v-for="data in contentList" @click="goDetailPage(data.name,data.collectionId)">
						<div class="listItem" :class="{ 'invisible': data.collectionId==0  }">
							<div class="listItemImg" :style="'background-image:url('+data.cover+')'"></div>
							<p class="listItemText">{{ data.name }}</p>
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
				kindId: 1,
				notEnd: true, // 是否加载完成
				lastPage: false,
				busy: false,
				kindIdList: ["选集", "主题", "写景", "节日", "节气", "教材", "词牌", "时令", "用典", "地标"]
			};
		},
		activated() {
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
					}
					this.$http.get(this.$base.format(this.$store.state.url.getCollections, this.kindId))
						.then(response => {
							var data = response.data;
							for (var a = 0; a < data.length; a++) {
								data.cover += "?imageView2/1/w/100/h/100/format/jpg/q/75";
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
			goDetailPage(name, id) {
				this.$router.push({
					path: 'collectionDetail',
					query: {
						collectionName: name,
						collectionId: id
					}
				})
			},
		},
	};
</script>

<style>
	#classical {
		width: 95%;
		height: calc(100vh - 28vw);
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
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
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
		padding-bottom: 10px;
		border-bottom: #dabc95 1px dashed;
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
</style>
