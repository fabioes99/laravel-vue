import {createStore} from "vuex";

const store = createStore({
  state: {
    user: {
      data: { name: 'teste'},
      token: null
    }
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {},
})


export default store;
