<template lang="pug">
  div(
    class="fixed bottom-0 bg-gray-100 border-t border-gray-300 w-full left-0 right-0 flex flex flex-col items-center"
  )
    div(
      class="w-full flex items-center justify-center flex-row md:w-10/12 p-4"
    )
      div(
        class="flex-grow"
      ) Episode artwork
      div(
        class="flex-shrink text-center"
      )
        | ⏮
        a(
          @click="fetchShow()"
        ) ⏯
        | ⏭
      div(
        class="flex-grow text-right"
      )
        div(
          v-if="currentTrack"
        )
          span {{ currentTrack.title }}
          span(
            class="mx-2"
          ) by
          span(
            class="underline"
          ) {{ currentTrack.artist }}
        div(
          v-else
        ) No track playing?
    div(
      class="overflow-hidden h-2 flex self- bg-gray-400 self-stretch"
    )
      div(
        class="bg-gray-500 flex"
        :style="{width: `${playheadPercentage}%`}"
      )
</template>

<script>
import { timeToSeconds } from '@/utils/timeToSeconds'

export default {
  data: () => {
    return {
      playhead: 0,
    }
  },
  computed: {
    markers() {
      return this.$store.state.player.markers
    },
    duration() {
      return this.$store.state.player.duration
    },
    playheadPercentage() {
      return (this.playhead / this.duration) * 100
    },
    currentTrack() {
      const marker = this.markers.find((marker, index) => {
        const nextTrack = this.markers[index + 1]
        if (nextTrack) {
          return (
            this.playhead >= timeToSeconds(marker.timestamp) &&
            this.playhead < timeToSeconds(nextTrack.timestamp)
          )
        } else {
          return this.playhead >= timeToSeconds(marker.timestamp)
        }
      })
      if (marker) {
        return {
          title: marker.track.title,
          artist: marker.track.artist.title,
        }
      } else {
        return null
      }
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.playhead++
    }, 250)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    fetchShow() {
      this.$store.dispatch('player/fetchShow', 458)
    },
  },
}
</script>
