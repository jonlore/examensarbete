// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxtjs/supabase',
    '@nuxtjs/leaflet',
    '@pinia/nuxt'
  ],
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_PUBLISHABLE_KEY
  },
  css: ['~/assets/css/main.css']
})