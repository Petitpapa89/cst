<script setup lang="ts">
const isOpen = ref(false)
const route = useRoute()
watch(route, () => { isOpen.value = false })

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Facility', to: '/facility-rental' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span class="text-white font-black text-sm tracking-tight">CST</span>
        </div>
        <div class="hidden sm:block leading-tight">
          <div class="text-white font-bold text-sm">Chiennee Soccer Training</div>
          <div class="text-green-400 text-xs font-medium">Strong Training. Strong Players.</div>
        </div>
      </NuxtLink>

      <nav aria-label="Primary" class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-slate-300 hover:text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
          active-class="text-white bg-slate-800"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink
          to="/inquire/training"
          class="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Book Training
        </NuxtLink>
        <button
          @click="isOpen = !isOpen"
          class="md:hidden text-slate-300 hover:text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
          :aria-label="isOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isOpen"
          aria-controls="mobile-menu"
        >
          <svg v-if="!isOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="isOpen" id="mobile-menu" aria-label="Mobile" class="md:hidden bg-slate-900 border-t border-slate-800">
        <div class="px-4 py-3 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block text-slate-300 hover:text-white text-sm font-medium px-3 py-2.5 rounded-md hover:bg-slate-800 transition-colors"
            active-class="text-white bg-slate-800"
          >
            {{ link.label }}
          </NuxtLink>
          <div class="pt-3 mt-2 border-t border-slate-800 space-y-2">
            <NuxtLink to="/inquire/training" class="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-3 rounded-lg transition-colors">
              Book Training
            </NuxtLink>
            <NuxtLink to="/inquire/facility" class="block text-center border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm px-4 py-3 rounded-lg transition-colors">
              Rent Facility
            </NuxtLink>
          </div>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active, .menu-leave-active { transition: all 0.2s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
