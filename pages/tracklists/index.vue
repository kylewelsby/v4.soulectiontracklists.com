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
  async asyncData({ $axios, error }) {
    const page = 1;
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    try {
      const {data, headers} = await $axios.get(`https://v5-api-soulectiontracklists-com.fly.dev/shows?page=${page}`, config);

      return {
        latestShow: data[0],
        shows: data,
        tagsWithCounts: {},
        count: parseInt(headers['total-count']) || 999,
        totalCount: parseInt(headers['total-count']) || 999
      }
    } catch (err) {
      error({ statusCode: 500, message: err })
    }
  },
  head() {
    return {
      title: 'Tracklists',
    }
  },
}
</script>
