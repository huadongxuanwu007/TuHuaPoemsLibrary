<template>
<div id="secondcomponent">
    <h1>I am another page</h1>
    <a> written by {{ author }} </a>
    <ul>
        <li v-for="article in articles">
            {{article.classone}}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data() {
        return {
            author: "温泉",
            articles: [],
        }
    },
    mounted() {

          this.$http.get('https://wx.tuhua.ink/api/app/classones') .then(response => {
           this.articles = response.data;
      })
        .catch(err => {
        console.log(err);
      });
       }
}
</script>

<style>

</style>
