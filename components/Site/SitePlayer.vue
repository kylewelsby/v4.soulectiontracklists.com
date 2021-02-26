<template lang="pug">
  div(
    class="fixed bottom-0 bg-gray-900 text-gray-300 w-full left-0 right-0 flex flex flex-col items-center shadow-lg"
  )
    div(
      class="w-full flex items-center justify-center flex-row"
    )
      div(
        class="w-5/12 flex-grow flex flex-row items-center"
      )
        Artwork(
          :src="show.artwork"
          :size="64"
          style="border-radius: 0"
          class="shadow-none mr-2"
        )
        | {{ show.title }}
      div(
        class="w-2/12 flex-shrink text-center flex flex-row justify-center items-center"
      )
        button(
          class="text-gray-100 focus:outline-none focus:ring ring-offset-2 focus:border-white"
          @click="skipBackward()"
        )
          svg(
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 348.491 348.491"
            class="fill-current w-6 h-6"
          )
            path(
              d="M334.241 28.174c-8.757-4.617-19.361-4-27.54 1.586L125.586 153.723c-6.479 4.434-10.365 11.773-10.395 19.639-.023 7.848 3.825 15.219 10.28 19.697l181.098 125.566c8.165 5.662 18.799 6.322 27.602 1.707 8.803-4.602 14.32-13.711 14.32-23.654V51.797c0-9.895-5.487-18.988-14.25-23.623zM31.518 14.524C14.112 14.524 0 28.637 0 46.043v256.406c0 17.406 14.112 31.518 31.518 31.518s31.518-14.111 31.518-31.518V46.043c0-17.406-14.112-31.519-31.518-31.519z"
            )

        button(
          @click="toggle()"
          class="rounded-full bg-gray-100 text-gray-900 p-3 mx-4 flex justify-center items-center focus:outline-none focus:ring ring-offset-2 focus:border-white"
        )
          svg(
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.604 47.604"
            class="fill-current w-6 h-6"
          )
            path(
              v-if="playerState === 'playing'"
              d="M17.991 40.976c0 3.662-2.969 6.631-6.631 6.631-3.662 0-6.631-2.969-6.631-6.631V6.631C4.729 2.969 7.698 0 11.36 0c3.662 0 6.631 2.969 6.631 6.631v34.345zM42.877 40.976c0 3.662-2.969 6.631-6.631 6.631-3.662 0-6.631-2.969-6.631-6.631V6.631C29.616 2.969 32.585 0 36.246 0c3.662 0 6.631 2.969 6.631 6.631v34.345z"
            )
            path(
              v-else
              d="M43.331 21.237L7.233.397c-.917-.529-2.044-.529-2.96 0-.916.528-1.48 1.505-1.48 2.563v41.684c0 1.058.564 2.035 1.48 2.563.458.268.969.397 1.48.397s1.022-.133 1.48-.397l36.098-20.84c.918-.529 1.479-1.506 1.479-2.564s-.563-2.036-1.479-2.566z"
            )

        button(
          class="text-gray-100 focus:outline-none focus:ring ring-offset-2 focus:border-white"
          @click="skipForward()"
        )
          svg(
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 337.002 337.002"
            class="fill-current w-6 h-6"
          )
            path(
              d="M222.902 147.886L41.783 23.923c-8.174-5.588-18.775-6.201-27.533-1.586C5.478 26.971 0 36.065 0 45.962v244.879c0 9.941 5.508 19.053 14.328 23.654 8.802 4.617 19.42 3.955 27.594-1.709l181.104-125.564c6.45-4.479 10.297-11.85 10.266-19.699-.017-7.863-3.909-15.204-10.39-19.637zM305.484 9.502c-17.406 0-31.518 14.112-31.518 31.519v254.96c0 17.407 14.111 31.519 31.518 31.519s31.518-14.111 31.518-31.519V41.021c0-17.406-14.11-31.519-31.518-31.519z"
            )
      div(
        class="w-5/12 flex-grow text-right mr-4"
      )
        div(
          v-if="currentTrack"
        )
          span(
            class="text-white font-bold"
          ) {{ currentTrack.title }}
          span(
            class="mx-2"
          ) by
          span(
            class="underline text-white font-bold"
          ) {{ currentTrack.artist }}
        div(
          v-else
        ) {{ chapterTitle }}
    div(
      class="overflow-hidden h-2 flex bg-gray-700 self-stretch"
    )
      div(
        class="bg-gray-100 rounded-r"
        :style="{width: `${playheadPercentage}%`}"
      )
    div(
      class="absolute top-full transform scale-0"
    )
      iframe(
        ref="soundcloudWidget"
        scrolling="no"
        style="border: 0;"
        allow="autoplay"
        title="SoundCloud Player"
        width="100"
        height="100"
        :src="soundcloudIframeSrc"
      )
</template>

<script>
import { timeToSeconds } from '@/utils/timeToSeconds'

export default {
  data: () => {
    return {
      playhead: 0,
      showNative: true,
      current: undefined,
      soundcloudReady: false,
      playheadPercentage: 0,
      playerState: 'stopped',
    }
  },
  computed: {
    markers() {
      return this.$store.state.player.markers
    },
    show() {
      return this.$store.state.player.show
    },
    chapterTitle() {
      if (this.markers.length) {
        if (this.currentTrack) {
          return this.currentTrack.chapterTitle
        } else {
          return this.markers[0].chapterTitle
        }
      } else {
        return 'Unknown Chapter'
      }
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
          index: this.markers.indexOf(marker),
          title: marker.track.title,
          artist: marker.track.artist.title,
          chapterTitle: marker.chapterTitle,
        }
      } else {
        return null
      }
    },
    isLoaded() {
      return !!this.$store.state.player.soundcloud
    },
    soundcloudIframeSrc() {
      const soundcloudUrl = this.$store.state.player.soundcloud
      if (soundcloudUrl === null) {
        return 'about:blank'
      }
      const url = new URL('https://w.soundcloud.com/player/')
      url.searchParams.append('url', this.$store.state.player.soundcloud)
      url.searchParams.append('auto_play', true)
      url.searchParams.append('buying', false)
      url.searchParams.append('download', false)
      url.searchParams.append('hide_related', true)
      url.searchParams.append('sharing', false)
      url.searchParams.append('show_artwork', false)
      url.searchParams.append('show_comments', false)
      url.searchParams.append('show_playcount', false)
      url.searchParams.append('show_reposts', false)
      url.searchParams.append('show_teaser', false)
      url.searchParams.append('show_user', true)
      return url.href
    },
  },
  mounted() {
    window.addEventListener('message', this.onMessage)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onMessage)
  },
  methods: {
    onMessage(event) {
      if (event.origin.endsWith('w.soundcloud.com')) {
        const data = JSON.parse(event.data)
        if (data.method === 'ready') {
          this.soundcloudReady = true
          this.sendMessage('play')
          this.sendMessage('addEventListener', 'playProgress')
          this.sendMessage('addEventListener', 'play')
          this.sendMessage('addEventListener', 'pause')
        } else if (data.method === 'playProgress') {
          this.onPlayProgress(data.value)
        } else if (data.method === 'play') {
          this.playerState = 'playing'
        } else if (data.method === 'pause') {
          this.playerState = 'paused'
        } else {
          // console.info('SC', data)
        }
      }
    },
    onPlayProgress(value) {
      this.playhead = value.currentPosition / 1000
      this.playheadPercentage = value.relativePosition * 100
    },
    async fetchShow() {
      await this.$store.dispatch('player/fetchShow', 458)
    },
    toggle() {
      if (!this.soundcloudReady) {
        this.fetchShow()
      } else {
        this.sendMessage('toggle')
      }
    },
    skipForward() {
      const firstTrack = this.markers[0]
      let nextTrack
      if (this.playhead <= timeToSeconds(firstTrack.timestamp)) {
        nextTrack = this.markers[0]
      } else {
        nextTrack = this.markers[this.currentTrack.index + 1]
      }

      if (nextTrack) {
        this.sendMessage('seekTo', timeToSeconds(nextTrack.timestamp) * 1000)
      }
    },
    skipBackward() {
      if (this.currentTrack) {
        const previousTrack = this.markers[this.currentTrack.index - 1]
        if (previousTrack) {
          this.sendMessage(
            'seekTo',
            timeToSeconds(previousTrack.timestamp) * 1000
          )
        }
      }
    },
    sendMessage(method, value) {
      this.$refs.soundcloudWidget.contentWindow.postMessage(
        JSON.stringify({ method, value }),
        'https://w.soundcloud.com'
      )
    },
  },
}
</script>
