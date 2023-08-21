import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    // {
    //   path: '/login-success-redirect',
    //   name: 'login-success-redirect',
    //   component: LoginSuccessRedirect,
    // },
    {
      path: '/register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    },
    {
      path: '/course',
      name: 'course',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Course.vue')
    },
    {
      path: '/detail-course/:id',
      name: 'detail-course',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailCourse.vue')
    },
    {
      path: '/after-payment',
      name: 'after-payment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AfterPurchase.vue')
    },
    {
      path: '/history-course',
      name: 'history-course',
      component: () => import('../views/HistoryCourse.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/cart-course',
      name: 'cart-course',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CartCourse.vue')
    },
    {
      path: '/profile/my-course',
      name: 'my-course',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyCourseView.vue')
    },
    {
      path: '/profile/profile-settings/edit-profile',
      name: 'edit-profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditProfileView.vue')
    },
    {
      path: '/profile/profile-settings/account-privacy',
      name: 'account-privacy',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AccountPrivacyView.vue')
    },
    {
      path: '/course/module/summary/quiz/:id',
      name: 'quiz',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/QuizView.vue')
    },
    {
      path: '/course/module/summary/quiz/score/:id',
      name: 'quiz-score',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/QuizScoreView.vue')
    },
    {
      path: '/course/module/:id',
      name: 'course-module',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ModuleView.vue')
    },
    {
      path: '/course/module/summary/:id',
      name: 'module-summary',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SummaryView.vue')
    },
    {
      path: '/course/module/:id/:module_id',
      name: 'content-module',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/ContentModule.vue')
    },
    {
      path: `/detail-order/:id`,
      name: 'detail-order',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailOrder.vue')
    },
    {
      path: '/astronomy-course',
      name: 'astronomy-course',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AstronomyCourse.vue')
    },
    {
      path: '/anatomy-course',
      name: 'anatomy-course',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AnatomyCourse.vue')
    },
    {
      path: '/payment-success',
      name: 'payment-success',
      component: () => import('../views/PaymentSuccess.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/Wishlist.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/forgot-password-otp',
      name: 'forgot-password-otp',
      component: () => import('../views/ForgotPasswordOtp.vue')
    },
    {
      path: '/register-otp',
      name: 'register-otp',
      component: () => import('../views/RegisterOtp.vue')
     },
     {
      path: `/detail-transaction/:id`,
      name: 'detail-transaction',
      component: () => import('../views/DetailTransaction.vue')
    },
    {
      path: '/help-center',
      name: 'help-center',
      component: () => import('../views/HelpCenter.vue')
    },
    {
      path: '/course/search',
      name: 'course-search',
      component: () => import('../views/Search.vue')
    }
  ]
})

export default router
