<script setup lang="ts">
import { ref} from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const mode = ref<'in' | 'up'>('in')
const email = ref('')
const password = ref('')

definePageMeta({
  layout: "auth"
})

watch(user, (val) => {
  if (val) navigateTo('/explore')
})

const toast = useToast?.()



const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.error('Sign-in failed:', error.message)
    toast?.add({ title: 'Sign in failed', description: error.message, color: 'error' })
  } else {
    toast?.add({ title: 'Signed in successfully', color: 'success' })
  }
}

const signUp = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.error('Sign-up failed:', error.message)
    toast?.add({ title: 'Sign up failed', description: error.message, color: 'error' })
  } else {
    toast?.add({ title: 'Sign up successful! Please check your email to verify your account.', color: 'success' })
  }
}

const handleSubmit = async () => {
  if (mode.value === 'in') await signIn()
  else await signUp()
}
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <!-- Left side: Login/Signup form -->
    <div class="flex flex-col justify-center items-center md:w-1/2 w-full p-8">
      <div class="w-full max-w-sm  p-6 space-y-4">
        <h2 class="text-2xl font-semibold">
          {{ mode === 'in' ? 'Sign In' : 'Sign Up' }}
        </h2>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="border p-3 rounded-lg w-full focus:ring-2 focus:ring-primary focus:outline-none"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border p-3 rounded-lg w-full focus:ring-2 focus:ring-primary focus:outline-none"
          required
        />

        <UButton
          :label="mode === 'in' ? 'Sign In' : 'Sign Up'"
          color="primary"
          icon="i-lucide-log-in"
          class="w-full text-center hover:cursor-pointer"
          @click="handleSubmit"
        />

        <p class="text-center text-sm mt-2 text-gray-600">
          {{ mode === 'in' ? "Don't have an account?" : 'Already have an account?' }}
          <UButton
            variant="link"
            class="p-0 text-primary font-medium"
            @click="mode = mode === 'in' ? 'up' : 'in'"
          >
            {{ mode === 'in' ? 'Sign up' : 'Sign in' }}
          </UButton>
        </p>
      </div>
    </div>

    <!-- Right side: Illustration or image -->
    <div class="hidden md:flex md:w-1/2 bg-gray-50 justify-center items-center">
      <img
        src="https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&q=80&w=2070"
        alt="Auth Illustration"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

