<template lang="pug">
  div(
    class="episode__tracklist bg-black text-white flex flex-col items-center"
  )
    div(
      class="container mx-auto"
    )
      h2(
        class="text-4xl font-bold px-4 mt-20 mb-8"
      ) Tracklist
      Chapter(
        v-for="(chapter, index) in chapters"
        :key="chapter.id"
        :chapter="chapter"
      )
</template>
<script>
export default {
  props: {
    episode: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    chapters() {
      return this.episode.chapters.slice(0).sort((a, b) => {
        if (a.position > b.position) return 1
        if (a.position < b.position) return -1
        return 0
      })
    },
  },
}
</script>
