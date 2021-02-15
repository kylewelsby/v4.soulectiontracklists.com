<template>
  <div>
    <Pagination
      name="tracks-page___en"
      :current="pageNumber"
      :total-count="allTracks.length"
    />
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
import Pagination from '../Pagination.vue'

export default defineComponent({
  components: { Pagination },
  props: {
    tracks: {
      type: Array,
      default: () => [],
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    allTracks: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
})
</script>
