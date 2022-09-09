import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

function guardRouter(to, from, next) {
  let isAuthenticated = false;
  const user = localStorage.getItem("user");

  if (user) isAuthenticated = true;

  if (isAuthenticated) next();
  else next("/login");
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      name: 'خانه'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      name: 'درباره ما'
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    beforeEnter: guardRouter,
    component: () => import('../views/CreatePost.vue'),
    meta: {
      name: 'ایجاد نوشته'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      name: 'ورود'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    meta: {
      name: 'فراموشی رمز عبور'
    }
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article.vue'),
    meta: {
      name: 'مقالات'
    }
  },
  {
    path: '/bio',
    name: 'Bio',
    component: () => import('../views/Biography.vue'),
    meta: {
      name: 'بیوگرافی'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../components/Detail.vue'),
    meta: {
      name: 'یادداشت'
    }
  },
  {
    path: '/search',
    name: 'SearchArticle',
    component: () => import('../components/SearchArticle.vue'),
    meta: {
      name: 'نتیجه جستجو'
    }
  },
  {
    path: '/literature',
    name: 'Literature',
    component: () => import('../views/Literature.vue'),
    meta: {
      name: 'ادبیات'
    }
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: () => import('../views/Cinema.vue'),
    meta: {
      name: 'سینما'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History.vue'),
    meta: {
      name: 'تاریخ'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: '/home',
    component: Home
  },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.name} | زالزالک`;

  next();
});

export default router;
