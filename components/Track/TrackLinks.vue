<template lang="pug">
  div(
    class="hidden lg:block"
  )
    span(
      v-if="validLinkCount <= limit"
      class="flex flex-frow flex-wrap"
    )
      TrackLink(
        v-for="link in links"
        :key="link.id"
        :href="link.href"
        :platform="link.platform"
        hide-title
        class="ml-2"
      )
    nuxt-link(
      v-else
      :to="to"
      class="rounded-full bg-white text-black block py-1 px-4"
    ) {{ $tc("linkCount", validLinkCount) }}
</template>
<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
    to: {
      type: [String, Object],
      default: () => {},
    },
    limit: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    validLinkCount() {
      return this.links.length
    },
  },
}
</script>
