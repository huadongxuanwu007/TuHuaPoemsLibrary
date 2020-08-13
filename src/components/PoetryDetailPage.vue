<template>
	<div id="poetryDetail">
		<div class="mycontainer">
			<goBackButton/>
			<div class="topbar">
				<p>{{ title }}</p>
				<p>[{{ dynasty }}] {{ author }}</p>
				<b-form-textarea class="topbarDesc" Auto height=true max-rows=1000 plaintext no-resize v-model="content"></b-form-textarea>
			</div>
			<div class="splitBar"></div>
			<div class="contentBox">
				<b-tabs justified v-model="tabIndex">
					<b-tab title="译文" active>
						<div class="contentItemBox">
							<v-touch class="TouchBox" @swipeleft="swipeLeft" @swiperight="swipeRight" :swipe-options="{direction: 'horizontal'}">
								<b-form-textarea class="topbarDesc" Auto height=true max-rows=1000 plaintext no-resize v-model="intro"></b-form-textarea>
							</v-touch>
						</div>
					</b-tab>
					<b-tab title="注释">
						<div class="contentItemBox">
							<v-touch class="TouchBox" @swipeleft="swipeLeft" @swiperight="swipeRight" :swipe-options="{direction: 'horizontal'}">
								<b-form-textarea class="topbarDesc" Auto height=true max-rows=1000 plaintext no-resize v-model="annotation"></b-form-textarea>
							</v-touch>
						</div>
					</b-tab>
					<b-tab title="赏析">
						<div class="contentItemBox">
							<v-touch class="TouchBox" @swipeleft="swipeLeft" @swiperight="swipeRight" :swipe-options="{direction: 'horizontal'}">
								<b-form-textarea class="topbarDesc" Auto height=true max-rows=1000 plaintext no-resize v-model="translation"></b-form-textarea>
							</v-touch>
						</div>
					</b-tab>
					<b-tab title="评析">
						<div class="contentItemBox">
							<v-touch class="TouchBox" @swipeleft="swipeLeft" @swiperight="swipeRight" :swipe-options="{direction: 'horizontal'}">
								<b-form-textarea class="topbarDesc" Auto height=true max-rows=1000 plaintext no-resize v-model="appreciation"></b-form-textarea>
							</v-touch>
						</div>
					</b-tab>
				</b-tabs>
			</div>
		</div>
		<div class="loading" v-if="!loadingEnd">
			<b-spinner class="loadItem"></b-spinner>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'poetryDetail',
		data() {
			return {
				workId: 0,
				tabIndex: 0,
				loadingEnd: false,
				title: '',
				dynasty: '',
				author: '',
				intro: '',
				content: '',
				annotation: '',
				translation: '',
				appreciation: '',
				notEnd: true, // 是否加载完成
				lastPage: false,
				page: 1,
				busy: false,
			};
		},
		mounted() {
			this.workId = this.$route.query.workId;
			this.loadMore();
		},
		methods: {
			swipeLeft() {
				// 左滑
				if (this.tabIndex < 3) {
					this.tabIndex++;
				}
			},
			swipeRight() {
				// 右滑
				if (this.tabIndex > 0) {
					this.tabIndex--;
				}
			},
			loadMore() {
				this.$http.get(this.$base.format(this.$store.state.url.getPoetryDetail, this.workId))
					.then(response => {
						var data = response.data.dictionary;
						this.title = data.title;
						this.dynasty = data.dynasty;
						this.author = data.authorName;
						this.intro = data.intro;
						this.content = data.content;
						this.annotation = data.annotation;
						this.translation = data.translation;
						this.appreciation = data.appreciation;
						this.loadingEnd = true;
					})
					.catch(err => {
						console.log(err);
					})
			},
		},
	};
</script>

<style>
	#poetryDetail {
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}

	#poetryDetail .mycontainer {
		width: 100%;
		flex: 1;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	#poetryDetail .topbar {
		width: 100%;
		flex: none;
		background-color: #FFFFFF;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		flex-wrap: inherit;
		justify-content: left;
		padding: 0.5rem;
		margin-bottom: 1.5rem;
	}

	#poetryDetail .splitBar {
		height: 5vw;
		background-color: #f6f1e8;
	}

	#poetryDetail .topbar p {
		margin-bottom: 0.5rem;
		font-size: 5vw;
	}

	#poetryDetail .topbar p:nth-child(1) {
		color: #cd8474;
		font-size: 1.5rem;
	}

	#poetryDetail .topbar p:nth-child(2) {
		font-size: 1rem;
	}

	#poetryDetail .contentBox {
		flex: none;
		height: auto;
		background-color: #FFFFFF;
		padding: 0 2.5vw;
	}

	#poetryDetail .topbar .topbarDesc {
		flex: none;
		text-align: center;
		line-height: 2;
	}

	#poetryDetail .contentBox .contentItemBox {
		height: 60vh;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	#poetryDetail .contentBox .TouchBox {
		width: 100%;
		min-height: 100%;
	}


	#poetryDetail .contentBox .topbarDesc {
		pointer-events: none;
	}

	#poetryDetail .contentBox a {
		color: #747474 !important;
	}

	#poetryDetail .contentBox .nav-tabs {
		border: none !important;
	}

	#poetryDetail .contentBox .nav-tabs .nav-link {
		padding: 0.5rem !important;
	}

	#poetryDetail .contentBox .nav-tabs .nav-link.active {
		border: none;
		border-bottom: #ddbe9a 5px solid !important;
	}

	#poetryDetail .loading {
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

	#poetryDetail .loadItem {
		flex: none;
		color: #dabc95;
	}

	.nav-tabs .nav-link:hover,
	.nav-tabs .nav-link:focus {
		border: none !important;
	}
</style>
