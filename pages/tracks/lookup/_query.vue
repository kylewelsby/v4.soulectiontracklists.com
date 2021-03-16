<template lang="pug">
  div(
    id="artist-search"
    class="flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
    )
      //- SearchResult(
      //-   v-for="result in data"
      //-   :key="result.id"
      //-   :artwork="result.artwork"
      //-   :to="`/tracks/${result.id}/`"
      //- ) {{ result.title }}
</template>

<script>
export default {
  async asyncData({ $supabase, query, error }) {
    const resp = await $supabase
      .rpc('search_tracks', { query: 'test' })
      .select('*')
    console.log(resp)
    // .from('artists')
    // .select(
    //   'id, title, slug, tracks(id, slug, title, artwork), lower(title) as ltitle'
    // )
    // .limit(10)
    // if (err) {
    //   error({ statusCode: 500 })
    // }
    // return {
    //   data,
    // }
  },
  watch: {
    '$route.query'() {
      this.$nuxt.refresh()
    },
  },
}
</script>
