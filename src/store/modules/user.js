import {router} from '../../router/index'
const user = {
    state: {},
    mutations: {
        logout (state) {
            this.commit('clearAllTags')
            sessionStorage.removeItem('user');
            // sessionStorage.removeItem('password');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
            router.push({
                name: 'login'
            })
        }
    }
};

export default user;
