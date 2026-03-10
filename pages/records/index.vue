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
  name: 'SoulectionRecords',
  async asyncData({ $staticData, error }) {
    try {
      const albums = await $staticData('data/records/index.json')
      return { albums }
    } catch (err) {
      error({ statusCode: 500, message: err.message || err })
    }
  },
  head() {
    return {
      title: 'Records',
    }
  },
}
</script>
