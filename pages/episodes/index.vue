<template>
  <div class="bg-white flex flex-col items-stretch">
    <Tracklists :episodes="episodes" />
    <!-- <nuxt-content :document="page" /> -->
  </div>
</template>
<script>
import Tracklists from '@/components/Tracklists'

export default {
  components: {
    Tracklists,
  },
  // watchQuery: true,
  async asyncData({ $content, params, error }) {
    const page = await $content('episodes', '_index').fetch()
    const episodes = await $content('episodes', { deep: true })
      .where({ episode: { $gt: 0 } })
      .sortBy('date', 'desc')
      .fetch()
      .catch((_err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      page,
      episodes,
    }
  },
}
</script>
