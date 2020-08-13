import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
 
const state = {
  includedComponents:['home', 'collectionDetail', 'authorDetail','search'],
  excludedComponents:[],
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