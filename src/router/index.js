import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import { routers } from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach(( to, from, next ) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  if (sessionStorage.getItem('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
    next({
      replace: true,
      name: 'locking'
    });
  } else if (sessionStorage.getItem('locking') === '0' && to.name === 'locking') {
    next(false);
    return;
  }
  // 判断是否已经登录且前往的页面不是登录页
  if (!sessionStorage.getItem('cookieaccess_token') && to.name !== 'login') {
    //判断是否是电话控件弹框页面,保存工单后跳转编辑工单页面
    if (to.query.isCallIn) {
      Util.toDefaultPage([ ...routers ], to.name, router, next);
      return;
    }
    next({
      name: 'login'
    });
    return;
  }
  // 判断是否已经登录且前往的是登录页
  if (sessionStorage.getItem('cookieaccess_token') && to.name === 'login') {
    Util.title();
    next({
      name: 'home_index'
    });
    return;
  }
  Util.toDefaultPage([ ...routers ], to.name, router, next);
});

router.afterEach(( to ) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
  if ( to.name && to.name != 'login' && to.name != 'locking') {
    if (sessionStorage.pageOpenedList && router.app.$store.state.app.pageOpenedList.length != JSON.parse(sessionStorage.pageOpenedList).length) {
      router.app.$store.commit('setOpenedList');
    }
    Util.openNewPage(to.name, to.query);
  }
});
