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
      const parts = this.marker.rawTrack.split(' - ')
      return {
        artist: parts[0],
        title: parts[1],
      }
    },
  },
}
</script>
