<template lang="pug">
  div(
    id="site-search"
    class="flex flex-col items-center"
  )
    div(
      class="px-4 container mx-auto"
    )
      SearchResult(
        v-for="result in data"
        :key="result.id"
        :artwork="result.artwork"
        :to="linkTo(result)"
      ) {{ result.title }}
</template>
<script>
export default {
  async asyncData({ $sentry, query, $supabase, error }) {
    const { error: err, data } = await $supabase
      .rpc('site_search', { query: query.q })
      .select(`*`)

    if (err) {
      $sentry.captureException(err)
      error({ statusCode: 500 })
    }
    return {
      data,
    }
  },
  watch: {
    '$route.query'() {
      this.$nuxt.refresh()
    },
  },
  methods: {
    linkTo(result) {
      if (result.kind === 'shows') {
        return `/tracklists/${result.slug}`
      }
      return `/${result.kind}/${result.id}`
    },
  },
}
</script>
