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

export default {
  async asyncData({ $staticData, params, error }) {
    try {
      const pageData = await $staticData(`data/shows/page-${params.page}.json`)
      return {
        latestShow: pageData.data[0],
        shows: pageData.data,
        tagsWithCounts: {},
        count: pageData.totalCount || 999,
        totalCount: pageData.totalCount || 999,
      }
    } catch (err) {
      error({ statusCode: 500, message: err.message || err })
    }
  },
  head() {
    return {
      title: `Tracklists | Page ${this.$router.currentRoute.params.page}`,
    }
  },
}
</script>
