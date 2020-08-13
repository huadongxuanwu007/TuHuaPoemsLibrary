<template>
	<div id="Cards" ref="scroll">
		<div class="mycontainer" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
			<!-- container-fluid的作用是100%的宽度，占据全部视口（viewport）的宽度  justify-content-center -->
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-6 col-sm-6 col-md-4 col-lg-auto " v-bind:key="data.index" v-for="data in contentList">
						<b-card v-bind:title="data.monadName" v-bind:img-src="data.imageUrl" img-alt="Image" img-top tag="article" style="max-width: 20rem;"
						 class="mt-2 mb-2" :class=" {'invisible': data.id==0  }">
							<b-card-text class="introduceText">{{ data.extra| toaddress }}</b-card-text>
							<!--         <b-button href="#" variant="primary">View food</b-button> -->
						</b-card>
					</div>
				</div>
			</div>
		</div>
		<span :class=" {'invisible': notEnd  }">没有更多了～</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				contentList: [],
				page: 1,
				loadState: true, // 是否显示底部加载状态，默认true
				notEnd: true, // 是否加载完成
				loading: false, // 是否正在加载中
				domHeight: 0, // 内容可视区的高度
				initFinish: false,
				busy: false,
				container: null // 绑定能被监听滚动的元素
			};
		},
		mounted() {
			// 如果组件是基于body或者其他父元素进行滚动，则下面获取的对象为相应的对象
			this.page = 1;
			//this.switchBottom();
			this.box = this.$refs.scroll
			this.domHeight = window.innerHeight;
		},
		methods: {
			loadMore() {
				console.log("loadMore");
				this.busy = true;
				//console.log("滚动到：", this.initFinish);
				// if (this.initFinish) {
				console.log("滚动到底部");
				var w = window.innerWidth;
				console.log("宽度", w);
				var c = 2;
				var size = 10;
				if (w < 768) {
					size = 10;
					c = 2;
				} else if (w < 1270) {
					size = 12;
					c = 3;
				} else {
					c = Math.floor(w / 312);
					size = c * 4;
					console.log("c", c);
					// console.log("size",size);
				}
				console.log("size", size);
				this.$http.get(this.$base.format("https://www.tuhua.ink/api/gettravellist?page={0}&size={1}",
						this.page++, size))
					.then(response => {
						var data = response.data;
						for (var a = 0; a < data.length; a++) {
							data[a].imageUrl += "?imageView2/1/w/280/h/200/format/jpg/q/75";
							this.contentList.push(data[a]);
						}
						if (data.length < size) {
							this.notEnd = false;
							var d = data.length % c; //取余
							if (d != 0) {

								var da = this.$base.clone(data[1]);
								da.id = 0;
								//var da={id:0};
								for (var e = 0; e < c - d; e++) {
									// var da=data[0].clone();
									// da.id=0;
									this.contentList.push(da);
								}
							}

						}else
						{
								this.busy = false;//不是最后一页才允许刷新
						}
					})
					.catch(err => {
						console.log(err);
						this.busy = false;
					})
			},
			
			// async getData() {
			// 	var w = window.innerWidth;
			// 	console.log("宽度", w);
			// 	var c = 2;
			// 	var size = 10;
			// 	if (w < 768) {
			// 		size = 10;
			// 		c = 2;
			// 	} else if (w < 1270) {
			// 		size = 12;
			// 		c = 3;
			// 	} else {
			// 		c = Math.floor(w / 312);
			// 		size = c * 4;
			// 		console.log("c", c);
			// 		// console.log("size",size);
			// 	}
			// 	var data = await this.$http.get(this.$base.format("https://www.tuhua.ink/api/gettravellist?page={0}&size={1}",
			// 			this.page++, size))
			// 		.then(response => {
			// 			return response.data;
			// 		})
			// 		.catch(err => {
			// 			console.log(err);
			// 		})
			// 	//this.page++;

			// 	for (var a = 0; a < data.length; a++) {
			// 		data[a].imageUrl += "?imageView2/1/w/280/h/200/format/jpg/q/75";
			// 		this.contentList.push(data[a]);
			// 	}
			// 	if (data.length < size) {
			// 		this.finish = true;
			// 		var d = data.length % c; //取余
			// 		if (d != 0) {

			// 			var da = this.Myclone(data[1]);
			// 			da.id = 0;
			// 			//var da={id:0};
			// 			for (var e = 0; e < c - d; e++) {
			// 				// var da=data[0].clone();
			// 				// da.id=0;
			// 				this.contentList.push(da);
			// 			}
			// 			// for(var e=d;e>0;e--)
			// 			// {

			// 			// 	this.contentList.pop();
			// 			// }
			// 		}
			// 	}
			// 	// console.log("页数", this.page);
			// 	// console.log("数据", this.contentList);
			// 	// 关闭正在加载中
			// 	this.loading = false
			// 	return 0;
			// },

			// async switchBottom() {
			// 	// 判断容器内容是否 大于 自身内容可视区域高度
			// 	this.busy = true;
			// 	var i = 10;
			// 	while (i--) {

			// 		console.log("this.scrollHeight: ", this.$el.scrollHeight);
			// 		console.log("this.domHeight: ", this.domHeight);
			// 		if (this.$el.scrollHeight > this.domHeight) {

			// 			// 如果大于，则显示加载状态，至于是加载完成还是没有可以继续加载，我们不用关心，如果继续上滑有数据会执行方法的
			// 			this.showState = true;
			// 			this.initFinish = true;
			// 			break;
			// 		} else {
			// 			// 如果页面不足一屏且还有下一页数据，继续执行加载更多方法
			// 			//console.log("Finish",this.finish);
			// 			if (!this.finish) {
			// 				// 不足一屏，还有数据，现在加载状态
			// 				this.showState = true;
			// 				// 执行父组件请求数据方法
			// 				var res = await this.getData();
			// 				//console.log("等待");
			// 			} else {
			// 				// 没有数据不显示底部加载状态
			// 				this.showState = false;
			// 				this.initFinish = true;
			// 				break;
			// 			}
			// 		}
			// 	}
			// 	this.busy = false;
			// }
		},
	};
</script>

<style>
	.mycontainer {
		height: 100vh;
		overflow-y: auto;
	}
	.mycontainer span{
		position: relative;
	    bottom: 0;
	}
</style>
