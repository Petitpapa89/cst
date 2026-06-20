<script setup lang="ts">
useHead({ title: 'CST — Chiennee Soccer Training | Strong Training. Strong Players.' })

const { programs } = usePrograms()
const { sponsors } = useSponsors()
const { testimonials } = useTestimonials()
const STAR = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.98 9.384c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.951-.69l1.286-3.957z'
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
          :to="program.trainingType ? { path: program.to, query: { type: program.trainingType } } : program.to"
          class="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-green-200 hover:shadow-lg transition-all"
        >
          <div :class="[program.iconBg, 'w-12 h-12 rounded-xl flex items-center justify-center mb-4']">
            <svg :class="[program.iconColor, 'w-6 h-6']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="program.svgPath" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">{{ program.title }}</h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">{{ program.tagline }}</p>
          <div class="flex items-baseline gap-1 mb-4 pt-4 border-t border-slate-100">
            <span class="text-xl font-black text-slate-900">{{ program.price }}</span>
            <span class="text-xs font-medium text-slate-500">{{ program.priceUnit }}</span>
            <span v-if="program.priceNote" class="text-xs text-slate-400 ml-1">· {{ program.priceNote }}</span>
          </div>
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
  <section
    id="coaches"
    class="relative py-28 overflow-hidden bg-slate-900 bg-cover bg-center"
    style="background-image: url('/videos/coaches-poster.jpg')"
  >
    <video
      class="bg-video absolute inset-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      poster="/videos/coaches-poster.jpg"
      aria-hidden="true"
    >
      <source src="/videos/coaches.webm" type="video/webm">
      <source src="/videos/coaches.mp4" type="video/mp4">
    </video>
    <!-- Brand-tinted dark overlay so text stays readable over the footage -->
    <div class="absolute inset-0 bg-slate-900/80"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto">
        <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">Our Team</span>
        <h2 class="text-4xl font-black text-white mt-2 mb-4">Meet Our Coaches</h2>
        <p class="text-slate-300 leading-relaxed mb-8">
          CST coaches are more than trainers — they are mentors committed to your growth as a player and a person.
        </p>
        <NuxtLink to="/coaches" class="inline-block border border-slate-500 hover:border-white text-slate-200 hover:text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
          Meet All Coaches
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-24 bg-slate-50 overflow-hidden">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center mb-14">
      <span class="text-green-600 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
      <h2 class="text-4xl font-black text-slate-900 mt-2 mb-4">What Players &amp; Families Say</h2>
      <p class="text-slate-600 leading-relaxed">Real words from the parents and players who train with CST.</p>
    </div>
    <div class="marquee-mask">
      <div class="marquee-track flex w-max">
        <figure
          v-for="t in testimonials"
          :key="t.name"
          class="flex-shrink-0 w-80 mr-6 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col text-left"
        >
          <div class="flex gap-0.5 mb-3" :aria-label="`${t.rating} out of 5 stars`">
            <svg v-for="n in t.rating" :key="n" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path :d="STAR" /></svg>
          </div>
          <blockquote class="flex-1 text-slate-700 text-sm leading-relaxed">{{ t.quote }}</blockquote>
          <figcaption class="mt-4 font-bold text-slate-900 text-sm">— {{ t.name }}</figcaption>
        </figure>
        <!-- duplicate set for the seamless loop (hidden from screen readers) -->
        <figure
          v-for="t in testimonials"
          :key="t.name + '-dup'"
          aria-hidden="true"
          class="flex-shrink-0 w-80 mr-6 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col text-left"
        >
          <div class="flex gap-0.5 mb-3">
            <svg v-for="n in t.rating" :key="n" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path :d="STAR" /></svg>
          </div>
          <blockquote class="flex-1 text-slate-700 text-sm leading-relaxed">{{ t.quote }}</blockquote>
          <figcaption class="mt-4 font-bold text-slate-900 text-sm">— {{ t.name }}</figcaption>
        </figure>
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
        <NuxtLink to="/programs" class="bg-white hover:bg-green-50 text-green-600 font-bold px-8 py-4 rounded-xl transition-colors">
          Book Training
        </NuxtLink>
        <NuxtLink to="/inquire/facility" class="border-2 border-white/60 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Rent Facility
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Sponsors -->
  <section class="py-16 bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
      <span class="text-green-600 text-sm font-semibold uppercase tracking-widest">Our Sponsors</span>
      <h2 class="text-3xl font-black text-slate-900 mt-2 mb-10">Proudly Supported By</h2>
      <div class="flex flex-wrap justify-center items-center gap-6">
        <component
          :is="s.url ? 'a' : 'div'"
          v-for="s in sponsors"
          :key="s.name"
          :href="s.url || undefined"
          :target="s.url ? '_blank' : undefined"
          :rel="s.url ? 'noopener sponsored' : undefined"
          class="bg-black rounded-2xl p-4 w-40 h-40 flex items-center justify-center ring-1 ring-slate-200 hover:scale-105 transition-transform"
        >
          <img :src="s.logo" :alt="`${s.name} logo`" class="max-w-full max-h-full object-contain">
        </component>
      </div>
    </div>
  </section>
</template>
