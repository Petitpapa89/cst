<script setup lang="ts">
useHead({ title: 'About CST — Chiennee Soccer Training' })

const values = [
  { title: 'Technical Ability', description: 'Ball control, passing, shooting, and position-specific skills built through repetitive, quality training.' },
  { title: 'Game Intelligence', description: 'Reading the game, making smart decisions, and understanding space, pressure, and timing under real match conditions.' },
  { title: 'Confidence', description: 'Building the mental strength to perform under pressure and express themselves freely on the ball.' },
  { title: 'Discipline & Effort', description: 'A strong work ethic, respect for the process, and commitment to consistent improvement.' },
  { title: 'Teamwork & Leadership', description: 'Communicating, supporting teammates, and taking responsibility both on and off the field.' },
  { title: 'Love for the Game', description: 'Training environments that are challenging, rewarding, and genuinely enjoyable at every level.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="bg-slate-900 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">Who We Are</span>
      <h1 class="text-5xl font-black text-white mt-3 mb-4">About CST</h1>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto">
        Strong Training. Strong Players. Strong Character.
      </p>
    </div>
  </section>

  <!-- What CST Means -->
  <section class="py-20 bg-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="h-px w-10 bg-green-500"></div>
        <span class="text-green-600 text-sm font-semibold uppercase tracking-widest">What We Stand For</span>
      </div>
      <h2 class="text-3xl font-black text-slate-900 mb-6">What CST Means</h2>
      <p class="text-slate-700 text-lg leading-relaxed mb-4">
        CST stands for <strong>Chiennee Soccer Training</strong> — and Chiennee means <strong>strong training</strong>. That name is the foundation of everything we do.
      </p>
      <p class="text-slate-600 leading-relaxed">
        Our mission is to help soccer players grow technically, mentally, and personally through dedicated, high-quality training. Every session at CST is designed to challenge players, build their confidence, and develop the discipline and love for the game that drives long-term growth.
      </p>
    </div>
  </section>

  <!-- Philosophy -->
  <section class="py-20 bg-slate-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="h-px w-10 bg-blue-500"></div>
        <span class="text-blue-600 text-sm font-semibold uppercase tracking-widest">Our Approach</span>
      </div>
      <h2 class="text-3xl font-black text-slate-900 mb-6">Training Philosophy</h2>
      <div class="space-y-4 text-slate-600 leading-relaxed text-base">
        <p>Our coaching philosophy is centered on player development, character, and long-term growth. Soccer is more than competition — it is a powerful tool for teaching discipline, confidence, teamwork, and leadership.</p>
        <p>Our approach prioritizes long-term development over short-term results, especially at the youth level. Training sessions are designed to improve technical ability, game intelligence, and decision-making in realistic, game-like environments.</p>
        <p>Players are encouraged to be confident on the ball, think independently, and express themselves without fear of mistakes.</p>
      </div>
    </div>
  </section>

  <!-- Values Grid -->
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="h-px w-10 bg-green-500"></div>
        <span class="text-green-600 text-sm font-semibold uppercase tracking-widest">What We Develop</span>
      </div>
      <h2 class="text-3xl font-black text-slate-900 mb-10">Player Development Approach</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div
          v-for="value in values"
          :key="value.title"
          class="border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all"
        >
          <h3 class="font-bold text-slate-900 mb-2">{{ value.title }}</h3>
          <p class="text-slate-600 text-sm leading-relaxed">{{ value.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Standards -->
  <section class="py-20 bg-slate-900">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl font-black text-white mb-6">High Standards. Full Support.</h2>
      <p class="text-slate-300 text-lg leading-relaxed mb-4">
        We hold players to high standards of effort, discipline, and respect while providing the support and guidance needed for growth.
      </p>
      <p class="text-slate-400 leading-relaxed mb-8">
        Every player is valued, challenged, and given the opportunity to develop regardless of current ability. Strong Training is for every player willing to put in the work.
      </p>
      <NuxtLink to="/inquire/training" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors">
        Start Your Journey
      </NuxtLink>
    </div>
  </section>
</template>
