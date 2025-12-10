<template>
  <div class="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 bg-white sticky top-0 z-20">
    <!-- Search -->
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

    <!-- Filters -->
    <div class="flex items-center gap-3">
      <UModal>
        <UButton color="neutral" variant="subtle" icon="i-lucide-filter" label="Filter" />
        <template #content>
          <div class="p-6">
            <h2 class="text-lg font-semibold mb-4">Filter</h2>
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

      <!-- Sort -->
      <select
        v-model="sortBy"
        @change="resetAndLoad"
        class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-sm transition text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="created_at.desc">Newest</option>
        <option value="title.asc">A–Z</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { debounce } from '~/utils/debounce'

const props = defineProps<{
  searchQuery: string
  selectedCategory: string
  sortBy: string
  categories: string[]
}>()

const emits = defineEmits([
  'update:searchQuery',
  'update:selectedCategory',
  'update:sortBy',
  'search',
])

// Reactive computed bindings
const searchQuery = computed({
  get: () => props.searchQuery,
  set: val => emits('update:searchQuery', val),
})
const selectedCategory = computed({
  get: () => props.selectedCategory,
  set: val => emits('update:selectedCategory', val),
})
const sortBy = computed({
  get: () => props.sortBy,
  set: val => emits('update:sortBy', val),
})

const categories = props.categories

// Debounced search function
const debouncedSearch = debounce(() => emits('search'), 400)
const resetAndLoad = () => emits('search')

// Watch the search input for category matches
watch(searchQuery, (val) => {
  const trimmed = val.toLowerCase().trim()
  const matchingCategory = categories.find(
    (cat) => cat.toLowerCase() === trimmed
  )

  if (matchingCategory) {
    selectedCategory.value = matchingCategory
  } else {
    selectedCategory.value = ''
  }

  // Trigger search
  debouncedSearch()
})
</script>
