<script setup lang="ts">
useHead({ title: 'Contact — CST' })

const form = reactive({
  name: '',
  email: '',
  phone: '',
  playerAge: '',
  interest: 'training' as 'training' | 'facility' | 'general',
  message: '',
  _honey: '',
})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const { track } = useAnalytics()

async function submit() {
  status.value = 'loading'
  errorMsg.value = ''
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    status.value = 'success'
    track('inquiry_submitted', { form: 'contact', interest: form.interest })
  } catch (err: unknown) {
    status.value = 'error'
    errorMsg.value = (err as { statusMessage?: string })?.statusMessage || 'Something went wrong. Please try again.'
  }
}

const openFaq = ref<number | null>(null)
const toggle = (i: number) => { openFaq.value = openFaq.value === i ? null : i }

const faqs = [
  { q: 'What ages do you train?', a: 'We train players of all ages, from youth beginners to advanced competitive players. Our programs are tailored to each player\'s age, skill level, and goals.' },
  { q: 'Do you offer beginner training?', a: 'Absolutely. Our 1-on-1 private sessions are ideal for players at any level, including beginners. We meet every player where they are and build from there.' },
  { q: 'Can teams rent the facility?', a: 'Yes. Our indoor facility is available for team practices, small-sided games, club training, birthday events, and more. Submit a facility inquiry and we\'ll confirm availability.' },
  { q: 'Can I choose my coach?', a: 'Yes. When you submit your training inquiry, you can indicate a coach preference. We\'ll do our best to accommodate your request.' },
  { q: 'How does the booking process work?', a: 'Submit an inquiry through our training or facility form. We review every inquiry and respond within 24 hours to confirm availability, discuss details, and finalize the session.' },
  { q: 'Do I pay online?', a: 'After confirming your session, we\'ll send payment instructions. We handle this manually to ensure everything is a great fit before any payment is collected.' },
  { q: 'What is the cancellation policy?', a: 'Cancellations made 24 hours or more in advance can be rescheduled at no cost. Please contact us as soon as possible if you need to make changes.' },
]

const inputClass = 'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5'
</script>

<template>
  <!-- Hero -->
  <section class="bg-slate-900 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
      <h1 class="text-5xl font-black text-white mt-3 mb-4">Contact CST</h1>
      <p class="text-xl text-slate-300 max-w-2xl mx-auto">Have a general question? Send us a message and we'll respond within 24 hours.</p>
      <div class="flex flex-wrap justify-center gap-4 mt-6">
        <NuxtLink to="/inquire/training" class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
          Training Inquiry
        </NuxtLink>
        <NuxtLink to="/inquire/facility" class="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
          Facility Inquiry
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Form + FAQ -->
  <section class="py-16 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <h2 class="text-2xl font-black text-slate-900 mb-6">Send a Message</h2>

          <div v-if="status === 'success'" class="text-center py-10">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Message Received!</h3>
            <p class="text-slate-600 text-sm">We'll get back to you within 24 hours.</p>
          </div>

          <form v-else @submit.prevent="submit" class="space-y-5" novalidate>
            <!-- Honeypot -->
            <div class="absolute -left-[9999px]" aria-hidden="true">
              <input type="text" name="_honey" v-model="form._honey" tabindex="-1" autocomplete="off">
            </div>

            <div>
              <label :class="labelClass">Name <span class="text-red-500">*</span></label>
              <input v-model="form.name" type="text" required maxlength="100" placeholder="Your name" :class="inputClass">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label :class="labelClass">Email <span class="text-red-500">*</span></label>
                <input v-model="form.email" type="email" required maxlength="254" placeholder="you@example.com" :class="inputClass">
              </div>
              <div>
                <label :class="labelClass">Phone</label>
                <input v-model="form.phone" @input="form.phone = formatPhone(form.phone)" type="tel" inputmode="tel" maxlength="14" placeholder="(555) 000-0000" :class="inputClass">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label :class="labelClass">Player Age</label>
                <input v-model="form.playerAge" type="text" maxlength="20" placeholder="e.g. 12, or 16-18" :class="inputClass">
              </div>
              <div>
                <label :class="labelClass">Interested In <span class="text-red-500">*</span></label>
                <select v-model="form.interest" required :class="inputClass">
                  <option value="training">Training Sessions</option>
                  <option value="facility">Facility Rental</option>
                  <option value="general">General Question</option>
                </select>
              </div>
            </div>

            <div>
              <label :class="labelClass">Message <span class="text-red-500">*</span></label>
              <textarea v-model="form.message" required minlength="10" maxlength="2000" rows="4" placeholder="Tell us how we can help..." :class="inputClass"></textarea>
            </div>

            <button
              type="submit"
              :disabled="status === 'loading'"
              class="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-sm"
            >
              <span v-if="status === 'loading'">Sending...</span>
              <span v-else>Send Message</span>
            </button>

            <p v-if="status === 'error'" class="text-red-600 text-sm text-center">{{ errorMsg }}</p>
          </form>
        </div>

        <!-- FAQ -->
        <div>
          <h2 class="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div class="space-y-3">
            <div
              v-for="(faq, i) in faqs"
              :key="i"
              class="bg-white rounded-xl border border-slate-100 overflow-hidden"
            >
              <button
                @click="toggle(i)"
                class="w-full flex items-center justify-between px-5 py-4 text-left text-slate-900 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                <span>{{ faq.q }}</span>
                <svg
                  :class="['w-4 h-4 text-slate-400 flex-shrink-0 ml-3 transition-transform', openFaq === i ? 'rotate-180' : '']"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <Transition name="faq">
                <div v-if="openFaq === i" class="px-5 pb-4">
                  <p class="text-slate-600 text-sm leading-relaxed">{{ faq.a }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-enter-active, .faq-leave-active { transition: all 0.2s ease; }
.faq-enter-from, .faq-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
