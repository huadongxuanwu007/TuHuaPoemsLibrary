<template>
	<div class="section page page-cent fp-section fp-table active" id="pcHomePage" data-anchor="home">
		<div class="fp-tableCell" >
			<section class="content">
				<header class="header">
					<div class="h-left">
						<h2>即将 <strong>上线</strong></h2>
					</div>
					<div class="h-right">
						<h3>中华诗词库<strong>PC版</strong></h3>
						<h4 class="subhead"><a href="#when">等待为了更好的相遇</a></h4>
					</div>
				</header>
				<div class="qrcodeBox">
					<span>手机版请用微信扫描二维码进行体验</span>
					<img class="qrcodeImage" src="http://tuhuapublic.tuhua.ink/WebPage/Images/phoneQrcode.png?imageView2/1/w/500/h/500/format/jpg/q/75"/>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pcHome',
		mounted() {
			this.$store.commit('changeVisibility', false);
		}
	}
</script>

<style>
	#pcHomePage {
		background: url(http://tuhuapublic.tuhua.ink/WebPage/Images/bg-default.jpg)no-repeat center center;
		background-size: cover;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		-ms-background-size: cover;
		background-attachment: fixed;
		background-position: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		z-index: 1500;
	}

	

	.page-cent {
		width: 100%;
		position: relative;
		text-align: center;
	}

	#pcHomePage .content .header {
		margin: 0 auto;
		text-align: center;
		position: relative;
		display: block;
	}

	#pcHomePage .content,
	#pcHomePage.page-cent .content {
		position: relative;
		max-width: 1200px;
		width: 100%;
	}

	.header-top .menu a,
	.page-footer,
	.quick-link .title,
	.p-footer .text,
	.p-footer .arrow-d,
	.page-footer a,
	.page-cent .content,
	.page-cent .p-title h3,
	.page-cent .p-title h2,
	.page-cent .text,
	.page h2,
	.page h3,
	.page h4,
	.page p,
	.page .content .clock .header,
	.page .clock .text,
	.page .clock .elem-center .digit,
	.page .clock .elem-right .digit,
	.page .clock .elem-left .digit,
	.page .form input,
	.page .form label,
	.c-layout.c-day .number,
	.page .form button,
	.page .form textarea {
		font-family: 'Opensans';
		letter-spacing: -0.01em;
	}

	.page .content {
		z-index: 1;
	}

	.slide,
	.page .content,
	#pcHomePage .logo-container,
	.page {
		-webkit-transition: 0.8s background, 0.6s transform, 0.6s opacity;
		transition: 0.8s background, 0.6s transform, 0.6s opacity;
		-webkit-transform: none;
		transform: none;
		background: transparent;
		border: none;
	}

	.page-cent .content {
		width: 720px;
		/* width: auto; */
		margin: 0 auto;
		padding-top: 72px;
		padding-bottom: 72px;
		padding-left: 1em;
		padding-right: 1em;
		display: inline-block;
		-ms-transition: 0.6s;
		-webkit-transition: 0.6s;
		transition: 0.6s;
		text-align: left;
		font-family: 'Asap';
		color: #fff;
	}

	#pcHomePage .content .header>div {
		display: inline-block;
		vertical-align:top;
		position: relative;
	}

	#pcHomePage .content h2 {
		text-transform: uppercase;
		font-size: 94px;
		text-align: left;
		line-height: 1em;
	}

	#pcHomePage .content h3 {
		text-align: left;
		text-transform: uppercase;
		font-size: 60px;
		line-height: 1em;
		font-weight: bold;
		border-left: 4px solid currentColor;
		padding-left: 10px;
		margin-left: 10px;
		/* max-width: 230px; */
	}
#pcHomePage .h-right strong
{
	font-size: 30px;
}
	#pcHomePage .content .subhead a {
		color: inherit;
		opacity: 0.5;
		text-decoration:none
	}
	#pcHomePage .content .subhead a:hover {
		opacity: 1;
		text-decoration:none
	}
	#pcHomePage .h-left{
		top: 0;
		height: 100%;
	}
	#pcHomePage .qrcodeBox{
		width:  100%;
		height: 400px;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
		
	#pcHomePage .qrcodeBox span{
		font-size: 2rem;
		margin-bottom: 2rem;
	}
	
	#pcHomePage .qrcodeImage{
		flex: none;
		width: 18.75rem;
		height: 18.75rem;
	}
</style>
