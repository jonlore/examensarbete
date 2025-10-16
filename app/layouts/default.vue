<script setup lang="ts">
const router = useRouter()

import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Benjamin',
      avatar: {
        src: 'https://github.com/benjamincanac.png'
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor'
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/docs/components/dropdown-menu'
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q']
    }
  ]
])
</script>

<template>
  <u-app>
    <header class="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white">
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
          <span class="font-semibold text-lg">TripBoard</span>
        </div>

        <!-- Navigation Links -->
        <NuxtLink to="/" class="text-sm font-medium text-gray-600 hover:text-gray-900">
          Discover
        </NuxtLink>

      </div>

      <!-- Center Section: Search Bar -->
      <div class="w-full max-w-md px-4">
        <UInput
          placeholder="Search destinations..."
          icon="i-lucide-search"
          class="w-full"
        />
      </div>

      <!-- Right Section: Actions -->
      <div class="flex items-center gap-4">
        <!-- Create Trip Button -->
        <UButton
          label="Create Trip"
          color="primary"
          icon="i-lucide-plus"
          @click="router.push('/create-trip')"
        />

        <!-- My Trips Icon -->
        <UButton
          label="Saved Trips"
          icon="i-lucide-map"
          variant="ghost"
          @click="router.push('/trips')"
        />

        <!-- Profile Dropdown -->
        <UDropdownMenu
          :items="items"
          :ui="{
            content: 'w-48'
          }"
        >
          <UButton icon="i-lucide-user" color="neutral" variant="outline" />
        </UDropdownMenu>

      </div>
    </header>

    <!-- Page Content -->
    <main>
      <slot />
    </main>
  </u-app>
</template>
