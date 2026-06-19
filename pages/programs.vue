<script setup lang="ts">
useHead({ title: 'Training Programs — CST' })

const { programs } = usePrograms()
</script>

<template>
  <!-- Hero -->
  <section
    class="relative py-28 overflow-hidden bg-slate-900 bg-cover bg-center"
    style="background-image: url('/videos/programs-poster.jpg')"
  >
    <video
      class="bg-video absolute inset-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      poster="/videos/programs-poster.jpg"
      aria-hidden="true"
    >
      <source src="/videos/programs.webm" type="video/webm">
      <source src="/videos/programs.mp4" type="video/mp4">
    </video>
    <!-- Brand-tinted dark overlay so text stays readable over the footage -->
    <div class="absolute inset-0 bg-slate-900/80"></div>
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
      <h1 class="text-5xl font-black text-white mt-3 mb-4">Training Programs</h1>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto">
        Every program is built around the CST philosophy: develop the whole player — technically, mentally, and personally.
      </p>
    </div>
  </section>

  <!-- Programs -->
  <section class="py-16 bg-slate-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
      <div
        v-for="program in programs"
        :key="program.title"
        class="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="p-8 sm:flex sm:gap-8">
          <div class="flex-shrink-0 mb-6 sm:mb-0">
            <div :class="[program.iconBg, 'w-14 h-14 rounded-2xl flex items-center justify-center']">
              <svg :class="[program.iconColor, 'w-7 h-7']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="program.svgPath" />
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <div class="sm:flex sm:items-start sm:justify-between sm:gap-4 mb-2">
              <h2 class="text-2xl font-black text-slate-900">{{ program.title }}</h2>
              <div class="flex-shrink-0 mt-1 sm:mt-0 sm:text-right">
                <span class="text-2xl font-black text-slate-900">{{ program.price }}</span>
                <span class="text-sm font-medium text-slate-500 ml-1">{{ program.priceUnit }}</span>
                <p v-if="program.priceNote" class="text-xs text-slate-500 mt-0.5">{{ program.priceNote }}</p>
              </div>
            </div>
            <p class="text-slate-600 leading-relaxed mb-5">{{ program.description }}</p>
            <div class="mb-6">
              <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Best For</p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                <li
                  v-for="item in program.bestFor"
                  :key="item"
                  class="flex items-center gap-2 text-sm text-slate-700"
                >
                  <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ item }}
                </li>
              </ul>
            </div>
            <NuxtLink
              :to="program.to"
              :class="[program.ctaBg, 'inline-block text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors']"
            >
              {{ program.cta }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 bg-green-600">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-3xl font-black text-white mb-4">Not Sure Which Program Is Right?</h2>
      <p class="text-green-100 mb-8">Send us a message and we'll help you find the best fit for your player or team.</p>
      <NuxtLink to="/contact" class="inline-block bg-white hover:bg-green-50 text-green-600 font-bold px-8 py-4 rounded-xl transition-colors">
        Contact Us
      </NuxtLink>
    </div>
  </section>
</template>
