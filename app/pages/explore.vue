<template>
  <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="(item, index) in cards"
      :key="index"
      class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
    >
      <!-- Image -->
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-40 object-cover"
      />

      <!-- Content -->
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
        <p class="text-gray-600 flex-grow">{{ item.description }}</p>
      </div>

      <!-- Footer -->
      <div
        class="flex justify-between items-center px-4 py-3 border-t border-gray-200 text-sm text-gray-500"
      >
        <button
          class="text-blue-600 hover:underline"
          @click="navigateTo(item.link)"
        >
          Explore
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const router = useRouter()

const navigateTo = (link: string) => {
  router.push(link)
}

const cards = [
  {
    title: 'Autumn in Kyoto',
    description: 'Experience Japan’s stunning fall colors in ancient temples and serene gardens.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1966',
    link: '/trips/kyoto-autumn'
  },
  {
    title: 'Bali Surf Retreat',
    description: 'Catch waves and unwind on the beautiful beaches of Canggu and Uluwatu.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1966',
    link: '/trips/bali-surf'
  },
  {
    title: 'Iceland Road Trip',
    description: 'Circle the Ring Road and discover waterfalls, glaciers, and volcanic landscapes.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1966',
    link: '/trips/iceland-ring-road'
  },
  {
    title: 'Moroccan Desert Escape',
    description: 'Ride camels across dunes and sleep under the stars in Sahara luxury camps.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1966',
    link: '/trips/morocco-desert'
  },
  {
    title: 'Tuscany Wine Tour',
    description: 'Explore charming hill towns and sip Chianti under the Tuscan sun.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1966',
    link: '/trips/tuscany-wine'
  },
  {
    title: 'Patagonia Adventure',
    description: 'Hike through breathtaking mountains and glaciers in southern Chile & Argentina.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1966',
    link: '/trips/patagonia'
  }
]
</script>
