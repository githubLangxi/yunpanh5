import Vue from 'vue';
import VueRouter from 'vue-router';

import moduleRouters from '@/module/router'

const App = resolve => require(['../App.vue'], resolve);

const filemain = resolve => require(['@/components/FileManagement/filemain.vue'], resolve);
const people = resolve => require(['@/components/people/peoplemain.vue'], resolve);
const peoplelist = resolve => require(['@/components/people/peoplelist.vue'], resolve);
const Login = resolve => require(['@/components/login/Login.vue'], resolve);
const Main = resolve => require(['@/components/main/Main.vue'], resolve);
const Home = resolve => require(['@/components/home/Home.vue'], resolve);
const Unauthorized = resolve => require(['@/components/401.vue'], resolve);
const test = resolve => require(['@/components/test.vue'], resolve);
const NotFound = resolve => require(['@/components/404.vue'], resolve);
const InternalServerError = resolve => require(['@/components/500.vue'], resolve);
const Auth = resolve => require(['@/components/auth.vue'], resolve);

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/login',
        name: 'login',
        meta: { keepAlive: true },
        component: Login
    },
    {
        path: '/401',
        name: '401',
        component: Unauthorized
    },
      {
        path: '/filemain',
        name: 'filemain',
        component: filemain
      },  {
        path: '/people',
        name: 'people',
        component: people
      },

      {
        path: '/peoplelist',
        name: 'peoplelist',
        component: peoplelist
      },
      ,
      {
        path: '/test',
        name: 'test',
        component: test
      },
    {
        path: '/404',
        name: '404',
        component: NotFound
    },
    {
        path: '/500',
        name: '500',
        component: InternalServerError
    },
    {
        path: '/auth/:userId/:targetUrl',
        name: 'auth',
        component: Auth
    },
    {
        path: '/',
        redirect: { name: 'filemain' },
        meta: { keepAlive: true },
        component: Main,
        children: [{
            path: 'filemain',
            name: 'filemain',
            meta: { keepAlive: true },
            component: Home
        }]
    },
    ...generateRoutesFromModules(),
    { path: '*', redirect: '/404' }
    ]
})

//注册一个全局的 before 钩子，对于需要登录才能访问的模块进行控制
router.beforeEach((to, from, next) => {
    if ( to.name === "people" || to.name==="peoplelist" ||  to.name==="filemain" || to.name === "401" ||  to.name === "test" || to.name === "404" || to.name === "500") {
        next();
        return;
    }
    guardRoute(to, from, next);
});


function generateRoutesFromModules() {
    return moduleRouters;
}

function guardRoute(to, from, next) {
    // work-around to get to the Vuex store (as of Vue 2.0)
    const auth = router.app.$options.store.state.auth;
    if (!auth.isLoggedIn) {
        if (to.name === 'home') {
            next({
                name: 'filemain'
            });
        } else {
            next({
                name: 'filemain',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
}

export default router;
