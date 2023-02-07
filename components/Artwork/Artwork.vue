<template lang="pug">
  nuxt-img(
    :src="safeSrc"
    class="rounded-xl md:rounded-2xl shadow-lg inline-block object-cover overflow-hidden"
    :width="size"
    :height="size"
    fit="cover"
    quality="75"
    :provider="provider"
    :modifiers="modifiers"
    loading="lazy"
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
  },
  computed: {
    safeSrc() {
      if (this.src) return this.src
      return '/default-artist.png'
    },
    modifiers() {
      return {
        fo: 'auto',
        c: 'maintain-ratio',
        dpr: 'auto',
        ar: '1:1',
      }
    },
  },
}
</script>
