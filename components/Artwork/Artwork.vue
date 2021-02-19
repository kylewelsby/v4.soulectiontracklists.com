<template lang="pug">
  nuxt-picture(
    :src="src"
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
      type: [String, undefined],
      default: '/default-artist.png',
    },
    size: {
      type: Number,
      default: 12,
    },
  },
}
</script>
