import { ref, useStatic } from '@nuxtjs/composition-api'

const PER_PAGE = 50

export function useTracks({ params, $content, error }) {
  const pageNumber = ref(parseInt(params.value.page) || 1)
  const allTracks = useStatic(
    async () => {
      return await $content('artists', { deep: true })
        .where({
          path: { $contains: '/tracks/' },
        })
        .fetch()
    },
    ref(''),
    'all-tracks'
  )
  const tracks = useStatic(
    async (pageNumber) => {
      const skip = (pageNumber - 1) * PER_PAGE
      return await $content('artists', { deep: true })
        .where({
          path: { $contains: '/tracks/' },
        })
        .sortBy('lastPlayedAt', 'desc')
        .skip(skip)
        .limit(PER_PAGE)
        .fetch()
        .catch((err) => {
          error({
            statusCode: 404,
            message: `Page not found\n${err.message}`,
          })
        })
    },
    pageNumber,
    'tracks'
  )
  return {
    allTracks,
    tracks,
    pageNumber,
  }
}
