import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import routes from './routes'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from) => {
  NProgress.start();

  // set title
  if (to.meta && to.meta.title)
    document.title = to.meta.title;
  return true;
})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router;