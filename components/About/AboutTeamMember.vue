<template lang="pug">
  div(
    class="flex flex-col"
  )
    Artwork(
      :src="member.artwork"
      :size="360"
      class="mx-auto filter-grayscale"
    )
    h3(
      class="text-2xl font-bold border-b dark:border-opacity-50 dark:border-white border-opacity-50 border-black py-4"
    ) {{ member.name }}
    div(
      class="py-2"
    )
      span(
        v-for="(title, index) in member.titles"
      )
        svg(
          v-if="index !== 0"
          viewBox="0 0 4 5"
          class="w-1.5 h-1.5 fill-current mx-1.5 inline opacity-50"
        )
          circle(
            cx="2" cy="2.5" r="2"
          )
        | {{ title }}
    div(
      class="py-2 flex flex-wrap"
    )
      TrackLink(
        class="mr-2 mb-2"
        v-for="link in member.socials"
        :key="link.href"
        :platform="link.platform"
        :href="link.href"
        :hide-title="true"
        :icon-size="8"
      )

</template>
<script>
export default {
  props: {
    member: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
