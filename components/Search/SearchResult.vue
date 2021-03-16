<template lang="pug">
  nuxt-link(
    class="flex items-center mb-4"
    :to="to"
  )
    Artwork(
      :src="artwork"
      :size="56"
      class="min-w-12 max-w-12 min-h-12 max-h-12"
    )
    span(
      class="flex-grow ml-4"
    )
      slot

</template>
<script>
export default {
  props: {
    artwork: {
      type: String,
      default: undefined,
    },
    to: {
      type: [String, Object],
      default: '#',
    },
  },
}
</script>
