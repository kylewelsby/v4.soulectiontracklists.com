<template>
  <div v-if="tracks">
    <TrackResults
      :tracks="tracks"
      :all-tracks="allTracks"
      :page-number="pageNumber"
    />
  </div>
</template>
<script>
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'

import { useTracks } from '@/compositions/Tracks'

export default defineComponent({
  setup() {
    const { $content, params, error } = useContext()
    const { pageNumber, tracks, allTracks } = useTracks({
      $content,
      params,
      error,
    })
    const { meta } = useMeta()
    meta.value = [
      {
        rel: 'prev',
        href: `/tracks/${pageNumber.value - 1}`,
      },
      {
        rel: 'next',
        href: `/tracks/${pageNumber.value + 1}`,
      },
    ]
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
