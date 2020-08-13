<template>
	<div id="poemtryDetail">
		<div class="topbar">
			<p>{{ title }}</p>
			<p>[{{ dynasty }}] {{ author }}</p>
			<b-form-textarea class="topbarDesc" plaintext no-resize v-model="content"></b-form-textarea>
		</div>
		<div class="contentBox">
			<!--<b-tabs justified>
			    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
			    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
			    <b-tab title="Very"><p>I'm the tab with the very, very long title</p></b-tab>
			    <b-tab title="Disabled" ><p>I'm a disabled tab!</p></b-tab>
			  </b-tabs> -->
			<b-tabs justified >
				<b-tab title="译文" active>
					<div class="contentItemBox">
						<b-form-textarea class="topbarDesc" plaintext no-resize v-model="intro"></b-form-textarea>
					</div>
				</b-tab>
				<b-tab title="注释">
					<div class="contentItemBox">
						<b-form-textarea class="topbarDesc" plaintext no-resize v-model="annotation"></b-form-textarea>
					</div>
				</b-tab>
				<b-tab title="赏析">
					<div class="contentItemBox">
						<b-form-textarea class="topbarDesc" plaintext no-resize v-model="translation"></b-form-textarea>
					</div>
				</b-tab>
				<b-tab title="评析">
					<div class="contentItemBox">
						<b-form-textarea class="topbarDesc" plaintext no-resize v-model="appreciation"></b-form-textarea>
					</div>
				</b-tab>
			</b-tabs>
		</div>

	</div>
</template>

<script>
	export default {
		name:'poemtryDetail',
		data() {
			return {
				workId: 0,
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
			loadMore() {
				this.$http.get(this.$base.format(
						"https://wx.tuhua.ink/api/app/poetrydetail?workId={0}", this.workId))
					.then(response => {
						var data = response.data.dictionary;
						console.log("data:", data);
						this.title = data.title;
						this.dynasty = data.dynasty;
						this.author = data.authorName;
						this.intro = data.intro;
						this.content = data.content;
						this.annotation = data.annotation;
						this.translation = data.translation;
						this.appreciation = data.appreciation;
					})
					.catch(err => {
						console.log(err);
					})
			},
		},
	};
</script>

<style>
	#poemtryDetail {
		width: 100%;
		height: calc(96vh - 3vw);
		background-color: #f6f1e8;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;

	}

	#poemtryDetail .topbar {
		width: 100%;

		flex: 1;
		background-color: #FFFFFF;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		flex-wrap: inherit;
		justify-content: left;
		padding: 0.5rem;
		margin-bottom: 1.5rem;
	}

	#poemtryDetail .topbar p {
		margin-bottom: 0.5rem;
		/* 		width: 15vw; */
		font-size: 5vw;
	}

	#poemtryDetail .topbar p:nth-child(1) {
		color: #cd8474;
		font-size: 1.5rem;
	}

	#poemtryDetail .topbar p:nth-child(2) {
		font-size: 1rem;
	}

	#poemtryDetail .contentBox {
		height: 60vh;
		background-color: #FFFFFF;
		padding: 0 2.5vw;
	}

	#poemtryDetail .topbar .topbarDesc {
		flex: 1;
		text-align: center;
		line-height: 2;
	}

	#poemtryDetail .contentBox .contentItemBox {
		height: 70vh;
		display: flex;
		display: -webkit-flex;
	}

	#poemtryDetail .contentBox .topbarDesc {
		flex: 1;

	}

	#poemtryDetail .contentBox a {
		color: #747474 !important;

	}

	#poemtryDetail .contentBox .nav-tabs {
		border: none !important;
	}
	#poemtryDetail .contentBox .nav-tabs .nav-link{
		padding: 0.5rem !important;
	}

	#poemtryDetail .contentBox .nav-tabs .nav-link.active {
		border: none;
		border-bottom: #ddbe9a 5px solid !important;

	}
</style>
