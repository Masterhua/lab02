<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
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
  <p>Edit event here</p>
  <button @click="handleEdit">Save Changes</button>
</template>
