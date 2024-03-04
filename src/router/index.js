import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Details',
      component: () => import('../views/DetailsView.vue')
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: () => import('../views/BookmarksView.vue')
    },
  ]
})

export default router
