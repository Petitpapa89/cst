<script setup lang="ts">
useHead({ title: 'Training Inquiry — CST' })

// Pre-select the training type when arriving from a program card (e.g. ?type=1on1).
const route = useRoute()
const TRAINING_TYPES = ['1on1', 'small-group', 'team', 'speed-agility']
const presetType = TRAINING_TYPES.includes(route.query.type as string) ? (route.query.type as string) : ''

const form = reactive({
  trainingType: presetType,
  coachPreference: '',
  playerName: '',
  playerAge: '',
  parentName: '',
  email: '',
  phone: '',
  preferredDays: [] as string[],
  preferredTime: '',
  message: '',
  _honey: '',
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const { track } = useAnalytics()
const { coaches } = useCoaches()

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// Team & small-group inquiries are for a group, not one player — collect a
// team/group name + age range instead of a single player's name.
const isGroup = computed(() => form.trainingType === 'team' || form.trainingType === 'small-group')
const groupNoun = computed(() => (form.trainingType === 'team' ? 'Team' : 'Group'))

async function submit() {
  status.value = 'loading'
  errorMsg.value = ''
  try {
    await $fetch('/api/inquire/training', { method: 'POST', body: form })
    status.value = 'success'
    track('inquiry_submitted', { form: 'training', trainingType: form.trainingType })
  } catch (err: unknown) {
    status.value = 'error'
    errorMsg.value = (err as { statusMessage?: string })?.statusMessage || 'Something went wrong. Please try again.'
  }
}

const inputClass = 'w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-slate-400'
const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5'
</script>

<template>
  <!-- Header -->
  <section class="bg-slate-900 py-12">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <span class="text-green-400 text-sm font-semibold uppercase tracking-widest">Book Training</span>
      <h1 class="text-4xl font-black text-white mt-3 mb-3">Training Inquiry</h1>
      <p class="text-slate-300">Fill out the form below and we'll respond within 24 hours to confirm your session.</p>
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
          <p class="text-slate-600 mb-6">We'll review your inquiry and respond within 24 hours to confirm availability and discuss next steps.</p>
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

          <!-- Training Type -->
          <div>
            <label for="trainingType" :class="labelClass">Training Type <span class="text-red-500">*</span></label>
            <select id="trainingType" v-model="form.trainingType" required :class="inputClass">
              <option value="" disabled>Select a training type</option>
              <option value="1on1">1-on-1 Private Training</option>
              <option value="small-group">Small Group Training</option>
              <option value="team">Team Training</option>
              <option value="speed-agility">Speed & Agility</option>
            </select>
          </div>

          <!-- Coach Preference -->
          <div>
            <label for="coachPreference" :class="labelClass">Coach Preference <span class="text-slate-400 font-normal">(optional)</span></label>
            <select id="coachPreference" v-model="form.coachPreference" :class="inputClass">
              <option value="">No preference</option>
              <option v-for="coach in coaches" :key="coach.slug" :value="coach.name">{{ coach.name }}</option>
            </select>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-base font-bold text-slate-900 mb-4">{{ isGroup ? groupNoun + ' Information' : 'Player Information' }}</h3>
            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="playerName" :class="labelClass">{{ isGroup ? groupNoun + ' Name' : 'Player Name' }} <span class="text-red-500">*</span></label>
                  <input id="playerName" v-model="form.playerName" type="text" required maxlength="100" :placeholder="isGroup ? (form.trainingType === 'team' ? 'Your team or club name' : 'Your group name') : `Player's full name`" :class="inputClass">
                </div>
                <div>
                  <label for="playerAge" :class="labelClass">{{ isGroup ? groupNoun + ' Age Range' : 'Player Age' }} <span class="text-red-500">*</span></label>
                  <input id="playerAge" v-model="form.playerAge" type="text" required maxlength="30" :placeholder="isGroup ? 'e.g. U12, or ages 10–13' : 'e.g. 14, or U12'" :class="inputClass">
                </div>
              </div>
              <div v-if="!isGroup">
                <label for="parentName" :class="labelClass">Parent / Guardian Name <span class="text-slate-400 font-normal">(for minors)</span></label>
                <input id="parentName" v-model="form.parentName" type="text" maxlength="100" placeholder="Parent or guardian's name" :class="inputClass">
              </div>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-base font-bold text-slate-900 mb-4">Contact Information</h3>
            <div class="space-y-4">
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

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-base font-bold text-slate-900 mb-4">Availability</h3>
            <div class="space-y-4">
              <fieldset>
                <legend :class="labelClass">Preferred Days <span class="text-slate-400 font-normal">(select all that apply)</span></legend>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                  <label
                    v-for="day in days"
                    :key="day"
                    class="flex items-center gap-2 cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 hover:border-green-300 transition-colors"
                    :class="form.preferredDays.includes(day) ? 'border-green-500 bg-green-50' : ''"
                  >
                    <input type="checkbox" :value="day" v-model="form.preferredDays" class="accent-green-600">
                    <span class="text-sm text-slate-700">{{ day.slice(0, 3) }}</span>
                  </label>
                </div>
              </fieldset>
              <div>
                <label for="preferredTime" :class="labelClass">Preferred Time of Day</label>
                <select id="preferredTime" v-model="form.preferredTime" :class="inputClass">
                  <option value="">No preference</option>
                  <option value="Morning (Before 12pm)">Morning (Before 12pm)</option>
                  <option value="Afternoon (12pm – 4pm)">Afternoon (12pm – 4pm)</option>
                  <option value="Evening (After 4pm)">Evening (After 4pm)</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <label for="message" :class="labelClass">Additional Notes <span class="text-slate-400 font-normal">(optional)</span></label>
            <textarea
              id="message"
              v-model="form.message"
              maxlength="2000"
              rows="4"
              placeholder="Tell us about the player's goals, current level, or anything else we should know..."
              :class="inputClass"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="status === 'loading'"
            class="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            <span v-if="status === 'loading'">Sending Inquiry...</span>
            <span v-else>Submit Training Inquiry</span>
          </button>

          <p v-if="status === 'error'" role="alert" class="text-red-600 text-sm text-center bg-red-50 rounded-lg px-4 py-3">
            {{ errorMsg }}
          </p>

          <p class="text-slate-500 text-xs text-center">
            We review every inquiry and respond within 24 hours. No payment is collected until your session is confirmed.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
