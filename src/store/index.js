import Vue from 'vue'
import Vuex from 'vuex'
import boardStore from './board.store.js'
import userStore from './user.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, payload) {
      //TODO: add loading animation
      state.isLoading = payload.isLoading
    },
  },
  actions: {
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    }
  },
  modules: {
    boardStore,
    userStore
  }
})
