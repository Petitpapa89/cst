<script setup lang="ts">
useHead({ title: 'CST — Chiennee Soccer Training | Strong Training. Strong Players.' })

const programs = [
  {
    title: '1-on-1 Private Training',
    description: 'Personalized sessions focused on technical ability, confidence, and individual development.',
    to: '/inquire/training',
    svgPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Small Group Training',
    description: 'Competitive sessions with realistic pressure and game-like decision-making.',
    to: '/inquire/training',
    svgPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Team Training',
    description: 'Technical development, game intelligence, and tactical habits for full teams.',
    to: '/inquire/training',
    svgPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: 'Speed & Agility',
    description: 'Movement training for acceleration, change of direction, balance, and explosiveness.',
    to: '/inquire/training',
    svgPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Indoor Facility Rental',
    description: 'Book our private facility for team practices, games, events, and independent sessions.',
    to: '/inquire/facility',
    svgPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
]
</script>

<template>
  <!-- Hero -->
  <section class="min-h-screen bg-slate-900 flex items-center relative overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="flex items-center gap-3 mb-8">
            <div class="h-px w-10 bg-green-500"></div>
            <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">Chiennee Soccer Training</span>
          </div>
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Strong Training.<br>Strong Players.
          </h1>
          <p class="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Private soccer training focused on technical development, confidence, decision-making, and character.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/inquire/training" class="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
              Book Training
            </NuxtLink>
            <NuxtLink to="/inquire/facility" class="border-2 border-slate-600 hover:border-white text-slate-300 hover:text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
              Rent Facility
            </NuxtLink>
          </div>
        </div>
        <div class="hidden lg:block">
          <img
            src="/images/training-action.jpg"
            alt="A CST player working on close ball control during a training session"
            class="rounded-3xl shadow-2xl ring-1 ring-white/10 w-full object-cover max-h-[560px]"
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Mission -->
  <section class="py-24 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="h-px w-10 bg-green-500"></div>
        <span class="text-green-600 text-sm font-semibold uppercase tracking-widest">Our Mission</span>
        <div class="h-px w-10 bg-green-500"></div>
      </div>
      <h2 class="text-4xl font-black text-slate-900 mb-6">Training That Builds More Than Players</h2>
      <p class="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
        At CST, we believe soccer is more than competition. Our training develops discipline, confidence, teamwork, leadership, and love for the game through high-standard, game-like sessions.
      </p>
      <NuxtLink to="/about" class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors">
        Learn About CST
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </NuxtLink>
    </div>
  </section>

  <!-- Programs -->
  <section class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-14">
        <span class="text-green-600 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
        <h2 class="text-4xl font-black text-slate-900 mt-2">Training Programs</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="program in programs"
          :key="program.title"
          :to="program.to"
          class="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-green-200 hover:shadow-lg transition-all"
        >
          <div :class="[program.iconBg, 'w-12 h-12 rounded-xl flex items-center justify-center mb-4']">
            <svg :class="[program.iconColor, 'w-6 h-6']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="program.svgPath" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">{{ program.title }}</h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">{{ program.description }}</p>
          <span class="inline-flex items-center gap-1 text-green-600 text-sm font-semibold group-hover:gap-2 transition-all">
            Inquire
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </NuxtLink>
      </div>
      <div class="text-center mt-10">
        <NuxtLink to="/programs" class="inline-block border border-slate-300 hover:border-slate-600 text-slate-700 hover:text-slate-900 font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
          View All Programs
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Coaches -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto">
        <span class="text-green-600 text-sm font-semibold uppercase tracking-widest">Our Team</span>
        <h2 class="text-4xl font-black text-slate-900 mt-2 mb-4">Meet Our Coaches</h2>
        <p class="text-slate-600 leading-relaxed mb-8">
          CST coaches are more than trainers — they are mentors committed to your growth as a player and a person.
        </p>
        <NuxtLink to="/coaches" class="inline-block border border-slate-300 hover:border-slate-600 text-slate-700 hover:text-slate-900 font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
          Meet All Coaches
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Facility Preview -->
  <section class="py-24 bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="max-w-2xl">
        <div class="flex items-center gap-3 mb-4">
          <div class="h-px w-10 bg-orange-500"></div>
          <span class="text-orange-400 text-sm font-semibold uppercase tracking-widest">Indoor Facility</span>
        </div>
        <h2 class="text-4xl font-black text-white mb-6">Private Indoor Facility Rental</h2>
        <p class="text-slate-300 text-lg leading-relaxed mb-6">
          Book our indoor facility for private games, team practices, small-sided matches, and training sessions.
        </p>
        <ul class="space-y-2 mb-8">
          <li v-for="use in ['Team practices & scrimmages', 'Private games & small-sided matches', 'Birthday soccer events', 'Club & independent trainer sessions']" :key="use" class="flex items-center gap-2 text-slate-400 text-sm">
            <svg class="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            {{ use }}
          </li>
        </ul>
        <NuxtLink to="/inquire/facility" class="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Book Facility Time
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="py-24 bg-green-600">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-4xl font-black text-white mb-4">Ready to Start Strong Training?</h2>
      <p class="text-green-100 text-xl mb-10">Join CST and develop the skills, confidence, and character that will set you apart.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <NuxtLink to="/inquire/training" class="bg-white hover:bg-green-50 text-green-600 font-bold px-8 py-4 rounded-xl transition-colors">
          Book Training
        </NuxtLink>
        <NuxtLink to="/inquire/facility" class="border-2 border-white/60 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Rent Facility
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
