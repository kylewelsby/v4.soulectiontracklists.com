<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    HomeLatest
    HomeRecords
    HomeShows
    HomeSupply
    HomeEvents
</template>

<script>
import { useFilteredShows } from '~/compositions'

export default {
  async asyncData({ $sentry, $supabase, $config, error }) {
    const {
      error: err,
      shows,
      tagsWithCounts,
      totalCount,
      count,
    } = await useFilteredShows({
      $supabase,
      $config,
    })
    if (err) {
      $sentry.captureException(err)
      error({ statusCode: 500, message: err })
    }
    return {
      latestShow: shows[0],
      shows,
      tagsWithCounts,
      count,
      totalCount,
    }
  },
  head() {
    return {
      title: '',
    }
  },
}
</script>
