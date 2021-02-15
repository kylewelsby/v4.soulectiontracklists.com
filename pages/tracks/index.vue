<template>
  <div v-if="tracks">
    <TrackResults :tracks="tracks" :all-tracks="allTracks" :page-number="1" />
  </div>
</template>
<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

import { useTracks } from '@/compositions/Tracks'

export default defineComponent({
  setup() {
    const { params, $content, error } = useContext()
    const { allTracks, tracks, pageNumber } = useTracks({
      $content,
      error,
      params,
    })
    return {
      tracks,
      allTracks,
      pageNumber,
    }
  },
  head: {
    title: 'All Tracks',
  },
})
</script>
