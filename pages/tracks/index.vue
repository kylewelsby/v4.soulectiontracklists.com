<template>
  <div v-if="tracks">
    <TrackResults :tracks="tracks" :all-tracks="allTracks" :page-number="1" />
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  useStatic,
  useAsync,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(props, { root }) {
    const { $content, error } = useContext()
    const allTracks = useAsync(async () => {
      return await $content('artists', { deep: true })
        .where({
          path: { $contains: '/tracks/' },
        })
        .fetch()
    })
    const tracks = useStatic(
      async (pageNumber) => {
        const tracks = await $content('artists', { deep: true })
          .where({
            path: { $contains: '/tracks/' },
          })
          .sortBy('lastPlayedAt', 'desc')
          .skip(0)
          .limit(50)
          .fetch()
          .catch((_err) => {
            error({ statusCode: 404, message: 'Page not found' })
          })
        return tracks
      },
      1,
      'tracks-page'
    )
    return {
      tracks,
      allTracks,
    }
  },
  head: {
    title: 'All Tracks',
  },
})
</script>
