<script setup lang="ts">
useHead({ title: 'Facility Rental — CST Indoor Facility' })

const useCases = [
  { label: 'Team Practices', description: 'A dedicated indoor space for your team to train in a controlled environment year-round.' },
  { label: 'Private Games', description: 'Host private games and scrimmages for your group, team, or club.' },
  { label: 'Small-Sided Matches', description: 'Perfect for 3v3, 4v4, 5v5, or other small-sided formats.' },
  { label: 'Birthday Soccer Events', description: 'An unforgettable soccer birthday experience for kids and teens.' },
  { label: 'Club Training', description: 'Ideal for clubs looking for additional training space outside regular fields.' },
  { label: 'Independent Trainer Sessions', description: 'Trainers can book the facility for private sessions with their own clients.' },
]

const steps = [
  { title: 'Submit a Rental Inquiry', description: 'Fill out our facility rental inquiry form with your preferred date, time, duration, and rental type.' },
  { title: 'We Confirm Availability', description: 'We review your inquiry and respond within 24 hours to confirm the date and discuss any details.' },
  { title: 'Finalize and Pay', description: 'Once confirmed, we send payment instructions to lock in your time slot.' },
  { title: 'Show Up and Play', description: 'Arrive at the facility at your scheduled time — the space is yours for the full duration.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="bg-slate-900 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="h-px w-10 bg-green-500"></div>
        <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">Indoor Facility</span>
      </div>
      <h1 class="text-5xl font-black text-white mb-4">Private Indoor Facility Rental</h1>
      <p class="text-xl text-slate-300 max-w-2xl">
        Book CST's private indoor facility for team practices, games, training events, and more.
      </p>
    </div>
  </section>

  <!-- Use Cases -->
  <section class="py-16 bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <span class="text-blue-600 text-sm font-semibold uppercase tracking-widest">How It's Used</span>
        <h2 class="text-3xl font-black text-slate-900 mt-2">Rental Use Cases</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="use in useCases"
          :key="use.label"
          class="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-green-200 hover:shadow-sm transition-all"
        >
          <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="font-bold text-slate-900 mb-2">{{ use.label }}</h3>
          <p class="text-slate-600 text-sm leading-relaxed">{{ use.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-16 bg-slate-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10">
        <span class="text-blue-600 text-sm font-semibold uppercase tracking-widest">Process</span>
        <h2 class="text-3xl font-black text-slate-900 mt-2">How Facility Booking Works</h2>
      </div>
      <div class="space-y-6">
        <div v-for="(step, i) in steps" :key="step.title" class="flex gap-5">
          <div class="flex-shrink-0 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
            <span class="text-white font-black text-sm">{{ i + 1 }}</span>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">{{ step.title }}</h3>
            <p class="text-slate-600 text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 bg-slate-900">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-3xl font-black text-white mb-4">Ready to Book the Facility?</h2>
      <p class="text-slate-300 mb-8 text-lg">Submit your rental inquiry and we'll confirm availability within 24 hours.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <NuxtLink to="/inquire/facility" class="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Book Facility Time
        </NuxtLink>
        <NuxtLink to="/contact" class="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Ask a Question
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
