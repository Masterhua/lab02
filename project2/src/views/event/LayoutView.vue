<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>

<template>
  <div v-if="event" class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-semibold text-gray-800 mb-4">{{ event.title }}</h1>
    <nav class="mb-6">
      <RouterLink 
        :to="{ name: 'event-detail-view' }" 
        class="text-blue-500 hover:text-blue-700 mr-4">
        Details
      </RouterLink>
      |
      <RouterLink 
        :to="{ name: 'event-register-view' }" 
        class="text-blue-500 hover:text-blue-700 mr-4">
        Register
      </RouterLink>
      |
      <RouterLink 
        :to="{ name: 'event-edit-view' }" 
        class="text-blue-500 hover:text-blue-700">
        Edit
      </RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>

<style scoped>
/* No additional CSS is required as we are using Tailwind CSS */
</style>
