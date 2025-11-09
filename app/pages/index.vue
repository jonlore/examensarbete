<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const featured = [
  {
    title: 'Bali, Indonesia',
    description: 'Tropical paradise with pristine beaches and rich culture',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2048',
    tag: 'Trending'
  },
  {
    title: 'Kyoto, Japan',
    description: 'Ancient temples amid modern innovation',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=2048',
    tag: 'Cultural'
  },
  {
    title: 'Santorini, Greece',
    description: 'Iconic white buildings and Mediterranean charm',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=2048',
    tag: 'Popular'
  }
]

const stats = [
  { number: '10K+', label: 'Travelers' },
  { number: '50+', label: 'Countries' },
  { number: '1000+', label: 'Shared Trips' }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section with Parallax -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Parallax Background -->
      <div 
        class="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-1000"
        style="background-image: url('https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&w=2048');"
      ></div>
      
      <!-- Overlay with blur -->
      <div class="absolute inset-0 bg-black/40 "></div>

      <!-- Content -->
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 class="text-6xl font-bold mb-6 leading-tight animate-fade-in">
          Your Journey,
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Shared
          </span>
        </h1>
        <p class="text-xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed">
          Create, discover, and share extraordinary travel experiences with passionate explorers worldwide.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <nuxt-link
            to="/explore"
            class="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 font-medium text-lg group"
          >
            Explore Trips
            <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </nuxt-link>
          <nuxt-link
            to="/create-trip"
            class="inline-flex items-center px-8 py-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm font-medium text-lg"
          >
            Share Your Trip
          </nuxt-link>
        </div>

        <!-- Stats -->
        <div class="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div v-for="(stat, i) in stats" :key="i" class="text-center">
            <div class="text-3xl font-bold mb-1">{{ stat.number }}</div>
            <div class="text-sm text-gray-300">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Featured Destinations -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold mb-16 text-center">
          Featured Destinations
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(item, i) in featured"
            :key="i"
            class="group relative rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            <!-- Background Image -->
            <div class="aspect-[4/5] overflow-hidden">
              <img 
                :src="item.image" 
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <!-- Content Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white transform transition-transform duration-500">
              <!-- Tag -->
              <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-3 self-start">
                {{ item.tag }}
              </span>
              
              <!-- Title & Description -->
              <h3 class="text-2xl font-bold mb-2">{{ item.title }}</h3>
              <p class="text-gray-200 text-sm">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center mt-16">
          <nuxt-link
            to="/explore"
            class="inline-flex items-center px-8 py-4 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 font-medium text-lg group"
          >
            View All Destinations
            <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>