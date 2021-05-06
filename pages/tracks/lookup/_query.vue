<template lang="pug">
  div(
    id="track-search"
    class="flex flex-col items-center"
  )
    div(
      class="px-4 container mx-auto"
    )
      h1(
        class="text-xl"
      ) Search Results
      small(
        class="text-xm mb-4"
      ) {{ $tc('searchResults.count', data.length) }}
      SearchResult(
        v-for="result in data"
        :key="result.id"
        :artwork="result.artwork"
        :to="`/tracks/${result.id}/`"
      ) {{ result.full_name }}
</template>

<script>
export default {
  async asyncData({ $sentry, $supabase, query, error }) {
    const searchResp = await $supabase
      .rpc('search_tracks', { query: query.q })
      .select('*')
    if (searchResp.error) {
      $sentry.captureException(searchResp.error)
      error({ statusCode: 500 })
      return
    }

    return {
      data: searchResp.data,
    }
  },
  watch: {
    '$route.query'() {
      this.$nuxt.refresh()
    },
  },
}
</script>
