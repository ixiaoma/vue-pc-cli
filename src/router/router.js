import Main from '@/views/Main.vue';
//自动注册页面路由
import {appRouterList,otherRouterList} from './routerRegister';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => {
    require(['@/views/login/login.vue'], resolve);
  }
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: resolve => {
    require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
  }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home_index',
  component: Main,
  children: otherRouterList
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = appRouterList;

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
];
