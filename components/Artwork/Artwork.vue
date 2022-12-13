<template lang="pug">
  nuxt-picture(
    :src="safeSrc"
    class="rounded-xl md:rounded-2xl shadow-lg inline-block object-cover overflow-hidden"
    :width="size"
    :height="size"
    fit="cover"
    format="webp"
    :provider="provider"
    :modifiers="modifiers"
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
    provider: {
      type: String,
      default: 'imagekit',
    },
    modifiers: {
      type: Object,
      default: () => ({ focus: 'auto' }),
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
