<template>
  <div
    class="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col transition duration-200 hover:shadow-lg hover:-translate-y-1"
  >
    <!-- Image wrapper -->
    <div class="relative">
      <img
        :src="image"
        :alt="trip.title"
        class="w-full h-48 object-cover"
      />

      <!-- Location Badge (top-left) -->
      <div
        class="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm text-gray-700 text-xs font-medium"
      >
        <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-primary" />
        <span>{{ trip.location }}</span>
      </div>

      <!-- Save button (top-right) -->
      <button
        @click.stop="toggleSave"
        class="absolute top-2 right-2 bg-white/90 backdrop-blur-xs hover:bg-white rounded-full flex items-center px-2 py-1 shadow-sm transition text-gray-700 hover:text-blue-500"
      >
        <UIcon
          :name="trip.saved ? 'i-lucide-bookmark-x' : 'i-lucide-bookmark-check'"
          class="w-5 h-5 "
        />
        <span class="text-xs font-medium ml-1">{{ trip.savesCount }}</span>
      </button>

      <!-- Themes Badge (bottom) -->
      <div
        class="absolute bottom-2 left-2 flex flex-wrap gap-1"
      >
        <span
          v-for="(theme, index) in trip.themes"
          :key="index"
          class="bg-primary text-white text-xs px-2 py-0.5 rounded-full shadow-sm"
        >
          {{ theme }}
        </span>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Title -->
      <h3 class="text-base font-semibold mb-2 text-gray-800 line-clamp-2">
        {{ trip.title }}
      </h3>

      <!-- Explore Button -->
      <div class="mt-auto flex justify-between items-center gap-2">
        <UButton
          @click="navigateTo(trip.link)"
          color="primary"
          variant="solid"
          size="sm"
        >
          Explore Trip
        </UButton>

        <!-- Delete button (only owner) -->
        <UButton
          v-if="isOwner"
          color="primary"
          variant="outline"
          size="sm"
          icon="i-lucide-trash"
          class="rounded-full"
          @click.stop="deleteTrip"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSupabaseClient, useSupabaseUser, useToast } from '#imports'
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
  owner_id?: string
}

const props = defineProps<{ trip: Trip }>()
const emit = defineEmits(['deleted']) // 👈 emit when deleted

const router = useRouter()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const image = computed(() => getTripImage(props.trip.location, props.trip.themes))

const isOwner = computed(() => {
  const userId = user.value?.id || user.value?.sub
  return props.trip.owner_id === userId
})

const navigateTo = (link: string) => {
  router.push(link)
}

const toggleSave = async () => {
  if (!user.value) {
    toast.add({ title: 'Please log in to save trips.', color: 'primary' })
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
      toast.add({ title: 'Error removing trip.', color: 'primary' })
      return
    }

    props.trip.saved = false
    props.trip.savesCount -= 1
  } else {
    const { error } = await supabase
      .from('trip_saves')
      .insert({ trip_id: tripId, user_id: user.value.sub } as any)

    if (error) {
      console.error('Error saving trip:', error)
      toast.add({ title: 'Error saving trip.', color: 'primary' })
      return
    }

    props.trip.saved = true
    props.trip.savesCount += 1
  }
}


async function deleteTrip() {
  if (!isOwner.value) return

  const confirmed = confirm('Are you sure you want to delete this trip permanently?')
  if (!confirmed) return


  const { error } = await supabase.from('trips').delete().eq('id', props.trip.id)

  if (error) {
    console.error('Error deleting trip:', error)
    toast.add({
      title: 'Failed to delete trip',
      description: error.message,
      color: 'primary',
    })
  } else {
    toast.add({
      title: 'Trip deleted',
      description: 'Your trip has been permanently removed.',
      color: 'primary',
    })
    router.go(0) // Refresh the page
  }
}
</script>
