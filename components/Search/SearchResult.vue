<template lang="pug">
  nuxt-link(
    class="flex items-center mb-4"
    :to="to"
  )
    Artwork(
      :src="artwork"
      :size="80"
      class="md:rounded-xl min-w-20 max-w-20 min-h-20 max-h-20"
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
