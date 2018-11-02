import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from './components/LoginPage.vue';
import Current from './components/current/StepperTabArea.vue';
import History from './components/models/HistoryContainer.vue';

import ContentGatherFeedback from './components/current/subcontents/GatherFeedback.vue';
import ContentTraining from './components/current/subcontents/Training.vue';
import ContentPrepareData from './components/current/subcontents/PrepareData.vue';
import ContentVerifyModel from './components/current/subcontents/VerifyModel.vue';
import ContentRestartService from './components/current/subcontents/RestartService.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/current/feedback' },
    { path: '/login', component: LoginPage },
    {
      path: '/current',
      name: 'Current',
      component: Current,
      children: [
        {
          path: '',
          redirect: 'feedback',
        },
        {
          path: 'feedback',
          name: 'step-feedback',
          component: ContentGatherFeedback,
        },
        {
          path: 'prepareData',
          name: 'step-prepareData',
          component: ContentPrepareData,
        },
        {
          path: 'training',
          name: 'step-training',
          component: ContentTraining,
        },
        {
          path: 'verifyModel',
          name: 'step-verifyModel',
          component: ContentVerifyModel,
        },
        {
          path: 'restartService',
          name: 'step-restartService',
          component: ContentRestartService,
        },
      ],
    },
    {
      path: '/history',
      name: 'history',
      component: History,
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


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});
