<template>
	<div id="nofind">
		<div class="center-content">
			<h1>页面丢失</h1>
			<div class="main-agile">
				<h2>Error 404</h2>
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
		background: url(../assets/nofindbg.jpg)no-repeat center top;
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		-ms-background-size: cover;
		background-attachment: fixed;
		background-position: center;
		text-align: center;
		font-family: 'Montserrat', sans-serif;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
	}

	#nofind .center-content {
		margin: auto;
		display: inline-block;
		vertical-align: middle;
	}


	/*--//parallax-js--*/
	#nofind .main-agile h2 {
		font-size: 5em;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 4px;
		color: #fff;
		font-weight: 600;
		text-shadow: 1px 1px 2px #000;
	}

	#nofind .main-agile {
		margin: auto;
	}

	#nofind .main-agile p {
		color: #fff;
		width: 59%;
		text-align: center;
		margin: 2em auto 1.5em;
		line-height: 30px;
		font-size: 1.1em;
		font-weight: 200;
		letter-spacing: 2px;
	}

	#nofind .content-wthree {
		padding: 50px 50px;
		text-align: center;
		position: relative;
	}

	#nofind .center-content h1 {
		color: #fffbf0;
		text-shadow: 1px 1px 2px #fff;
		font-size: 5.5em;
		letter-spacing: 0px;
		text-align: center;
		font-weight: 500;
		margin: 1em 0 .5em;
		text-transform: capitalize;
		font-family: 'Playball', cursive;
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

	#nofind .wthree-text a {
		color: #fff;
		font-size: 13px;
		display: inline;
		letter-spacing: 1px;
		text-transform: capitalize;
	}

	/*--//footer--*/
	#nofind .footer-w3l p {
		margin: 0 auto;
		text-align: center;
		font-size: 14px;
		color: #eee;
		letter-spacing: 2px;
		line-height: 27px;
	}

	#nofind .footer-w3l p a {
		color: #fff;
	}

	#nofind .footer-w3l p a:hover {
		text-decoration: underline;
	}

	/*--//footer--*/

	/*--responsive--*/
	@media(max-width:1600px) {}

	@media(max-width:1440px) {
		#nofind .center-content h1 {
			font-size: 5em;
			margin: 0.5em 0 0em;
		}

		#nofind .main-agile {
			margin: 4em 0 5em;
		}

		#nofind .main-agile h2 {
			font-size: 4em;
		}

		#nofind canvas.particles-js-canvas-el {
			height: 596px !important;
		}

		#nofind .main-w3layouts {
			left: 17%;
		}
	}

	@media(max-width:1366px) {
		#nofind .main-w3layouts {
			left: 15%;
		}
	}

	@media(max-width:1280px) {
		#nofind .main-w3layouts {
			left: 13%;
		}
	}

	@media(max-width:1080px) {
		#nofind .center-content h1 {
			font-size: 4.2em;
			margin: 0.7em 0 0em;
		}

		#nofind .main-agile h2 {
			font-size: 3.8em;
		}

		#nofind .main-w3layouts {
			left: 6%;
		}
	}

	@media(max-width:1050px) {
		#nofind .main-w3layouts {
			left: 4%;
		}
	}

	@media(max-width:1024px) {
		#nofind canvas.particles-js-canvas-el {
			height: 670px !important;
		}

		#nofind .center-content h1 {
			font-size: 4.2em;
			margin: 1.2em 0 0em;
		}
	}

	@media(max-width:991px) {
		#nofind canvas.particles-js-canvas-el {
			height: 596px !important;
		}

		#nofind .center-content h1 {
			font-size: 4em;
			margin: 1em 0 0em;
		}

		#nofind .main-w3layouts {
			left: 0%;
		}
	}

	@media(max-width:900px) {}

	@media(max-width:800px) {
		#nofind .center-content h1 {
			font-size: 3.5em;
			margin: 1.5em 0 0em;
		}

		#nofind .main-agile h2 {
			font-size: 3.4em;
		}

		#nofind .main-agile p {
			width: 66%;
			font-size: 1em;
		}

		#nofind .main-agile {
			margin: 4em 0 4em;
		}

		#nofind .footer-w3l p {
			font-size: 13px;
		}
	}

	@media(max-width:768px) {
		#nofind .center-content h1 {
			margin: 3em 0 0em;
		}
	}

	@media(max-width:767px) {
		#nofind .center-content h1 {
			font-size: 3.4em;
			margin: 1.5em 0 0em;
		}

	}

	@media(max-width:736px) {}

	@media(max-width:667px) {
		#nofind .main-agile p {
			width: 80%;
		}
	}

	@media(max-width:640px) {
		#nofind .footer-w3l p {
			letter-spacing: 1.5px;
		}

		#nofind .footer-w3l p {
			padding: 0 2em;
			line-height: 33px;
		}
	}

	@media(max-width:600px) {}

	@media(max-width:568px) {
		#nofind .main-agile p {
			width: 85%;
		}
	}

	@media(max-width:480px) {
		#nofind .center-content h1 {
			font-size: 2.8em;
		}

		#nofind .main-agile h2 {
			font-size: 3em;
		}

		#nofind .main-agile p {
			width: 90%;
			font-size: 14px;
			margin: 2em auto 3.5em;
		}
	}

	@media(max-width:440px) {
		#nofind .main-agile p {
			letter-spacing: 1px;
		}

		#nofind .main-agile {
			margin: 4em 0 3em;
		}
	}

	@media(max-width:414px) {
		#nofind .main-agile {
			margin: 5em 0 6em;
		}

		#nofind .center-content h1 {
			font-size: 2.6em;
		}

		#nofind .main-agile h2 {
			font-size: 2.7em;
		}
	}

	@media(max-width:384px) {
		#nofind .center-content h1 {
			font-size: 2.3em;
		}

		#nofind .main-agile h2 {
			font-size: 2.4em;
		}

		#nofind .botton-w3ls a {
			font-size: 12px;
			padding: 9px 30px;
		}

		#nofind .main-agile p {
			letter-spacing: 0.6px;
		}
	}

	@media(max-width:375px) {
		#nofind .main-agile p {
			width: 84%;
			margin: 2em auto 3em;
		}

		#nofind .main-agile {
			margin: 5em 0 5em;
		}
	}

	@media(max-width:320px) {
		#nofind .center-content h1 {
			font-size: 2em;
		}

		#nofind .main-agile h2 {
			font-size: 1.5em;
		}

		#nofind .main-agile {
			margin: 3em 0 3em;
		}

		#nofind .footer-w3l p {
			padding: 0 1em;
			line-height: 26px;
			letter-spacing: 1px;
		}

		#nofind .main-agile p {
			margin: 2em auto 2em;
			font-size: 13px;
		}

		#nofind canvas.particles-js-canvas-el {
			height: 500px !important;
		}
	}
</style>
