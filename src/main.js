import Vue from 'vue'
import App from './App'
import {router} from './router/index';
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import {appRouter} from './router/router';

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    let tagsList = [];
    appRouter.map((item) => {
        if (item.children.length <= 1) {
            tagsList.push(item.children[0]);
        } else {
            tagsList.push(...item.children);
        }
    });
    this.$store.commit('setTagsList', tagsList);
  }
})
