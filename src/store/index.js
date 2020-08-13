import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
 
const state = {
  includedComponents:['home', 'collectionDetail', 'authorDetail','search'],
  excludedComponents:[],
  url:{
	  getCollections:'https://www.tuhua.ink/api/Library/collectionsbylkindid?kindId={0}',
	  getAuthor:'https://www.tuhua.ink/api/Library/authors?dynasty={0}',
	  getAuthorDetail:'https://www.tuhua.ink/api/Library/authors?authorId={0}',
	  getPoetryList:'https://www.tuhua.ink/api/Library/poetrydetails?page={0}&size=10&dynasty={1}&key={2}&kindCN={3}&authorName={4}&collectionId={5}',
	  getPoetryDetail:'https://www.tuhua.ink/api/Library/poetrydetail?workId={0}',
  },
  routerHistoryLength:0,
  gobackButtonVisibility:true,
}
 
const mutations  = {
  removeInclude(state,str){
    state.includedComponents.splice(state.includedComponents.indexOf(str),1);
  },
  addToInclude(state,str){
    state.includedComponents.push(str);
  },
  removeExclude(state,str){
    state.excludedComponents.splice(state.excludedComponents.indexOf(str),1);
  },
  addToExclude(state,str){
    state.excludedComponents.push(str);
  },
  changeVisibility(state,visibility){
    state.gobackButtonVisibility=visibility;
  },
  addRouterHistoryLength(state,input){
	  state.routerHistoryLength+=input;
  }
}
 
var store = new vuex.Store({
  state:state,
  mutations:mutations
})
 
export default store;