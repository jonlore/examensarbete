<script setup>
definePageMeta({
    layout: 'public'
})

const router = useRouter()
onMounted(() => {
    router.push('/explore')
})

</script>

<template>
    <div>
        <p>TripperBoard</p>
        <nuxt-link to="/explore">Explore</nuxt-link>
    </div>
</template>