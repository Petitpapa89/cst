<script setup lang="ts">
useHead({ title: 'Training Programs — CST' })

const programs = [
  {
    title: '1-on-1 Private Training',
    description: 'Personalized training focused on technical ability, confidence, and individual development. Work directly with a CST coach to address your specific needs and accelerate your growth.',
    bestFor: ['Players needing focused individual attention', 'Technical skill improvement', 'Confidence and decision-making', 'Position-specific development'],
    cta: 'Inquire About Private Training',
    to: '/inquire/training',
    svgPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    ctaBg: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'Small Group Training',
    description: 'Competitive sessions with a small number of players, designed to create realistic pressure and game-like decision-making. Train harder together and push each other to improve.',
    bestFor: ['Friends or teammates training together', 'Competitive touches and pressure', 'Game-like development', 'Building chemistry with teammates'],
    cta: 'Inquire About Small Group',
    to: '/inquire/training',
    svgPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    ctaBg: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Team Training',
    description: 'Structured sessions for full teams focused on technical development, game intelligence, and tactical habits. Elevate your entire roster together.',
    bestFor: ['Club and recreational teams', 'Off-season development', 'Team chemistry and communication', 'Technical and tactical improvement'],
    cta: 'Request Team Training',
    to: '/inquire/training',
    svgPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    ctaBg: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    title: 'Speed & Agility',
    description: 'Movement training focused on acceleration, change of direction, balance, explosiveness, and injury prevention. Become a faster, more athletic player.',
    bestFor: ['Faster first step and acceleration', 'Better body control and balance', 'Athletic development at any level', 'Injury prevention and movement quality'],
    cta: 'Inquire About Speed & Agility',
    to: '/inquire/training',
    svgPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    ctaBg: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    title: 'Indoor Facility Rental',
    description: 'Book our private indoor facility for team practices, private games, small-sided matches, birthday soccer events, and independent training sessions.',
    bestFor: ['Team practices and scrimmages', 'Private games and small-sided matches', 'Birthday soccer events', 'Club and independent trainer sessions'],
    cta: 'Inquire About Facility Rental',
    to: '/inquire/facility',
    svgPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    ctaBg: 'bg-slate-800 hover:bg-slate-700',
  },
]
</script>

<template>
  <!-- Hero -->
  <section class="bg-slate-900 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
            <h2 class="text-2xl font-black text-slate-900 mb-2">{{ program.title }}</h2>
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
  <section class="py-16 bg-blue-600">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-3xl font-black text-white mb-4">Not Sure Which Program Is Right?</h2>
      <p class="text-blue-100 mb-8">Send us a message and we'll help you find the best fit for your player or team.</p>
      <NuxtLink to="/contact" class="inline-block bg-white hover:bg-blue-50 text-blue-600 font-bold px-8 py-4 rounded-xl transition-colors">
        Contact Us
      </NuxtLink>
    </div>
  </section>
</template>
