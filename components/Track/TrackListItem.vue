<template lang="pug">
  div(
    class="track__list-item flex flex-row items-center justify-center p-4 text-lg transition-colors duration-1000"
  )
    nuxt-link(
      class="h-20 w-20 mr-6 relative rounded bg-default-image"
      :to="trackPath"
    )
      Artwork(
        :src="artwork"
        :size="80"
        class="min-w-20 max-w-20 min-h-20 max-h-20"
      )
      span(
        v-if="showTrackNumber"
        class="absolute top-0 right-0 -mt-2 -mr-2 bg-white shadow rounded-full w-5 h-5 leading-none text-xs flex items-center justify-center p-2 text-gray-500"
      ) {{ trackNumber + 1 }}

    span(
      class="flex flex-col flex-grow"
    )
      nuxt-link(
        class="text-xs order-first cursor-pointer"
        to="/"
        v-if="showTimestamp"
      ) {{ timestamp }}
      span(
        class="font-medium order-3"
        v-if="showArtist"
      )
        nuxt-link(
          v-if="track && track.artist"
          :to="`/artists/${track.artist.slug}/`"
        ) {{ track.artist.title }}
        span(
          v-else
        ) {{ fallback.artist }}
      nuxt-link(
        v-if="track"
        class="font-light order-2"
        :to="track.path"
      ) {{ track.title }}
      span(
        v-else
        class="font-light order-2"
      ) {{ fallback.title }}
    TrackLinks(
      v-if="track"
      :links="track.track_links"
      :to="track.path"
    )
</template>
<script>
export default {
  props: {
    track: {
      type: Object,
      default: () => {},
    },
    timestamp: {
      type: String,
      default: '',
    },
    fallback: {
      type: Object,
      default: () => {
        return {
          artist: 'Unknown artist',
          title: 'Untitled',
        }
      },
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
    trackNumber: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    artwork() {
      if (this.track && this.track.artwork) {
        return this.track.artwork
      }
      return undefined
    },
    trackPath() {
      return this.track ? this.track.path : ''
    },
  },
}
</script>
