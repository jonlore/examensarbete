<template>
  <div>
    <!-- Toolbar: Search + Filter/Sort -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-white sticky top-0 z-20">
      <!-- Search Bar -->
      <div class="relative w-full sm:w-1/2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search trips or destinations..."
          class="w-full bg-gray-100 text-gray-800 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          @input="debouncedSearch"
          @keyup.enter="resetAndLoad"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''; resetAndLoad()"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <!-- Filter + Sort Controls -->
      <div class="flex items-center gap-3">

            <!-- Centered Filter Modal -->
    <UModal>
    <UButton
      color="neutral"
      variant="subtle"
      icon="i-lucide-filter"
      label="Filter"
      />
      <template #content>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Filter by Theme</h2>
          </div>

          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="(category, i) in categories"
              :key="i"
              :label="category"
              color="neutral"
              variant="soft"
              size="sm"
              :class="{
                'bg-blue-100 text-blue-700 border border-blue-500': selectedCategory === category,
              }"
              @click="() => { selectedCategory = category; resetAndLoad() }"
            />
          </div>
        </div>
      </template>
    </UModal>


        <select
          v-model="sortBy"
          @change="resetAndLoad"
          class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-sm transition text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="created_at.desc">Newest</option>
          <option value="saves_count.desc">Most Saved</option>
          <option value="title.asc">A–Z</option>
        </select>
      </div>
    </div>

    <!-- Trip Cards -->
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50">
      <TripCard
        v-for="(item, index) in trips"
        :key="index"
        :trip="item"
      />
    </div>

    <!-- Infinite Scroll Trigger -->
    <div id="infinite-scroll-trigger" class="h-16 flex justify-center items-center text-gray-500">
      <span v-if="loading">Loading more trips...</span>
      <span v-else-if="!hasMore">No more trips</span>
    </div>


  </div>
</template>

<script setup lang="ts">
import TripCard from '~/components/TripCard.vue'
import { getTripImage } from '~/utils/getTripImage'
import { useSupabaseClient } from '#imports'


type Trip = {
  id: string
  public_id: string
  title: string
  location: string
  themes: string[]
  saved: boolean
  saves_count: number
  owner_id?: string
  created_at: string
}

const supabase = useSupabaseClient()

// --- State ---
const trips = ref<Trip[]>([])
const page = ref(0)
const limit = 8
const loading = ref(false)
const hasMore = ref(true)

const searchQuery = ref('')
const selectedCategory = ref('All')
const categories = ['All', 'Adventure', 'Relaxation', 'Culture', 'Food', 'Nature']
const showFilter = ref(false)
const sortBy = ref('created_at.desc')



function debounce(fn: Function, delay = 400) {
  let timeout: number
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => fn(...args), delay)
  }
}

// --- Fetch Trips ---
async function loadTrips() {
  if (loading.value || !hasMore.value) return
  loading.value = true

  const from = page.value * limit
  const to = from + limit - 1
  const [column, direction] = sortBy.value.split('.')

  let query = supabase
    .from('trips')
    .select('*')
    .order(column, { ascending: direction === 'asc' })
    .range(from, to)

  if (selectedCategory.value !== 'All') {
    query = query.contains('themes', [selectedCategory.value])
  }

  if (searchQuery.value.trim()) {
    const term = `%${searchQuery.value.trim()}%`
    query = query.or(`title.ilike.${term},location.ilike.${term}`)
  }

  const { data, error } = await query
  if (error) {
    console.error(error)
    loading.value = false
    return
  }

  if (data.length < limit) hasMore.value = false

  trips.value.push(
    ...data.map((trip: Trip) => ({
      ...trip,
      link: `/trip/${trip.public_id}`,
      savesCount: trip.saves_count,
    }))
  )

  page.value++
  loading.value = false
}

function resetAndLoad() {
  trips.value = []
  page.value = 0
  hasMore.value = true
  loadTrips()
}

const debouncedSearch = debounce(() => resetAndLoad(), 400)

onMounted(() => {
  loadTrips()
  const observer = new IntersectionObserver(entries => {
    if (entries[0]?.isIntersecting) loadTrips()
  })
  const trigger = document.querySelector('#infinite-scroll-trigger')
  if (trigger) observer.observe(trigger)
})
</script>
