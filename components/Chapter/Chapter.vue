<template lang="pug">
  div(
    :id="chapter.slug"
    class="chapter"
  )
    ChapterHero(
      :chapter="chapter"
    )
    div
      TrackMarker(
        v-for="marker in chapter.markers"
        :marker="marker"
      )
</template>
<script>
export default {
  props: {
    chapter: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>
