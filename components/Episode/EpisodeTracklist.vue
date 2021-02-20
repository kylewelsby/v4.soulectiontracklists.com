<template lang="pug">
  div(
    class="episode__tracklist bg-black text-white flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12"
    )
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
