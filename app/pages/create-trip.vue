<template>
  <div class="flex flex-col lg:flex-row h-screen bg-gray-50">
    <!-- Left Sidebar (Form) -->
    <aside
      class="lg:w-1/3 xl:w-1/3 bg-white border-r border-gray-200 shadow-sm overflow-y-auto"
    >
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-6 p-6"
        @submit="onSubmit"
      >
        <h2 class="text-2xl font-bold mb-4">Create a Trip</h2>

        <!-- Activities per Day -->
        <div class="space-y-6">
          <div
            v-for="(day, dayIndex) in state.activities"
            :key="dayIndex"
            class="space-y-4 border border-gray-200 rounded-xl p-4 bg-gray-50"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-lg">Day {{ dayIndex + 1 }}</h3>
              <UButton
                v-if="state.activities.length > 1"
                color="primary"
                variant="ghost"
                size="xs"
                icon="i-heroicons-trash"
                @click="removeDay(dayIndex)"
              >
                Remove
              </UButton>
            </div>

            <!-- Day Activities -->
            <div
              v-for="(item, itemIndex) in day.items"
              :key="itemIndex"
              class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center border border-gray-100 p-3 rounded-lg bg-white"
            >
              <USelectMenu
                v-model="day.items[itemIndex]!.type"
                :items="activityTypes"
                placeholder="Select activity type"
              />

              <div class="text-xs text-gray-600 truncate">
                <p v-if="day.items[itemIndex]!.lat && day.items[itemIndex]!.lng">
                  📍 {{ day.items[itemIndex]!.lat }},
                  {{ day.items[itemIndex]!.lng }}
                </p>
                <p v-else class="italic text-gray-400">
                  No location selected
                </p>
              </div>

              <UButton
                color="primary"
                variant="soft"
                size="xs"
                icon="i-heroicons-map-pin"
                @click="selectActivity(dayIndex, itemIndex)"
              >
                Pick on Map
              </UButton>
            </div>

            <!-- Add Activity -->
            <UButton
              color="primary"
              variant="outline"
              size="xs"
              icon="i-heroicons-plus"
              @click="addItem(dayIndex)"
            >
              Add Activity
            </UButton>
          </div>

          <!-- Add Day -->
          <UButton
            color="primary"
            variant="outline"
            icon="i-heroicons-plus-circle"
            @click="addDay"
          >
            Add Another Day
          </UButton>
        </div>

        <!-- Submit -->
        <UButton type="submit" color="primary" block>
          Create Trip
        </UButton>
      </UForm>
    </aside>

    <!-- Right Map Area -->
    <main class="flex-1 relative">
      <LMap
        ref="mapRef"
        class="absolute inset-0"
        :zoom="4"
        :center="mapCenter"
        :use-global-leaflet="false"
        @click="onMapClick"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        <LMarker
          v-for="(m, i) in allMarkers"
          :key="i"
          :lat-lng="[m.lat, m.lng]"
          :draggable="true"
          @update:lat-lng="(newLatLng: any) => onMarkerMove(newLatLng, m)"
        >
          <LPopup>{{ m.type }}</LPopup>
        </LMarker>
      </LMap>

      <!-- Map Picker Notice -->
      <div
        v-if="selectedActivity"
        class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md text-sm"
      >
        <p class="font-medium">Picking location for:</p>
        <p class="text-primary font-semibold">
          {{
            state.activities[selectedActivity.dayIndex]?.items[
              selectedActivity.itemIndex
            ]?.type || 'Activity'
          }}
        </p>
        <p class="text-gray-500 text-xs mt-1">
          Click on the map to drop a pin.
        </p>
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import * as z from 'zod'
import { useSupabaseClient, useSupabaseUser, useToast } from '#imports'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ref, reactive, computed } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'



// --- Predefined activity types (no free text)
const activityTypes = [
  'Hiking',
  'Beach Visit',
  'Museum Tour',
  'Food Tasting',
  'City Walk',
  'Boat Ride',
  'Wildlife Safari',
  'Skiing',
  'Cultural Experience',
  'Historical Site',
  'Shopping',
  'Photography Spot',
  'Local Market',
  'Cooking Class',
  'Scenic Drive',
]

// --- Zod schema
const schema = z.object({
  activities: z.array(
    z.object({
      items: z.array(
        z.object({
          type: z.string().min(1, 'Activity type required'),
          lat: z.number().optional(),
          lng: z.number().optional(),
        })
      ),
    })
  ),
})

type Schema = z.output<typeof schema>

// --- State
const state = reactive({
  region: '',
  activities: [{ items: [{ type: '', lat: undefined, lng: undefined }] }],
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

// --- Map Logic
const mapRef = ref()
const mapCenter = ref<[number, number]>([20, 0])
const selectedActivity = ref<{ dayIndex: number; itemIndex: number } | null>(null)

function selectActivity(dayIndex: number, itemIndex: number) {
  selectedActivity.value = { dayIndex, itemIndex }
  toast.add({
    title: 'Map Picker Active',
    description: 'Click on the map to set coordinates for this activity.',
    color: 'primary',
  })
}

function onMapClick(e: any) {
  if (!selectedActivity.value) return
  const { lat, lng } = e.latlng
  const { dayIndex, itemIndex } = selectedActivity.value
  const activity = state.activities[dayIndex]?.items[itemIndex]
  if (!activity) return
  activity.lat = lat
  activity.lng = lng
  toast.add({
    title: 'Coordinates Set',
    description: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
    color: 'primary',
  })
  selectedActivity.value = null
}

function onMarkerMove(newLatLng: any, movedMarker: any) {
  const activity = state.activities
    .flatMap(day => day.items)
    .find(i => i.lat === movedMarker.lat && i.lng === movedMarker.lng)
  if (!activity) return
  activity.lat = newLatLng.lat
  activity.lng = newLatLng.lng
}

// --- Helpers
const addDay = () => {
  state.activities.push({ items: [{ type: '', lat: undefined, lng: undefined }] })
}
const removeDay = (i: number) => state.activities.splice(i, 1)
const addItem = (i: number) => {
  const day = state.activities[i]
  if (!day) return
  day.items.push({ type: '', lat: undefined, lng: undefined })
}

const allMarkers = computed(() =>
  state.activities.flatMap(day =>
    day.items.filter(i => i.lat && i.lng).map(i => ({
      type: i.type || 'Activity',
      lat: i.lat!,
      lng: i.lng!,
    }))
  )
)

// --- Submit
async function onSubmit(event: FormSubmitEvent<Schema>) {
  alert("Submitting trip...")
  const form = event.data
  const formattedActivities = form.activities.flatMap(day =>
    day.items.map(item => ({
      name: item.type,
      lat: item.lat,
      lng: item.lng,
    }))
  )

  const { error } = await supabase.from('trips').insert({
    title: `Trip to region !`,
    location: "Europe",
    themes: ["Museum", "culture"],
    activities: formattedActivities,
    saved: true,
    saves_count: 1,
    owner_id: user.value?.id ?? user.value?.sub,
  } as any)

  if (error) {
    console.error(error)
    toast.add({
      title: 'Error',
      description: 'There was a problem creating your trip.',
      color: 'primary',
    })
  } else {
    toast.add({
      title: 'Trip Created!',
      description: `Your trip in ${form.region} has been saved.`,
      color: 'primary',
    })
    state.region = ''
    state.activities = [{ items: [{ type: '', lat: undefined, lng: undefined }] }]
  }
}
</script>

<style scoped>
.leaflet-container {
  border-radius: 0.75rem;
}
</style>
