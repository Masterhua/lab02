<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const event = ref<Event | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useMessageStore()
const { message } = storeToRefs(store)

onMounted(() => {
  EventService.getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div v-if="event" class="text-center">
    <div v-if="message" id="flashMessage" class="animate-fade mb-4 p-4 bg-yellow-200 text-yellow-800">
      <h4>{{ message }}</h4>
    </div>
    <h1 class="text-4xl font-bold mb-4">{{ event.title }}</h1>
    <p class="text-lg mb-2">{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p class="text-gray-700">{{ event.description }}</p>
  </div>
</template>

<style scoped>
@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellofade 3s ease-in-out;
}
</style>
