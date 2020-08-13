<template>
	<div id="nofind">
		<div class="center-content">
			<div class="topPart">
				<h1>页面丢失</h1>
				<h2>Error 404</h2>
			</div>

			<div class="bottomPart">

				<p>{{tipMessage}}</p>
				<div class="botton-w3ls"><a href="#" @click="goWelcomePage">返回首页</a></div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tipMessage: "看起来你可能迷路了，别担心...一切竟在我们的掌握之中",
			}
		},
		methods: {
			goWelcomePage() {
				return this.$router.replace({
					path: 'home'
				});
			}
		}
	}
</script>

<style scoped>
	/*end reset*/
	#nofind {
		background: url(http://tuhuapublic.tuhua.ink/WebPage/Images/nofindbg.jpg)no-repeat center center;
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		-ms-background-size: cover;
		background-attachment: fixed;
		background-position: center;
		text-align: center;
		font-family: 'Montserrat', sans-serif;
		width: 100%;
		height: 100%;
	}

	#nofind .center-content {
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}

	#nofind .topPart {
		flex: 0 0 50%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	#nofind .topPart h1 {
		flex: none;
		color: #fffbf0;
		text-shadow: 1px 1px 2px #3691df;
		font-size: 15vw;
		letter-spacing: 4px;
		text-align: center;
		font-weight: 500;
		margin: 1em 0 .5em;
		text-transform: capitalize;
		font-family: 'Playball', cursive;
	}

	#nofind .topPart h2 {
		flex: none;
		font-size: 10vw;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 4px;
		color: #fff;
		font-weight: 600;
		text-shadow: 1px 1px 2px #000;
		margin-bottom: 5rem;
	}

	#nofind .bottomPart {
		flex: 0 0 50%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		align-items: center;
	}

	#nofind .bottomPart p {
		color: #FFFFFF;
		font-size: 5vw;
		margin-bottom: 2rem;
		max-width: 80vw;
	}

	#nofind .botton-w3ls a {
		color: #fff;
		font-size: 13px;
		letter-spacing: 1px;
		font-weight: 500;
		padding: 12px 35px;
		text-transform: uppercase;
		background: #ff4c4c;
		display: inline-block;
		border: 2px solid #ff4c4c;
		border-radius: 25px;
		-webkit-border-radius: 25px;
		-moz-border-radius: 25px;
		-o-border-radius: 25px;
		-ms-border-radius: 25px;
		transition: all 0.7s ease-in-out;
		-webkit-transition: all 0.7s ease-in-out;
		-moz-transition: all 0.7s ease-in-out;
		-o-transition: all 0.7s ease-in-out;
		-ms-transition: all 0.7s ease-in-out;
	}

	#nofind .botton-w3ls a:hover {
		color: #000;
		background: #fff;
		border: 2px solid #fff;
		transition: all 0.7s ease-in-out;
		-webkit-transition: all 0.7s ease-in-out;
		-moz-transition: all 0.7s ease-in-out;
		-o-transition: all 0.7s ease-in-out;
		-ms-transition: all 0.7s ease-in-out;
	}

</style>
