<template lang="pug">
  div(
    id="artist-search"
    class="flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
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
      ) {{ result.artist.title }} - {{ result.title }}
</template>

<script>
export default {
  async asyncData({ $sentry, $supabase, query, error }) {
    const searchResp = await $supabase
      .rpc('search_tracks', { query: query.q })
      .select('id')
    if (searchResp.error) {
      $sentry.captureException(searchResp.error)
      error({ statusCode: 500 })
      return
    }
    const trackIds = searchResp.data.map((r) => r.id)
    const resp = await $supabase
      .from('tracks')
      .select('id, title, artwork, artist(id, title)')
      .in('id', trackIds)
    if (resp.error) {
      $sentry.captureException(resp.error)
      error({ statusCode: 500 })
    }

    return {
      data: resp.data,
    }
  },
  watch: {
    '$route.query'() {
      this.$nuxt.refresh()
    },
  },
}
</script>
