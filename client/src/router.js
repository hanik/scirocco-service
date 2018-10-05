import Vue from 'vue';
import Router from 'vue-router';

import HomePage from './views/Home.vue';
import LoginPage from './components/LoginPage.vue';
import Current from './components/current/StepperTabArea.vue';
import History from './components/history/HistoryContainer.vue';

import ContentGatherFeedback from './components/current/subcontents/GatherFeedback.vue';
import ContentLearning from './components/current/subcontents/Learning.vue';
import ContentPrepareData from './components/current/subcontents/PrepareData.vue';
import ContentVerifyModel from './components/current/subcontents/VerifyModel.vue';
import ContentRestartService from './components/current/subcontents/RestartService.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
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
          path: 'learning',
          name: 'step-learning',
          component: ContentLearning,
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
