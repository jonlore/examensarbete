<template>
  <div class="flex flex-col lg:flex-row h-screen bg-gray-50">
    <!-- Left Sidebar -->
    <aside
      class="lg:w-1/3 xl:w-1/3 bg-white border-r border-gray-200 shadow-sm overflow-y-auto"
    >
      <div v-if="trip" class="flex flex-col h-full">
        <!-- Hero Image + Header -->
        <div class="relative overflow-hidden">
          <img
            :src="trip.image"
            :alt="trip.title"
            class="w-full h-48 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          ></div>
          <div class="absolute bottom-3 left-4 right-4 text-white">
            <h1 class="text-2xl font-bold">{{ trip.title }}</h1>
            <div
              class="flex flex-wrap items-center text-sm text-gray-100 mt-1 gap-2"
            >
              <div class="flex items-center">
                <UIcon name="i-lucide-map-pin" class="w-4 h-4 mr-1" />
                <span>{{ trip.location }}</span>
              </div>
              <!-- Themes moved here -->
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="(theme, i) in trip.themes"
                  :key="i"
                  class="bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full"
                >
                  {{ theme }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities -->
        <div class="flex-1 px-6 py-5 space-y-3 overflow-y-auto">
          <div v-if="trip.activities?.length">
            <div
              v-for="(activity, i) in trip.activities"
              :key="i"
              class="my-2 border border-gray-100 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-200 transition cursor-pointer"
              @click="focusActivity(activity)"
            >
              <p class="text-gray-800 text-sm font-medium">
                {{ activity.name }}
              </p>
            </div>
          </div>
          <p
            v-else
            class="text-gray-500 text-sm italic text-center py-10"
          >
            No activities listed for this trip.
          </p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-20">
        Trip not found.
      </div>
    </aside>

    <!-- Map Area -->
    <main class="flex-1 relative">
      <LMap
        ref="mapRef"
        class="absolute inset-0"
        :zoom="5"
        :center="mapCenter"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        <LMarker
          v-for="(marker, i) in markers"
          :key="i"
          :lat-lng="[marker.lat, marker.lng]"
        >
          <LPopup>{{ marker.name }}</LPopup>
        </LMarker>
      </LMap>
    </main>
  </div>
</template>



<script setup lang="ts">
import { getTripImage } from '~/utils/getTripImage'
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRoute } from 'vue-router'

type Activity = {
  name: string
  lat?: number
  lng?: number
}

type Trip = {
  id: string
  public_id: string
  title: string
  location: string
  themes: string[]
  activities?: Activity[]
  saves_count: number
  image?: string
}

const route = useRoute()
const supabase = useSupabaseClient()
const mapRef = ref()
const mapCenter = ref<[number, number]>([64.9631, -19.0208]) // Default center 


function focusActivity(activity: Activity) {
  if (activity.lat && activity.lng && mapRef.value?.leafletObject) {
    mapRef.value.leafletObject.setView([activity.lat, activity.lng], 8)
  }
}

const { data: trip } = await useAsyncData('trip', async () => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('public_id', String(route.params.id))
    .single<Trip>()

  if (error) throw error
  if (!data) return null

  let activities: Activity[] = []

  try {
    const raw =
      typeof data.activities === 'string'
        ? JSON.parse(data.activities)
        : data.activities

    if (Array.isArray(raw)) {
      activities = raw.map((item: any) =>
        typeof item === 'string' ? { name: item } : item
      )
    }
  } catch (e) {
    console.warn('Failed to parse activities:', e)
  }

  return {
    ...data,
    activities,
    image: getTripImage(data.location, data.themes),
  }
})

const markers = computed<
  { name: string; lat: number; lng: number }[]
>(() => {
  if (!trip.value?.activities) return []

  const flat = Array.isArray(trip.value.activities[0])
    ? (trip.value.activities as Activity[][]).flat()
    : (trip.value.activities as Activity[])

  return flat.filter(
    (a): a is { name: string; lat: number; lng: number } =>
      typeof a.lat === 'number' && typeof a.lng === 'number'
  )
})


</script>
