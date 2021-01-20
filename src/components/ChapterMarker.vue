<template>
  <div>
    <TrackRow
      :artist-doc="artist"
      :track-doc="marker.track"
      :artist-string="fallback.artist"
      :track-string="fallback.track"
      :hide-cue="true"
    />
  </div>
</template>
<script>
import TrackRow from "./TrackRow";
export default {
  components: {
    TrackRow
  },
  props: {
    marker: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    artist() {
      if (this.marker.track) {
        return this.marker.track.artist;
      }
    },
    fallback() {
      const [artistString, trackString] = this.marker.sourceTrackName.split(" - ");
      return {
        artist: artistString,
        track: trackString
      };
    }
  }
};
</script>
