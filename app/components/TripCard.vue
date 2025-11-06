<template>
  <div
    class="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col transition duration-200"
  >
    <!-- Image wrapper with overlayed save button -->
    <div class="relative">
      <img
        :src="image"
        :alt="trip.title"
        class="w-full h-44 object-cover"
      />

      <!-- Save button & count -->
      <button
        @click.stop="toggleSave"
        class="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full flex items-center gap-1 px-2 py-1 shadow-sm transition text-gray-700 hover:text-blue-500"
      >
        <UIcon
          :name="trip.saved ? 'i-lucide-bookmark' : 'i-lucide-bookmark-plus'"
          class="w-5 h-5"
        />
        <span class="text-xs font-medium">{{ trip.savesCount }}</span>
      </button>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Location -->
      <div class="flex items-center text-gray-500 text-sm mb-1">
        <UIcon name="i-lucide-map-pin" class="w-4 h-4 mr-1" />
        <span>{{ trip.location }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-base font-semibold mb-2 text-gray-800">
        {{ trip.title }}
      </h3>

      <!-- Themes -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <span
          v-for="(theme, index) in trip.themes"
          :key="index"
          class="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full"
        >
          {{ theme }}
        </span>
      </div>

      <!-- Explore button -->
      <UButton
        @click="navigateTo(trip.link)"
        class="cursor-pointer mt-auto inline-flex justify-center items-center text-white text-sm font-medium px-3 py-1.5 rounded-lgtransition"
      >
        Explore Trip
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { getTripImage } from '~/utils/getTripImage'

type Trip = {
  id: string
  title: string
  image: string
  link: string
  location: string
  themes: string[]
  saved: boolean
  savesCount: number
}

const props = defineProps<{ trip: Trip }>()
const router = useRouter()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const image = computed(() => getTripImage(props.trip.location, props.trip.themes))

const navigateTo = (link: string) => {
  router.push(link)
}

const toggleSave = async () => {
  if (!user.value) {
    alert('Please log in to save trips.')
    return
  }

  const tripId = props.trip.id

  if (props.trip.saved) {
    const { error } = await supabase
      .from('trip_saves')
      .delete()
      .eq('trip_id', tripId)
      .eq('user_id', user.value.sub)

    if (error) {
      console.error('Error unsaving trip:', error)
      return
    }

    props.trip.saved = false
    props.trip.savesCount -= 1
  } else {
    const { error } = await supabase
      .from('trip_saves')
      .insert({
        trip_id: tripId,
        user_id: user.value.sub,
      } as any)

    if (error) {
      console.error('Error saving trip:', error)
      return
    }

    props.trip.saved = true
    props.trip.savesCount += 1
  }
}
</script>
