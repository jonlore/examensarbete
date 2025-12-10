<template>
  <div>
    <FilterSearchBar
      v-model:searchQuery="searchQuery"
      v-model:selectedCategory="selectedCategory"
      v-model:sortBy="sortBy"
      @search="resetAndLoad"
      :categories="['All', ... (activityTypes || [])]"
    />

    <!-- Trip Cards -->
    <div class="p-6 bg-gray-50 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <TripCard v-for="(item, index) in trips" :key="index" @saved-changed="updateSavedState" @theme-clicked="onThemeClicked" :trip="item" />
      </div>
    </div>  

    <!-- Infinite Scroll -->
    <div ref="scrollTarget" class="h-16 flex justify-center items-center text-gray-500">
      <span v-if="loading">Loading more trips...</span>
      <span v-else-if="!hasMore">No more trips</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import TripCard from '~/components/TripCard.vue'
import FilterSearchBar from '~/components/FilterSearchBar.vue'

const { data: activityTypes } = await useFetch<string[]>('/data/activity-types.json')



const {
  trips,
  loading,
  hasMore,
  searchQuery,
  selectedCategory,
  sortBy,
  loadTrips,
  resetAndLoad,
} = useTrips()

function updateSavedState({ id, saved }: { id: string, saved: boolean }) {
  const trip = trips.value.find(t => t.id === id)
  if (trip) {
    trip.saved = saved
  }
}

function onThemeClicked(theme: string) {
  searchQuery.value = theme
  selectedCategory.value = theme
  resetAndLoad()
}

const { target: scrollTarget } = useInfiniteScroll(loadTrips)

onMounted(() => loadTrips())
</script>
