<template>
	<div id="scrollTop" ref="scrollTop" @click="handleScrollTop" v-show="visiable">
		<div class="scrollTopItem">
		<b-icon icon="capslock-fill" variant="white" scale="1.5"></b-icon>	
		</div>
	</div>
</template>



<script>
	export default {
		data() {
			return {
				visiable: false, //默认不显示
				element: null,
			}
		},
		mounted() {
			document.getElementById('scrollTop').parentElement.addEventListener("scroll", this.handleScroll);
		},
		beforeDestory() {
			document.getElementById('scrollTop').parentElement.removeEventListener("scroll", this.handleScroll);
		},
		methods: {
			handleScroll() {
				this.scrollTop = document.getElementById('scrollTop').parentElement.scrollTop;
				if (this.scrollTop > document.body.clientHeight) {
					this.visiable = true
				} else {
					this.visiable = false
				}
			},

			handleScrollTop() {
				this.scrollToTop(300);
			},
			scrollToTop(duration) {
				if (document.getElementById('scrollTop').parentElement.scrollTop === 0) return;
				const cosParameter = document.getElementById('scrollTop').parentElement.scrollTop / 2;
				let scrollCount = 0,
					oldTimestamp = null;

				function step(newTimestamp) {
					if (oldTimestamp !== null) {
						scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
						if (scrollCount >= Math.PI) return document.getElementById('scrollTop').parentElement.scrollTop = 0;
						document.getElementById('scrollTop').parentElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
					}
					oldTimestamp = newTimestamp;
					window.requestAnimationFrame(step);
				}
				window.requestAnimationFrame(step);
			}
		},

	}
</script>

<style scoped>
	#scrollTop {
		background-color: #dabc95;
		border-radius: 50%;
		position: fixed;
		width: 10vw;
		height: 10vw;
		right: 5vw;
		bottom: 2vw;
		z-index: 100;
	}

	.scrollTopItem {
	    position: fixed;
		bottom: 5.5vw;
		right: 7.5vw;
		width: 5vw;
		height:5vw;
	}
</style>
