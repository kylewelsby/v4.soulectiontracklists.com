<template>
  <div v-if="tracks">
    <TrackResults :tracks="tracks" :page-number="pageNumber" />
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  useStatic,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $content, params, error } = useContext()
    const pageNumber = ref(parseInt(params.value.page) || 1)
    const perPage = 50
    const tracks = useStatic(
      async (pageNumber) => {
        const skip = pageNumber * perPage
        return await $content('artists', { deep: true })
          .where({
            path: { $contains: '/tracks/' },
          })
          .sortBy('lastPlayedAt', 'desc')
          .skip(skip)
          .limit(50)
          .fetch()
          .catch((_err) => {
            error({ statusCode: 404, message: 'Page not found' })
          })
      },
      pageNumber,
      'tracks'
    )
    return {
      tracks,
      pageNumber,
    }
  },
})
</script>
