<template>
  <div class="flex flex-row flex-wrap items-center justify-center">
    <TrackLink
      v-for="platform of platforms"
      :key="platform"
      :provider="platform"
      target="_self"
      :href="`/tracks/on/${platform}`"
      class="transform scale-75"
    />
  </div>
</template>
<script>
const PLATFORMS = [
  "amazonMusic",
  "appleMusic",
  "audioMack",
  "bandcamp",
  "beatport",
  "bing",
  "discogs",
  "deezer",
  "duckduckgo",
  "google",
  "lastfm",
  "soundcloud",
  "spotify",
  "tidal",
  "traxsource",
  "youtube"
];

import TrackLink from "@/components/TrackLink";
export default {
  components: {
    TrackLink
  },
  data() {
    return {
      platforms: PLATFORMS
    };
  }
};
</script>
