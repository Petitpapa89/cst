<template>
  <div class="min-h-screen flex flex-col">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-slate-900 focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-blue-500"
    >
      Skip to main content
    </a>
    <SiteHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
