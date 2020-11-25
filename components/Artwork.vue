<template>
  <img
    v-if="artworkUrl"
    class="rounded shadow-lg inline-block object-cover"
    :class="classes"
    :src="artworkUrl"
    onerror="this.src = '/default-artist.png'"
  />
  <img
    v-else
    class="rounded shadow-lg inline-block object-cover"
    :class="classes"
    src="/default-artist.png"
  />
</template>
<script>
import artworkUrl from '@/utils/artworkUrl'

export default {
  props: {
    path: {
      type: [String, undefined],
      default: undefined,
    },
    size: {
      type: Number,
      default: 12,
    },
  },
  computed: {
    artworkUrl() {
      return artworkUrl(this.path)
    },
    classes() {
      const arr = ['min-w', 'min-h', 'w', 'h', 'max-w', 'max-h']
      return arr.map((key) => `${key}-${this.size}`)
    },
  },
}
</script>
