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
        v-for="(chapter, index) in episode.chapters"
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
}
</script>
