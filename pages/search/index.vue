<template lang="pug">
  div(
    id="site-search"
    class="flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
    )
      SearchResult(
        v-for="result in data"
        :key="result.id"
        :artwork="result.artwork"
        :result="result"
      ) {{ result.artist.title }} - {{ result.title }}
</template>
<script>
export default {
  async asyncData({ query, $supabase, error }) {
    const { error: err, data } = await $supabase
      .from('tracks')
      .select(`id, title, artwork, path, artist(*)`)
      .ilike('title', `%${query.q}%`)
      .limit(10)

    if (err) {
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
