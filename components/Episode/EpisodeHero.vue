<template lang="pug">
  div(
    class="episode__hero flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
    )
      ArtworkHeader(
        :title="episode.title"
        :date="episode.published_at"
        :artwork-path="episode.artwork"
        :highlighted="highlighted"
      )

      div(
        v-html="$md.render(episode.content)"
      )
      | {{ summary }}
</template>

<script>
import { useLocationByISOCode, useSummary } from '@/compositions'

export default {
  props: {
    episode: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  computed: {
    location() {
      return useLocationByISOCode(this.episode.location || 'UN')
    },
    highlighted() {
      return `Live from ${this.location}`
    },
    summary() {
      return useSummary({ $i18n: this.$i18n }, this.episode.chapters)
    },
  },
}
</script>
