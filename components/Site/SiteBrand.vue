<template lang="pug">
  nuxt-link(
    to="/"
    class="lg:w-1/5 flex flex-row items-center font-semibold order-1"
  )
    NuxtImg(
      src="/soulection-icon.svg"
      format="svg"
      class="w-12 mr-2"
    )
    span.sr-only Soulection
    span Tracklists
</template>
