<script setup lang="ts">
const route = useRoute()
const { getCoach } = useCoaches()
const coach = getCoach(route.params.slug as string)

if (!coach) {
  throw createError({ statusCode: 404, statusMessage: 'Coach not found' })
}

useHead({ title: `${coach.name} — CST Coach` })
</script>

<template>
  <!-- Hero -->
  <section class="bg-slate-900 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <NuxtLink to="/coaches" class="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        All Coaches
      </NuxtLink>
      <div class="flex flex-col sm:flex-row gap-6 items-start">
        <div class="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span class="text-white font-black text-3xl">{{ coach.initials }}</span>
        </div>
        <div>
          <h1 class="text-4xl font-black text-white mb-2">{{ coach.name }}</h1>
          <p class="text-blue-400 font-semibold mb-4">{{ coach.title }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="s in coach.specialties"
              :key="s"
              class="bg-slate-800 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full"
            >{{ s }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Content -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Main -->
        <div class="lg:col-span-2 space-y-10">
          <div>
            <h2 class="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">About</h2>
            <p class="text-slate-700 leading-relaxed text-lg">{{ coach.bio }}</p>
          </div>
          <div>
            <h2 class="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Training Philosophy</h2>
            <p class="text-slate-700 leading-relaxed">{{ coach.philosophy }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Session Types</h3>
            <ul class="space-y-2">
              <li
                v-for="type in coach.sessionTypes"
                :key="type"
                class="flex items-center gap-2 text-sm text-slate-700"
              >
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                {{ type }}
              </li>
            </ul>
          </div>

          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Pricing</h3>
            <p class="text-slate-700 text-sm">{{ coach.rateNote }}</p>
          </div>

          <div class="bg-blue-600 rounded-2xl p-6">
            <h3 class="text-white font-bold mb-2">Book a Session</h3>
            <p class="text-blue-100 text-sm mb-4">Submit an inquiry and we'll get back to you within 24 hours.</p>
            <NuxtLink
              to="/inquire/training"
              class="block text-center bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 px-4 rounded-xl text-sm transition-colors"
            >
              Book Training
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="block text-center mt-2 text-blue-200 hover:text-white text-sm font-medium transition-colors"
            >
              Ask a Question
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
