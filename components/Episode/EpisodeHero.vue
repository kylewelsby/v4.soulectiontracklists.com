<template lang="pug">
  div(
    class="episode__hero flex flex-col items-center bg-gradient-to-b to-black from-transparent"
  )
    div(
      class="container mx-auto p-4 py-8"
    )
      ArtworkHeader(
        :title="episode.title"
        :date="episode.published_at"
        :artwork-path="episode.artwork"
        :highlighted="highlighted"
      )
        template(#highlighted) {{ highlighted }}
        div(
          class="flex flex-row items-center"
        )
          | {{ summary }}
          vue-custom-tooltip(
            label="Tracklist missing timestamp data"
            class="ml-4"
            v-if="!hasTimestamps"
          )
            svg(
              viewBox="0 0 416.979 416.979"
              class="w-3 fill-current"
            )
              path(
                d="M356.004 61.156c-81.37-81.47-213.377-81.551-294.848-.182-81.47 81.371-81.552 213.379-.181 294.85 81.369 81.47 213.378 81.551 294.849.181 81.469-81.369 81.551-213.379.18-294.849zM237.6 340.786a5.821 5.821 0 01-5.822 5.822h-46.576a5.821 5.821 0 01-5.822-5.822V167.885a5.821 5.821 0 015.822-5.822h46.576a5.82 5.82 0 015.822 5.822v172.901zm-29.11-202.885c-18.618 0-33.766-15.146-33.766-33.765 0-18.617 15.147-33.766 33.766-33.766s33.766 15.148 33.766 33.766c0 18.619-15.149 33.765-33.766 33.765z"
              )
        template(
          #content
        )
          SiteButton(
            v-if="canPlayShow"
            @click="playShow()"
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
          SiteListenButtons(
            class="mt-8"
            :links="episode.links || {}"
          )
      div(
        class="prose dark:prose-dark prose-sm max-w-none text-white"
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
  data() {
    return {
      popper: null,
    }
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
    hasTracklist() {
      return (
        this.episode.chapters.length && this.episode.chapters[0].markers.length
      )
    },
    hasTimestamps() {
      if (this.hasTracklist) {
        return !!this.episode.chapters[0].markers[0].timestamp
      } else {
        return false
      }
    },
    canPlayShow() {
      return (
        this.episode &&
        this.episode.links &&
        this.episode.links.soundcloud &&
        !this.episode.links.soundcloud.includes('/sets/')
      )
    },
  },
  methods: {
    playShow() {
      this.$store.dispatch('player/fetchShow', this.episode.id)
    },
  },
}
</script>
