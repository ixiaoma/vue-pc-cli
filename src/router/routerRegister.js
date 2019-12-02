import Main from '@/views/Main.vue';

let otherRList = []
const otherR = require.context('../views/componentCon', true, /\.vue$/);
otherR.keys().forEach(key => {
  if(otherR(key).default.name){
    let obj = { 
      path: otherR(key).default.name,
      title: otherR(key).default.title || otherR(key).default.name,
      name: otherR(key).default.name, 
      components: otherR(key)
    }
    otherRList.push(obj)
  }
})
export const otherRouterList = otherRList

let appRList = [];
const appR = require.context('../routePage', true, /\.vue$/);
appR.keys().forEach(key => {
  let childrenName = appR(key).default.name
  if (childrenName) {
    let splitList = key.split('/')
    let parentObj = {
      path: `/${ splitList[ 1 ] }`,
      title: appR(key).default.parentTitle || appR(key).default.title,
      name: splitList[ 1 ],
      component: Main,
      children: []
    };
    let childrenObj = {
      path: `/${ childrenName }`,
      title: appR(key).default.title,
      name: childrenName,
      components: appR(key)
    };
    let haveFlag = false;
    appRList.forEach(ele => {
      if (ele.name == splitList[ 1 ]) {
        haveFlag = true;
        ele.children.push(childrenObj)
      }
    });
    if (!haveFlag) {
      parentObj.children.push(childrenObj)
      appRList.push(parentObj)
    }
  }
});
export const appRouterList = appRList
