<template lang="pug">
  TrackListItem(
    :track="marker.track"
    :fallback="fallback"
    :timestamp="marker.timestamp"
    :track-number="marker.position"
    :show-timestamp="showTimestamp"
    :show-artist="showArtist"
    :show-track-number="showTrackNumber"
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
    showTimestamp: {
      type: Boolean,
      default: true,
    },
    showArtist: {
      type: Boolean,
      default: true,
    },
    showTrackNumber: {
      type: Boolean,
      default: true,
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
