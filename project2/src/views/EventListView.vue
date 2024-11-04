<template>
  <div class="event-list">
    <label for="pageSize">Select events per page:</label>
    <select id="pageSize" v-model="selectedPageSize" @change="updatePageSize">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>

    <div class="pagination">
      <RouterLink 
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: selectedPageSize } }" 
        id="page-prev" 
        v-if="page > 1">Prev Page
      </RouterLink>
      <RouterLink 
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: selectedPageSize } }" 
        id="page-next" 
        v-if="hasNextPage">Next Page
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
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
  const totalPages = Math.ceil(totalEvents.value / selectedPageSize.value)
  return page.value < totalPages
})

const updatePageSize = () => {
  router.push({ name: 'event-list-view', query: { page: 1, pageSize: selectedPageSize.value } })
}

watchEffect(() => {
  events.value = null
  EventService.getEvents(selectedPageSize.value, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'], 10)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<style scoped>
.event-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  width: 290px;
}

.pagination a {
  text-decoration: none;
  color: #2c3e50;
}
</style>
