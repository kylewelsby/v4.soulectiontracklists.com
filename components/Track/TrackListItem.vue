<template lang="pug">
  div(
    class="track__list-item flex flex-row items-center justify-center p-4 text-lg"
  )
    nuxt-link(
      class="h-12 w-12 mr-6 relative rounded bg-default-image"
      to="/"
    )
      Artwork(
        :src="artwork"
        :size="56"
      )
      span(
        class="absolute top-0 right-0 -mt-2 -mr-2 bg-white shadow rounded-full w-5 h-5 leading-none text-xs flex items-center justify-center p-2 text-gray-500"
      ) {{ trackNumber + 1 }}

    span(
      class="flex flex-col flex-grow"
    )
      nuxt-link(
        class="text-xs order-first cursor-pointer"
        to="/"
      ) {{ timestamp }}
      nuxt-link(
        v-if="track && track.artist"
        class="font-medium order-3"
        :to="track.artist.path"
      ) {{ track.artist.title }}
      span(
        v-else
        class="font-medium order-3"
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
      :links="track.links"
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
  },
}
</script>
