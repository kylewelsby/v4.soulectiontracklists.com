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
    //- ShowsHero(
    //-   :latest-show="latestShow"
    //- )
    ShowsWithFilter(
      :shows="shows"
      :count="count"
      :total-count="totalCount"
      :tags-with-counts="tagsWithCounts"
    )
    HomeDecadeOfLegacy

</template>

<script>

export default {
  name: 'SoulectionTracklists',
  async asyncData({ $staticData, error }) {
    try {
      const pageData = await $staticData('data/shows/page-1.json')
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
      title: 'Tracklists',
    }
  },
}
</script>
