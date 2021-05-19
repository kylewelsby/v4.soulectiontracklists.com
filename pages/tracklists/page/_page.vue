<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    div(
      class="px-4 container mx-auto mt-10 mb-6"
    )
      ShowsSubNav(
        :tags="$config.tagNames"
        :counts="tagsWithCounts"
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
  async asyncData({ $sentry, $supabase, params, $config, error }) {
    const {
      error: err,
      shows,
      tagsWithCounts,
      totalCount,
      count,
    } = await useFilteredShows(
      {
        $supabase,
        $config,
      },
      null,
      params.page
    )
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
      title: `Tracklists | Page ${this.$router.currentRoute.params.page}`,
    }
  },
}
</script>
