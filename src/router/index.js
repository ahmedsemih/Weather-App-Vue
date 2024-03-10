import { createRouter, createWebHistory } from 'vue-router';
import DetailsView from '@/views/DetailsView.vue';
import BookmarksView from '@/views/BookmarksView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Details',
      component: DetailsView
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: BookmarksView,
    },
  ]
})

export default router
