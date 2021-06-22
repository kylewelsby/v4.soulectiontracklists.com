<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    h1(
      class="font-bold font-header uppercase text-4xl mt-8 my-4"
    ) Connect with Soulection
    div(
      class="grid grid-flow-col auto-cols-max"
    )
      TrackLink(
        class="mr-2 mb-2"
        v-for="link in $config.socials"
        :key="link.href"
        :platform="link.platform"
        :href="link.href"
        :hide-title="true"
        :icon-size="8"
      )
</template>
