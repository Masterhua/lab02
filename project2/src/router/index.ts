import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '@/views/AboutView.vue';
import EventListView from '@/views/EventListView.vue';
import StudentListView from '@/views/StudentListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },

    {
      path: '/students',
      name: 'student-list-view',
      component: StudentListView,
    },
  ],
});

export default router;
