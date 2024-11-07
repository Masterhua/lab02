<template>
  <div class="flex flex-col items-center">
    <label for="pageSize" class="mb-2">Select events per page:</label>
    <select 
      id="pageSize" 
      v-model="selectedPageSize" 
      @change="updatePageSize" 
      class="p-2 border border-gray-300 rounded"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <div class="flex flex-col items-center mt-6">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>

    <div class="flex justify-between w-[290px] mt-6">
      <RouterLink 
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: selectedPageSize } }" 
        id="page-prev" 
        v-if="page > 1"
        class="text-blue-500 hover:text-blue-700"
      >
        Prev Page
      </RouterLink>
      <RouterLink 
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: selectedPageSize } }" 
        id="page-next" 
        v-if="hasNextPage"
        class="text-blue-500 hover:text-blue-700"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const route = useRoute()

const selectedPageSize = ref(route.query.pageSize ? parseInt(route.query.pageSize.toString(), 10) : 2)
const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

const updatePageSize = () => {
  router.push({ name: 'event-list-view', query: { page: 1, pageSize: selectedPageSize.value } })
}

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>