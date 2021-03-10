<template lang="pug">
  nuxt-link(
    class="flex items-center mb-4"
    :to="result.path"
  )
    Artwork(
      :src="result.artwork"
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
    result: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
