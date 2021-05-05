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
      .ov('tags', [params.type])
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
