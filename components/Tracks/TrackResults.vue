<template>
  <div>
    <nuxt-link
      :to="{
        name: 'tracks-page___en',
        params: { page: pageNumber - 1 },
      }"
      class="rounded bg-blue-500 text-white py-2 px-4 mr-2"
    >
      Prev
    </nuxt-link>
    current: {{ pageNumber }}
    <nuxt-link
      :to="{
        name: 'tracks-page___en',
        params: { page: pageNumber + 1 },
      }"
      class="rounded bg-blue-500 text-white py-2 px-4"
    >
      Next
    </nuxt-link>
    <TrackRow
      v-for="(ref, i) of tracks"
      :key="i"
      :track-doc="ref"
      :artist-doc="null"
      :track-string="ref.title"
      :artist-string="ref.artist"
      hide-cue
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    tracks: {
      type: Array,
      default: () => [],
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
  },
  setup() {},
})
</script>
