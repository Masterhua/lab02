<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()

const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const handleEdit = () => {
  store.updateMessage('Event data has been successfully updated')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.id } })
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto">
    <p class="text-lg text-gray-700 mb-4">Edit event: {{ event.title }}</p> <!-- Example of using event -->
    <button 
      @click="handleEdit" 
      class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
      Save Changes
    </button>
  </div>
</template>
