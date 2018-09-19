import Vue from 'vue';
import Router from 'vue-router';

import BootstrapVue from 'bootstrap-vue'

import HomePage from './views/Home'
import LoginPage from './components/LoginPage'
import Stepper from './components/step/Stepper'
import StepperTabArea from './components/step/StepperTabArea'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: HomePage},
        {path: '/login', component: LoginPage},
        {
            path: '/stepper',
            name: 'Stepper',
            component: Stepper,
        },
        {
            path: '/stepperTabArea',
            name: 'StepperTabArea',
            component: StepperTabArea,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        // otherwise redirect to home
        {path: '*', redirect: '/'},
    ]
});

// router.beforeEach((to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
//
//     if (authRequired && !loggedIn) {
//         return next('/login');
//     }
//
//     next();
// })