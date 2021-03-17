<template lang="pug">
  div(
    id="artist-search"
    class="flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
    )
      SearchResult(
        v-for="result in data"
        :key="result.id"
        :artwork="result.artwork"
        :to="`/artists/${result.id}/`"
      ) {{ result.title }}
</template>

<script>
export default {
  async asyncData({ $sentry, $supabase, query, error }) {
    const { error: err, data } = await $supabase
      .from('artists')
      .select('id, title, slug, artwork')
      .ilike('slug', query.q)
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
}
</script>
