<template>
	<div class="hello">
		<Cards />
	</div>
</template>

<script>
	import Cards from './Cards.vue'
	export default {
		name: 'cards',
		components: {
			Cards
		},
		data() {
			return {

			};
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
