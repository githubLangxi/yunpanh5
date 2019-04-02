let version = "6.5"
    // The Vue build version to load with the `import` command
    // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BabelPolyfill from 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import store from './store';

import './assets/css/reset.css';
import './assets/css/rtportal.css';
import './assets/js/rtportal.js';
import './assets/css/fonts/styles.css';


/*vue-seamless-scroll*/
import ggg from 'vue-seamless-scroll'
Vue.use(scroll,{componetName:'scroll-seamless'})
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import rightMenu from "rightMenu";
Vue.use(rightMenu);
// 引用element-ui
import '../theme/index.css';
// import "../theme/menu.css";

/* Network plugin */
import axios from 'axios';
Vue.prototype.$http = Vue.http = axios;

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/* echart */
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
//界面刷新时保持可用
if (process.env.NODE_ENV !== 'production' && localStorage.serverAddress !== null) {
    axios.defaults.baseURL = localStorage.serverAddress;
}

/* Auth plugin */
import Auth from './auth';
Vue.use(Auth);

/* Privilege plugin */
import Privilege from './plugins/privilege'
Vue.use(Privilege);

/* I18n plugin */
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import {
    locales,
    messages
} from './config/i18n-map';
//default language
var defaultLocale = localStorage.i18nLocale;
if (defaultLocale === null || defaultLocale === undefined) {
    defaultLocale = locales[0].value;
}
const i18n = new VueI18n({
    locale: defaultLocale, // set locale
    messages, // set locale messages
})
Vue.i18n = i18n;

Vue.http.interceptors.request.use(function(config) {
    const locale = Vue.i18n.locale;
    if (locale !== null && locale.length > 0) {
        config.headers["Accept-Language"] = locale;
    }
    return config;
});

/* ui plguin */
import ElementUI from 'element-ui';
//element-ui多语言
import locale from 'element-ui/lib/locale';
import format from 'element-ui/lib/locale/format';
const formater = format(Vue);
//初始化elementui
Vue.use(ElementUI, {
    i18n(path, options) {
        let value = i18n.t(path);
        if (value !== null && value !== undefined) return formater(value, options);
        const array = path.split('.');
        for (let i = 0, j = array.length; i < j; i += 1) {
            const property = array[i];
            value = i18n.t(property);
            if (i === j - 1) return formater(value, options);
            if (!value) return '';
        }
        return '';
    }
});

import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {
        rABS: true
    }) //浏览器的FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为false，也就是使用readAsArrayBuffer

//自定义组件
import PortalUI from '../packages';
Vue.use(PortalUI);

// 开启debug模式
Vue.config.debug = true;
Vue.config.productionTip = false;
// 配置是否允许vue-devtools 检查代码  默认为true
// Vue.config.devtools = true

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'Dy9gTfiNyOuiUCpi6UooCugl'
})

//表格的时间时区处理
Vue.prototype.DateFormatter = function(row, attribute, isDate) {
    if (row[attribute]) {
        // if (row[attribute].indexOf("-") != -1) {
        //     row[attribute] = row[attribute].replace(new RegExp(/-/gm), "/");
        // }
        console.log(typeof row[attribute])
      console.log( row[attribute])
        return new Date(row[attribute]).getZoneTime(isDate);
    }
}

import App from './App';
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: {
        App
    }
});
