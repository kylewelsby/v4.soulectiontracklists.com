<template lang="pug">
  div(
    class="flex flex-col items-center mt-10"
  )
    div(
      class="px-4 container mx-auto"
    )
      SiteSubNav(
        title="Records"
      )
        SiteSubNavLink(
          to="/records/"
        ) All Releases
        SiteSubNavLink(
          to="/records/t/black-label"
        ) Black Label
        SiteSubNavLink(
          to="/records/t/white-label"
        ) White Label
        SiteSubNavLink(
          to="/records/t/singles"
        ) Singles
        SiteSubNavLink(
          to="/records/t/compilations"
        ) Compilations
      div(
        class="mb-6"
      )
        p(
          class="my-8 font-light"
        ) Singles, albums, playlists, and compilations.
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
      .eq('state', 'published')
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
