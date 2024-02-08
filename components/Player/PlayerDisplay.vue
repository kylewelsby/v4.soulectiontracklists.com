<template lang="pug">
  div(
    v-if="hasShow"
    class="player-display fixed bottom-0 bg-gray-900 text-gray-300 w-full left-0 right-0 flex flex-row items-center flex-wrap shadow-lg p-4 lg:p-0"
  )
    PlayerControls
    div(
      class="w-4/5 lg:w-5/12 order-2 lg:order-1 flex-grow flex flex-row items-center"
    )
      Artwork(
        :src="artwork"
        :size="64"
        style="border-radius: 0"
        class="shadow-none min-w-min"
      )
      div(
        class="w-3/4 ml-2 my-2 flex-grow flex flex-col"
      )
        nuxt-link(
          class="player-display__show-title truncate overflow-ellipsis overflow-hidden"
          :to="showPath"
        ) {{ showTitle }}
        div(
          class="hidden lg:block text-xs"
        ) {{ chapterTitle }}
        nuxt-link(
          class="flex-grow lg:hidden"
          :to="trackPath"
        )
          MarqueeText(
            :repeat="3"
            :key="`sm-${currentMarker.id}`"
            v-if="hasTimestamps"

          )
            PlayerDisplayText(
              :artist="artistTitle"
              :title="trackTitle"
            )
    div(
      class="lg:w-5/12 order-3 justify-end"
    )
      div(
        v-if="hasTimestamps"
        class="flex flex-row flex-nowrap justify-end flex-grow min-w-0 lg:mr-4 items-center"
      )
        nuxt-link(
          class="hidden lg:flex justify-end flex-grow min-w-0 mr-2"
          :to="trackPath"
          ref="displayTextWrapper"
        )
          MarqueeText(
            v-if="hasToScrollText"
            :repeat="3"
            :key="`lg-${currentMarker.id}`"
          )
            PlayerDisplayText(
              ref="displayText"
              :artist="artistTitle"
              :title="trackTitle"
            )
          PlayerDisplayText(
            ref="staticDisplayText"
            class="self-end justify-self-end"
            v-else
            :artist="artistTitle"
            :title="trackTitle"
          )
      nuxt-link(
        v-else
        class="mr-4 text-right block"
        :to="showPath"
      ) View full tracklist
    div.relative.pointer-events-none
      PlayerWidget
</template>
<script>
import * as shvl from 'shvl'
export default {
  components: {
    MarqueeText: () =>
      process.client
        ? import('vue-marquee-text-component')
        : Promise.resolve({ render: (h) => h('div') }),
  },
  computed: {
    hasShow() {
      return this.$store.getters['player/hasShow']
    },
    hasTimestamps() {
      return this.$store.getters['player/hasTimestamps']
    },
    showTitle() {
      return shvl.get(this.$store.state.player, 'show.title')
    },
    showPath() {
      return (
        '/tracklists/' + shvl.get(this.$store.state.player, 'show.slug') + '/'
      )
    },
    trackPath() {
      if (this.currentTrack && this.currentTrack.id) {
        return `/tracks/${this.currentTrack.id}/`
      } else {
        return ''
      }
    },
    chapterTitle() {
      return shvl.get(this.$store.getters['player/currentChapter'], 'title')
    },
    markerFallback() {
      const [artist, title] = shvl
        .get(this.$store.getters['player/currentMarker'], 'rawTrack')
        .split(' - ')
      return {
        artist,
        title,
      }
    },
    artistTitle() {
      const title = shvl.get(
        this.$store.getters['player/currentMarker'],
        'track.artist.title'
      )
      if (!title) {
        return this.markerFallback.artist
      }
      return title
    },
    trackTitle() {
      const title = shvl.get(
        this.$store.getters['player/currentMarker'],
        'track.title'
      )
      if (!title) {
        return this.markerFallback.title
      }
      return title
    },
    currentMarker() {
      return this.$store.getters['player/currentMarker']
    },
    currentTrack() {
      return this.currentMarker.track || {}
    },
    artwork() {
      return this.$store.getters['player/artwork']
    },
    hasToScrollText() {
      const totalLength =
        (this.artistTitle || '').length + (this.trackTitle || '').length
      return totalLength > 35
    },
  },
}
</script>
