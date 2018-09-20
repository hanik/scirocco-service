import Vue from 'vue';
import Router from 'vue-router';

import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import HomePage from './views/Home.vue';
import LoginPage from './components/LoginPage.vue';
import Stepper from './components/step/Stepper.vue';
import StepperTabArea from './components/step/StepperTabArea.vue';

import ContentGatherFeedback from './components/step/ContentGatherFeedback.vue';
import ContentLearning from './components/step/ContentLearning.vue';
import ContentPrepareData from './components/step/ContentPrepareData.vue';
import ContentVerifyModel from './components/step/ContentVerifyModel.vue';
import ContentRestartService from './components/step/ContentRestartService.vue';

Vue.use(BootstrapVue);
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    {
      path: '/stepper',
      name: 'Stepper',
      component: Stepper,
    },
    {
      path: '/stepperTabArea',
      name: 'StepperTabArea',
      component: StepperTabArea,
      children: [
        {
          path: '',
          name: 'step-feedback',
          component: ContentGatherFeedback,
        },
        {
          path: '/learning',
          name: 'step-prepareData',
          component: ContentLearning,
        },
        {
          path: '/prepareData',
          name: 'step-learning',
          component: ContentPrepareData,
        },
        {
          path: '/verifyModel',
          name: 'step-verifyModel',
          component: ContentVerifyModel,
        },
        {
          path: '/restartService',
          name: 'step-restartService',
          component: ContentRestartService,
        },
      ],
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
    { path: '*', redirect: '/' },
  ],
});

export default router;


// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');
//
//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }
//   next();
// });
