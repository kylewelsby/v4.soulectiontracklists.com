<template lang="pug">
  nuxt-link(
    class="track__list-item flex flex-row items-center justify-center p-4 text-lg transition-colors duration-1000 transition dark:hover:bg-gray-800"
    :to="trackPath"
  )
    div(
      class="h-20 w-20 mr-6 relative rounded bg-default-image"
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
      class="flex flex-col flex-grow min-w-0"
    )
      span(
        class="text-xs order-first cursor-pointer dark:text-white dark:text-opacity-50 text-black text-opaicty-50 font-light flex flex-row items-center"
        v-if="showTimestamp"
      )
        | {{ timestamp }}
        span(
          v-if="isNowPlaying"
          class="flex flex-row items-center"
        )
          svg(
            viewBox="0 0 4 5"
            class="w-1.5 h-1.5 fill-current mx-1.5"
          )
            circle(
              cx="2" cy="2.5" r="2"
            )
          | Now Playing
      span(
        class="font-light order-3"
        v-if="showArtist"
      )
        span(
          v-if="track && track.artist"
        ) {{ track.artist.title }}
        span(
          v-else
        ) {{ fallback.artist }}
      span(
        v-if="track"
        class="font-medium order-2 truncate"
      ) {{ track.title }}
      span(
        v-else
        class="font-medium order-2 truncate"
      ) {{ fallback.title }}
    //- TrackLinks(
    //-   v-if="track"
    //-   :links="track.track_links"
    //-   :to="`/tracks/${track.id}/`"
    //- )
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
    isNowPlaying: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    artwork() {
      if (this.track && this.track.artwork) {
        return this.track.artwork
      }
      if (this.fallback && this.fallback.artwork) {
        return this.fallback.artwork
      }
      return undefined
    },
    trackPath() {
      return this.track ? `/tracks/${this.track.id}/` : ''
    },
  },
}
</script>
