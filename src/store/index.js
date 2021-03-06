import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
