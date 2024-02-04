<template lang="pug">
  div(
    class="flex flex-col items-center mt-10"
  )
    div(
      class="px-4 container mx-auto"
    )
      AlbumsSubNav
      div(
        class="mb-6"
      )
      div(
        class="grid grid-cols-1 md:grid-cols-3 gap-20"
      )
        AlbumsListItem(
          v-for="album in albums"
          :key="album.id"
          :album="album"
        )
</template>
<script>
export default {
  async asyncData({ $supabase, error, params }) {
    const { data: albums, error: err } = await $supabase
      .from('albums')
      .select(
        `id,
        title,
        artwork,
        published_at,
        artist(
          id,
          title
        )`
      )
      .overlaps('tags', [params.type])
      .order('published_at', { ascending: false })
    if (err) {
      error({ statusCode: 500, message: err, err })
    }
    return {
      albums,
    }
  },
  head() {
    return {
      title: this.$t(`filter.titles.${this.$route.params.type}`),
    }
  },
}
</script>
