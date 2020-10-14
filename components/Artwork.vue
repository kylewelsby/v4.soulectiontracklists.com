<template>
  <img
    class="rounded shadow-lg inline-block min-w-84 min-h-84 w-84 max-w-84 max-h-84 object-cover"
    :src="artworkUrl"
  />
</template>
<script>
// TODO handle broken image case
export default {
  props: {
    path: {
      type: [String, undefined],
      default: undefined,
    },
  },
  computed: {
    artworkUrl() {
      if (this.path) {
        return `https://firebase.soulectiontracklists.com/cdn/image/${this.path}`
      } else {
        return ''
      }
    },
  },
}
</script>
