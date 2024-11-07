<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    resource: string
  }>(),
  {
    resource: 'page'
  }
)
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
    <h1 class="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
    <h3 class="text-xl text-gray-700 mb-6">The {{ props.resource }} you're looking for is not here.</h3>
    <router-link 
      :to="{ name: 'event-list-view' }" 
      class="text-blue-500 hover:underline text-lg">
      Back to the home page
    </router-link>
  </div>
</template>

<style scoped>
/* Tailwind classes are used, so custom styles are not needed here */
</style>
