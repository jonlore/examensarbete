<script setup lang="ts">
definePageMeta({
  layout: 'default'
})


const featured = [
  {
    title: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1966'
  },
  {
    title: 'Tuscany, Italy',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=2000'
  }
]


</script>

<template>
  <div class="min-h-screen flex flex-col">

    <!-- Hero Section -->
    <section
      class="relative flex flex-col items-center justify-center text-center text-white bg-cover bg-center h-[80vh]"
      style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000');"
    >
      <div class="absolute inset-0 bg-opacity-50"></div>

      <div class="relative z-10 max-w-2xl px-4">
        <h1 class="text-5xl font-bold mb-4">Share & Discover Amazing Trips</h1>
        <p class="text-lg text-gray-200 mb-6">
          Join a global community of travelers. Create, share, and explore curated itineraries from around the world.
        </p>
        <nuxt-link
          to="/explore"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition"
        >
          Explore Trips
        </nuxt-link>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 bg-gray-50 text-center px-6">
      <h2 class="text-3xl font-semibold mb-8">How It Works</h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-2">1. Create</h3>
          <p class="text-gray-600">Build and share your own custom travel itineraries with beautiful photos and maps.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-2">2. Discover</h3>
          <p class="text-gray-600">Browse trips from travelers worldwide and find inspiration for your next adventure.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-2">3. Connect</h3>
          <p class="text-gray-600">Follow fellow explorers, comment on trips, and build your travel network.</p>
        </div>
      </div>
    </section>

    <!-- Featured Destinations -->
    <section class="py-16 text-center bg-gradient-to-b from-white to-gray-50">
      <h2 class="text-3xl font-semibold mb-8">Featured Destinations</h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
        <div
          v-for="(item, i) in featured"
          :key="i"
          class="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-[1.02]"
        >
          <img :src="item.image" :alt="item.title" class="w-full h-56 object-cover" />
          <div class="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            <h3 class="text-white text-xl font-semibold">{{ item.title }}</h3>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <nuxt-link
          to="/explore"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition"
        >
          View All Trips
        </nuxt-link>
      </div>
    </section>

  </div>
</template>