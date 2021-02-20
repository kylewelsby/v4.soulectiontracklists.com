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
        v-for="marker in sortedMarkers"
        :marker="marker"
        :key="marker.id"
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
  computed: {
    sortedMarkers() {
      return this.chapter.markers.slice(0).sort((a, b) => {
        return a.position - b.position
      })
    },
  },
}
</script>
