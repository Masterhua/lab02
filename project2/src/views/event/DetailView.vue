<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
</script>

<template>
  <div class="p-6 max-w-xl mx-auto space-y-4">
    <p class="text-gray-700 text-lg">
      {{ event.time }} on {{ event.date }} @ {{ event.location }}
    </p>
    <p class="text-gray-600">
      {{ event.description }}
    </p>
  </div>
</template>
