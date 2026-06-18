<script setup lang="ts">
useHead({ title: 'Meet Our Coaches — CST' })
const { coaches } = useCoaches()

// Bios under this length show in full; longer ones collapse behind a "More" toggle.
const BIO_PREVIEW_LIMIT = 180
const expanded = reactive<Record<string, boolean>>({})
const isLong = (bio: string) => bio.length > BIO_PREVIEW_LIMIT
const previewBio = (bio: string) =>
  isLong(bio) ? bio.slice(0, BIO_PREVIEW_LIMIT).replace(/\s+\S*$/, '') + '…' : bio
</script>

<template>
  <!-- Hero -->
  <section class="bg-slate-900 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">Our Team</span>
      <h1 class="text-5xl font-black text-white mt-3 mb-4">Meet Our Coaches</h1>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto">
        CST coaches are more than trainers — they are mentors committed to your growth as a player and a person.
      </p>
    </div>
  </section>

  <!-- Coaches -->
  <section class="py-16 bg-slate-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div
        v-for="coach in coaches"
        :key="coach.slug"
        class="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow mb-8"
      >
        <div class="p-8 sm:flex sm:gap-8">
          <div class="flex-shrink-0 mb-6 sm:mb-0">
            <div class="w-24 h-24 bg-green-600 rounded-2xl flex items-center justify-center">
              <span class="text-white font-black text-3xl">{{ coach.initials }}</span>
            </div>
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-black text-slate-900 mb-1">{{ coach.name }}</h2>
            <p class="text-green-600 font-semibold text-sm mb-4">{{ coach.title }}</p>
            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="s in coach.specialties"
                :key="s"
                class="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >{{ s }}</span>
            </div>
            <div class="mb-4">
              <p class="text-slate-600 leading-relaxed">
                {{ expanded[coach.slug] ? coach.bio : previewBio(coach.bio) }}
                <button
                  v-if="isLong(coach.bio)"
                  type="button"
                  @click="expanded[coach.slug] = !expanded[coach.slug]"
                  class="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  {{ expanded[coach.slug] ? 'Less' : 'More' }}
                </button>
              </p>
            </div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Session Types</p>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="type in coach.sessionTypes"
                :key="type"
                class="border border-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full"
              >{{ type }}</span>
            </div>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                to="/inquire/training"
                class="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-lg text-sm transition-colors"
              >
                Book a Session
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 bg-green-600">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-3xl font-black text-white mb-4">Ready to Train with CST?</h2>
      <p class="text-green-100 mb-8">Submit a training inquiry and we'll match you with the right coach and program.</p>
      <NuxtLink to="/inquire/training" class="inline-block bg-white hover:bg-green-50 text-green-600 font-bold px-8 py-4 rounded-xl transition-colors">
        Book Training
      </NuxtLink>
    </div>
  </section>
</template>
