<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="grid grid-cols-3 gap-8 px-4 w-full md:w-10/12"
    )
      AlbumsListItem(
        v-for="album in albums"
        :key="album.id"
        :album="album"
      )
</template>
<script>
export default {
  async asyncData({ $supabase, error }) {
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
      .order('published_at', { ascending: false })
    if (err) {
      error({ statusCode: 500, message: err, err })
    }
    return {
      albums,
    }
  },
}
</script>
