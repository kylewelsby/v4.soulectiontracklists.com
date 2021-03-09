<template lang="pug">
  nuxt-picture(
    :src="safeSrc"
    class="rounded shadow-lg inline-block object-cover overflow-hidden"
    :width="size"
    :height="size"
    fit="cover"
    format="webp"
  )
</template>
<script>
export default {
  props: {
    src: {
      type: [String, null, undefined],
      default: '/default-artist.png',
    },
    size: {
      type: Number,
      default: 12,
    },
  },
  computed: {
    safeSrc() {
      if (this.src) return this.src
      return '/default-artist.png'
    },
  },
}
</script>
