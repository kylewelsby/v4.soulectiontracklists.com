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
export default {
  async asyncData({ $staticData, $sentry, params, error }) {
    try {
      const tagData = await $staticData(`data/shows-by-tag/${params.type}.json`)
      const tagsJson = await $staticData('data/tags.json')
      return {
        shows: tagData.shows,
        tagsWithCounts: tagsJson.tagsWithCounts,
        totalCount: tagData.totalCount,
        count: tagData.count,
      }
    } catch (err) {
      $sentry.captureException(err)
      error({ statusCode: 500, message: err.message || err })
    }
  },
  head() {
    return {
      title: this.$tc(`filter.titles.${this.$route.params.type}`, null),
    }
  },
}
</script>
