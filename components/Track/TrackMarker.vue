<template lang="pug">
  TrackListItem(
    :track="marker.track"
    :fallback="fallback"
    :timestamp="marker.timestamp"
    :track-number="marker.position"
  )
</template>
<script>
export default {
  props: {
    marker: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    fallback() {
      if (!this.marker.rawTrack) {
        return undefined
      }
      const parts = this.marker.rawTrack.split(' - ')
      if (parts.length < 2) {
        return undefined
      }
      return {
        artist: parts[0],
        title: parts[1],
      }
    },
  },
}
</script>
