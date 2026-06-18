<script setup lang="ts">
useHead({ title: 'Facility Rental Inquiry — CST' })

const form = reactive({
  rentalType: '',
  teamName: '',
  contactName: '',
  email: '',
  phone: '',
  preferredDate: '',
  repeat: '',
  repeatUntil: '',
  repeatNoEnd: false,
  scheduleNote: '',
  preferredTime: '',
  duration: '',
  playerCount: '',
  _honey: '',
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

// Earliest selectable date (today, local) so visitors can't request past dates.
const today = new Date().toISOString().slice(0, 10)
const isRecurring = computed(() => form.repeat !== '' && form.repeat !== 'Does not repeat')

const { track } = useAnalytics()

async function submit() {
  status.value = 'loading'
  errorMsg.value = ''
  try {
    await $fetch('/api/inquire/facility', { method: 'POST', body: form })
    status.value = 'success'
    track('inquiry_submitted', { form: 'facility', rentalType: form.rentalType })
  } catch (err: unknown) {
    status.value = 'error'
    errorMsg.value = (err as { statusMessage?: string })?.statusMessage || 'Something went wrong. Please try again.'
  }
}

const inputClass = 'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-slate-400'
const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5'
</script>

<template>
  <!-- Header -->
  <section class="bg-slate-900 py-12">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <span class="text-orange-400 text-sm font-semibold uppercase tracking-widest">Facility Rental</span>
      <h1 class="text-4xl font-black text-white mt-3 mb-3">Facility Rental Inquiry</h1>
      <p class="text-slate-300">Fill out the form below and we'll respond within 24 hours to confirm your booking.</p>
    </div>
  </section>

  <!-- Form -->
  <section class="py-12 bg-slate-50">
    <div class="max-w-2xl mx-auto px-4 sm:px-6">
      <div class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">

        <!-- Success -->
        <div v-if="status === 'success'" role="status" class="text-center py-12">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 class="text-2xl font-black text-slate-900 mb-2">Inquiry Received!</h2>
          <p class="text-slate-600 mb-6">We'll review your rental request and respond within 24 hours to confirm availability and next steps.</p>
          <NuxtLink to="/" class="inline-block text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">
            ← Back to Home
          </NuxtLink>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submit" class="space-y-6" novalidate>
          <!-- Honeypot -->
          <div class="absolute -left-[9999px]" aria-hidden="true">
            <input type="text" name="_honey" v-model="form._honey" tabindex="-1" autocomplete="off">
          </div>

          <!-- Rental Type -->
          <div>
            <label for="rentalType" :class="labelClass">Rental Type <span class="text-red-500">*</span></label>
            <select id="rentalType" v-model="form.rentalType" required :class="inputClass">
              <option value="" disabled>Select a rental type</option>
              <option value="team-practice">Team Practice</option>
              <option value="private-game">Private Game</option>
              <option value="small-sided">Small-Sided Match</option>
              <option value="birthday">Birthday Soccer Event</option>
              <option value="club-training">Club Training</option>
              <option value="independent">Independent Trainer Session</option>
            </select>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-base font-bold text-slate-900 mb-4">Group Information</h3>
            <div class="space-y-4">
              <div>
                <label for="teamName" :class="labelClass">Team / Group Name <span class="text-red-500">*</span></label>
                <input id="teamName" v-model="form.teamName" type="text" required maxlength="100" placeholder="Your team or group name" :class="inputClass">
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="playerCount" :class="labelClass">Estimated Players</label>
                  <input id="playerCount" v-model="form.playerCount" type="number" min="1" max="100" maxlength="10" placeholder="e.g. 12" :class="inputClass">
                </div>
                <div>
                  <label for="duration" :class="labelClass">Duration</label>
                  <select id="duration" v-model="form.duration" :class="inputClass">
                    <option value="">Select duration</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                    <option value="2 hours">2 hours</option>
                    <option value="2.5 hours">2.5 hours</option>
                    <option value="3 hours">3 hours</option>
                    <option value="3+ hours">3+ hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-base font-bold text-slate-900 mb-4">Contact Information</h3>
            <div class="space-y-4">
              <div>
                <label for="contactName" :class="labelClass">Contact Name <span class="text-red-500">*</span></label>
                <input id="contactName" v-model="form.contactName" type="text" required maxlength="100" placeholder="Your full name" :class="inputClass">
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="email" :class="labelClass">Email Address <span class="text-red-500">*</span></label>
                  <input id="email" v-model="form.email" type="email" required maxlength="254" placeholder="you@example.com" :class="inputClass">
                </div>
                <div>
                  <label for="phone" :class="labelClass">Phone <span class="text-slate-400 font-normal">(optional)</span></label>
                  <input id="phone" v-model="form.phone" @input="form.phone = formatPhone(form.phone)" type="tel" inputmode="tel" maxlength="14" placeholder="(555) 000-0000" :class="inputClass">
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-base font-bold text-slate-900 mb-4">Preferred Schedule</h3>
            <div class="space-y-4">
              <div>
                <label for="preferredDate" :class="labelClass">Preferred Date</label>
                <input
                  id="preferredDate"
                  v-model="form.preferredDate"
                  type="date"
                  :min="today"
                  :class="inputClass"
                >
              </div>

              <div>
                <label for="repeat" :class="labelClass">Repeat</label>
                <select id="repeat" v-model="form.repeat" :class="inputClass">
                  <option value="">Does not repeat</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Every 2 weeks">Every 2 weeks</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div v-if="isRecurring">
                <label :class="labelClass">Ends</label>
                <label class="flex items-center gap-2 text-sm text-slate-700 mb-2">
                  <input v-model="form.repeatNoEnd" type="checkbox" class="rounded border-slate-300 text-orange-600 focus:ring-orange-500">
                  No end date (ongoing)
                </label>
                <input
                  v-if="!form.repeatNoEnd"
                  v-model="form.repeatUntil"
                  type="date"
                  :min="form.preferredDate || today"
                  aria-label="End date"
                  :class="inputClass"
                >
              </div>

              <div>
                <label for="scheduleNote" :class="labelClass">Scheduling notes <span class="text-slate-400 font-normal">(optional)</span></label>
                <input
                  id="scheduleNote"
                  v-model="form.scheduleNote"
                  type="text"
                  maxlength="500"
                  placeholder="e.g. flexible on the exact day, or alternate dates that work"
                  :class="inputClass"
                >
              </div>
              <div>
                <label for="preferredTime" :class="labelClass">Preferred Start Time</label>
                <select id="preferredTime" v-model="form.preferredTime" :class="inputClass">
                  <option value="">No preference</option>
                  <option value="Morning (Before 12pm)">Morning (Before 12pm)</option>
                  <option value="Early Afternoon (12pm – 3pm)">Early Afternoon (12pm – 3pm)</option>
                  <option value="Late Afternoon (3pm – 6pm)">Late Afternoon (3pm – 6pm)</option>
                  <option value="Evening (After 6pm)">Evening (After 6pm)</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="status === 'loading'"
            class="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            <span v-if="status === 'loading'">Sending Inquiry...</span>
            <span v-else>Submit Facility Inquiry</span>
          </button>

          <p v-if="status === 'error'" role="alert" class="text-red-600 text-sm text-center bg-red-50 rounded-lg px-4 py-3">
            {{ errorMsg }}
          </p>

          <p class="text-slate-500 text-xs text-center">
            We review every inquiry and respond within 24 hours. No payment is collected until your booking is confirmed.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
