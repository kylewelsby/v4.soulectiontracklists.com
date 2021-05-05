<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    div(
      class="px-4 container mx-auto"
    )
      ShowsSubNav(
        :tags="$config.tagNames"
        :counts="tagsWithCounts"
      )
    div(
      class="mb-6"
    )
    ShowsWithFilter(
      :title="$t(`filter.titles.${$route.params.type}`)"
      :shows="shows"
      :count="count"
      :total-count="totalCount"
      :tags-with-counts="tagsWithCounts"
      :path="`/tracklists/t/${$route.params.type}/`"
    )
</template>
<script>
import { useFilteredShows } from '~/compositions'
export default {
  async asyncData({ $sentry, $supabase, $config, params, error }) {
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
      params.type,
      params.page
    )
    if (err) {
      $sentry.captureException(err)
      error({ statusCode: 500, message: err })
    }
    return {
      shows,
      tagsWithCounts,
      totalCount,
      count,
    }
  },
  head() {
    return {
      title: this.$tc(`filter.titles.${this.$route.params.type}`, null),
    }
  },
}
</script>
