<template lang="pug">
  nuxt-link(
    to="/"
    class="flex flex-row items-center font-semibold"
  )
    NuxtImg(
      src="/soulection-icon.svg"
      format="svg"
      class="w-12 mr-2"
      provider="static"
    )
    span Soulection
    //- span Tracklists
</template>
