<template>
    <header class="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white"> 
        <div class="flex items-center gap-6"> 
            <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')"> 
                <span class="font-semibold text-lg">TripBoard</span>
            </div>
            <NuxtLink to="/explore" class="text-sm font-medium text-gray-600 hover:text-gray-900"> Discover </NuxtLink>
            <div class="flex items-center gap-4">
                 <NuxtLink v-if="!user" to="/login" class="text-sm font-medium text-gray-600 hover:text-gray-900"> Login </NuxtLink> 
            </div>
        </div> 
    </header>
</template>

<script setup lang="ts">
const router = useRouter()
const user = useSupabaseUser()
</script>

<style scoped>

</style>