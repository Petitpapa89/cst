<script setup lang="ts">
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Facility Rental', to: '/facility-rental' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <footer class="bg-slate-900 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div class="md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span class="text-white font-black text-sm">CST</span>
            </div>
            <div class="text-white font-bold text-sm leading-tight">Chiennee Soccer Training</div>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">
            Strong Training. Strong Players. Strong Character.<br>
            Private soccer training for technical development, confidence, and long-term growth.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 class="text-white font-semibold text-sm mb-4">Navigation</h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-slate-400 hover:text-white text-sm transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h3 class="text-white font-semibold text-sm mb-4">Inquire</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/inquire/training" class="text-slate-400 hover:text-white text-sm transition-colors">Book Training</NuxtLink></li>
            <li><NuxtLink to="/inquire/facility" class="text-slate-400 hover:text-white text-sm transition-colors">Rent Facility</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-slate-400 hover:text-white text-sm transition-colors">Contact Us</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-slate-400 text-sm">© {{ new Date().getFullYear() }} Chiennee Soccer Training. All rights reserved.</p>
        <p class="text-slate-400 text-xs">Built for Strong Players.</p>
      </div>
    </div>
  </footer>
</template>
