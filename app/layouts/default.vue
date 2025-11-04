<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const router = useRouter()
const client = useSupabaseClient()
const user = useSupabaseUser()

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

// Sidebar navigation items
const items: NavigationMenuItem[][] = [[
  {
    label: 'Discover',
    icon: 'i-lucide-compass',
    to: '/explore',
  },
  {
    label: 'My Trips',
    icon: 'i-lucide-map',
    to: '/trips'
  },
  {
    label: 'Create Trip',
    icon: 'i-lucide-plus-circle',
    to: '/create-trip'
  }
]]
</script>

<template>
  <u-app>
    <UDashboardGroup>
      <!-- Sidebar -->
      <UDashboardSidebar
        v-if="user"
        collapsible
        resizable
        :ui="{ footer: 'border-t border-default' }"
      >
        <!-- Header -->
        <template #header="{ collapsed }">
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="router.push('/')"
          >
            <Logo v-if="!collapsed" class="h-6 w-auto shrink-0" />
            <UIcon
              v-else
              name="i-lucide-map"
              class="size-5 text-primary mx-auto"
            />
            <span v-if="!collapsed" class="font-semibold text-lg">TripBoard</span>
          </div>
        </template>

        <!-- Sidebar Content -->
        <template #default="{ collapsed }">
          <UNavigationMenu
            :collapsed="collapsed"
            :items="items[0]"
            orientation="vertical"
            class="mt-4"
          />
        </template>

        <!-- Footer -->
        <template #footer="{ collapsed }">
          <div class="flex flex-col items-center w-full gap-2">
            <UButton
              v-if="user"
              icon="i-lucide-log-out"
              :label="collapsed ? undefined : 'Logout'"
              color="neutral"
              variant="ghost"
              class="w-full"
              :block="collapsed"
              @click="logout"
            />

            <UButton
              v-else
              label="Login"
              icon="i-lucide-log-in"
              color="neutral"
              variant="outline"
              class="w-full"
              @click="router.push('/login')"
            />
          </div>
        </template>
      </UDashboardSidebar>

      <!-- Main Content -->
      <UDashboardPanel>
        <main class="bg-gray-50 min-h-screen overflow-scroll">
          <slot />
        </main>
      </UDashboardPanel>
    </UDashboardGroup>
  </u-app>
</template>
