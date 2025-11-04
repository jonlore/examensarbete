<template>
     <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-200 mt-10 py-10 text-center text-gray-600">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="text-lg font-semibold text-gray-800">
            TripBoard
          </div>
          <div class="flex gap-6 text-sm">
            <NuxtLink to="/explore" class="hover:text-gray-900 transition">Explore</NuxtLink>
            <NuxtLink to="/about" class="hover:text-gray-900 transition">About</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-gray-900 transition">Contact</NuxtLink>
          </div>
        </div>
        <div class="mt-6 text-xs text-gray-400">
          © {{ new Date().getFullYear() }} TripBoard. All rights reserved.
        </div>
      </div>
    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>