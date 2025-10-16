<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Saved Trips</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(trip, index) in trips"
        :key="index"
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        <!-- Image -->
        <img
          :src="trip.image"
          :alt="trip.title"
          class="w-full h-40 object-cover"
        />

        <!-- Content -->
        <div class="p-4 flex flex-col flex-grow">
          <h3 class="text-lg font-semibold mb-2">{{ trip.title }}</h3>
          <p class="text-gray-600 flex-grow">{{ trip.description }}</p>
        </div>

        <!-- Footer -->
        <div
          class="flex justify-between items-center px-4 py-3 border-t border-gray-200 text-sm text-gray-500"
        >
          <span>{{ trip.date }}</span>
          <button
            class="text-blue-600 hover:underline"
            @click="navigateTo(trip.link)"
          >
            View
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const navigateTo = (link: string) => {
  router.push(link)
}

// Dummy saved trips – replace with real data when ready
const trips = [
  {
    title: 'Iceland Adventure',
    description: 'My epic journey around Iceland’s Ring Road.',
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    date: 'Saved on Sep 14',
    link: '/trips/iceland-adventure'
  },
  {
    title: 'Bali Escape',
    description: 'Surfing and sunsets in Canggu.',
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    date: 'Saved on Sep 2',
    link: '/trips/bali-escape'
  },
  {
    title: 'Tuscany Wine Tour',
    description: 'Vineyards, villas, and vino!',
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    date: 'Saved on Aug 21',
    link: '/trips/tuscany-wine'
  }
]
</script>
