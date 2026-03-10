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
  async asyncData({ $staticData, error, params }) {
    try {
      const albums = await $staticData(`data/records/by-type/${params.type}.json`)
      return { albums }
    } catch (err) {
      error({ statusCode: 500, message: err.message || err })
    }
  },
  head() {
    return {
      title: this.$t(`filter.titles.${this.$route.params.type}`),
    }
  },
}
</script>
