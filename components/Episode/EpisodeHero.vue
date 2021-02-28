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
        | {{ summary }}
        template(
          #content
        )
          button(
            @click="playShow()"
            class="bg-black rounded-full text-white px-6 py-2 font-medium text-l flex flex-row self-center"
          )
            svg(
              class="w-6 mr-2 fill-current"
              viewBox="0 0 24 25"
            )
              path(
                fill-rule="evenodd"
                d="M22.5 12.5C22.5 18.299 17.799 23 12 23 6.20101 23 1.5 18.299 1.5 12.5 1.5 6.70101 6.20101 2 12 2c5.799 0 10.5 4.70101 10.5 10.5zm1.5 0c0 6.6274-5.3726 12-12 12-6.62742 0-12-5.3726-12-12C0 5.87258 5.37258.5 12 .5c6.6274 0 12 5.37258 12 12zm-9 0l-4.5 2.5981V9.90192L15 12.5zm2.25.433l-.75.433-6 3.4641-.75.433c-.33333.1925-.75-.0481-.75-.433V8.16987c0-.3849.41667-.62546.75-.43301l.75.43301 6 3.46413.75.433c.3333.1924.3333.6736 0 .866z"
                clip-rule="evenodd"
              )
            | Play Show

      div(
        v-html="$md.render(episode.content)"
      )
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
  methods: {
    playShow() {
      this.$store.dispatch('player/fetchShow', this.episode.id)
    },
  },
}
</script>
