<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    ShowsWithFilter(
      :title="$t(`filter.titles.${$route.params.type}`)"
      :shows="shows"
      :count="count"
      :total-count="totalCount"
      :tags-with-counts="tagsWithCounts"
      :path="`/episodes/t/${$route.params.type}/`"
    )
</template>
<script>
import { useFilteredShows } from '~/compositions'
export default {
  async asyncData({ $supabase, $config, params, error }) {
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
      title: this.$t(`filter.titles.${this.$route.params.type}`),
    }
  },
}
</script>
