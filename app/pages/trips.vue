<template>
  <div class="p-6 bg-gray-50 min-h-screen">

     <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Your Saved Trips</h1>
        <p class="text-gray-500 text-sm">Explore your favorite adventures or create a new one</p>
      </div>
    </div>
    <!-- Header -->
    <div
      class="flex justify-between items-center mb-6 border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 transition cursor-pointer bg-white"
      @click="navigateTo('/create-trip')"
    >
      <div class="flex items-center gap-4">
        <UIcon name="i-lucide-plus" class="text-blue-500 size-6" />
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Create a New Trip</h2>
          <p class="text-gray-500 text-sm">Share your own adventure with the community</p>
        </div>
      </div>
    </div>

    <!-- Saved Trips Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <TripCard
        v-for="(trip, index) in savedTrips"
        :key="index"
        :trip="trip"
      />

      <div
        v-if="!savedTrips.length"
        class="col-span-full text-center text-gray-500 py-12"
      >
        <p>You haven’t saved any trips yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TripCard from '~/components/TripCard.vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data: savedTrips } = await useAsyncData('saved-trips', async () => {
  if (!user.value) return []

  const userId = user.value.id || user.value.sub
  const { data, error } = await supabase
    .from('trip_saves')
    .select(`
      trip_id,
      trips!trip_saves_trip_id_fkey (
        id,
        public_id,
        title,
        location,
        themes,
        saves_count,
        owner_id,
        created_at
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching saved trips:', error)
    return []
  }

  const trips =
    data?.map((row: any) =>
      row.trips
        ? {
            ...row.trips,
            image: getCityImage(row.trips.location),
            link: `/trip/${row.trips.public_id}`,
            saved: true,
            savesCount: row.trips.saves_count,
          }
        : null
    ).filter(Boolean) ?? []

  return trips
}, { default: () => [] })

function getCityImage(location: string): string {
  const images: Record<string, string> = {
    Japan: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&q=80&w=2070',
    Indonesia: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1966',
    Iceland: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1966',
  }
  return images[location] || 'https://via.placeholder.com/400x300?text=Trip'
}
</script>
