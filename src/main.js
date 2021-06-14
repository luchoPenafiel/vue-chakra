// Vendor
import Vue from 'vue';
import Chakra, { CThemeProvider, CReset } from '@chakra-ui/vue';

import App from './App.vue';
import router from './router';
import store from './store';

import customTheme from './constants/custom-theme';

Vue.use(Chakra, {
  extendTheme: customTheme,
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)]),
}).$mount('#app');
