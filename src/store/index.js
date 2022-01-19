import { createStore } from 'vuex'

export default createStore({
  state: {
    isShowLoading: false,
  },
  mutations: {
    setShowLoading(state, flag) {
      state.isShowLoading = flag
    },
  },
  actions: {},
  modules: {},
})
