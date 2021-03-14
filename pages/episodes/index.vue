<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    HomeHero(
      :latest-show="latestShow"
    )
    ShowsWithFilter(
      :shows="shows"
      :count="count"
      :total-count="totalCount"
      :tags-with-counts="tagsWithCounts"
    )
</template>

<script>
import { useFilteredShows } from '~/compositions'

export default {
  async asyncData({ $supabase, $config, error }) {
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
      title: 'Episodes',
    }
  },
}
</script>
