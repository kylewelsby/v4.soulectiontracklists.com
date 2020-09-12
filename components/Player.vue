<template>
  <div
    v-if="isLoaded"
    class="fixed bottom-0 bg-gray-100 border-t border-gray-300 w-full left-0 right-0 flex flex flex-col items-center"
  >
    <div
      class="w-full flex items-center justify-center flex-row md:w-10/12 p-4"
    >
      <div class="w-8/12 flex flex-row">
        <div class="w-20">
          <button v-if="!isPlaying" @click="play()">Play</button>
          <button v-else-if="isPlaying" @click="pause()">Pause</button>
        </div>

        <div>
          {{ currentTime | secondsToTime }}
          <input
            class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
            type="range"
            min="0"
            :max="duration"
            step="0.1"
            :value="currentTime"
          />
          {{ duration | secondsToTime }}
        </div>
      </div>
      <div class="md:w-4/12 flex flex-row items-center justify-center">
        <a href="" class="md:w-2/12 relative rounded bg-default-image">
          <img
            :src="currentTrack.artwork || currentTrack.episodeArtwork"
            class="self-center rounded inline-block min-w-12 min-h-12 h-12 w-12 max-w-12 max-h-12 object-cover"
            @error="onErrorImageSwitch"
          />
        </a>
        <span class="md:w-8/12 flex flex-col flex-grow text-sm">
          <div class="text-xs truncate">{{ currentTrack.episodeTitle }}</div>
          <div class="font-medium truncate">{{ currentTrack.artist }}</div>
          <div class="font-light truncate">{{ currentTrack.title }}</div>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type='range']::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #fff;
    box-shadow: -405px 0 0 400px #605e5c;
    border-radius: 50%;
  }
}
</style>
<script>
import { Howl } from 'howler'
import secondsToTime from '~/utils/secondsToTime'

export default {
  filters: {
    secondsToTime,
  },
  data() {
    return {
      player: null,
      currentTime: 0,
      currentTrack: {
        artist: 'Soulection Radio',
        title: 'Hosted by Soulection',
      },
      duration: 0,
    }
  },
  computed: {
    isPlaying() {
      return this.player && this.player.playing()
    },
    isLoaded() {
      return !!this.player
    },
  },
  created() {
    this.unsibscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'player/setUrl') {
        this.load(mutation.payload)
      }
    })
    this.unsubscribeAction = this.$store.subscribeAction((action, state) => {
      if (action.type === 'player/seekTo') {
        if (this.player) {
          this.player.seek(action.payload.position)
        }
      }
    })
  },
  beforeDestroy() {
    this.unsibscribe()
    this.unsubscribeAction()
  },
  methods: {
    load(url) {
      if (this.player) {
        this.player.stop()
        this.player = null
      }
      this.currentTime = 0
      this.player = new Howl({
        src: url,
        html5: true,
        volume: 1.0,
        onplay: () => {
          this.duration = this.player.duration()
          requestAnimationFrame(() => {
            this.step()
          })
        },
        onseek: (val) => {
          requestAnimationFrame(() => {
            this.step()
          })
        },
        onstop: () => {
          this.duration = 0
          this.currentTime = 0
        },
      })
      this.player.play()
    },
    play() {
      if (this.player && !this.player.playing()) {
        this.player.play()
      }
    },
    step() {
      if (this.player) {
        if (this.player.playing()) {
          this.currentTime = this.player.seek()

          this.currentTrack =
            this.$store.state.player.tracklist.find((track, index) => {
              const nextTrack = this.$store.state.player.tracklist[index + 1]
              if (nextTrack) {
                return (
                  this.currentTime >= track.position &&
                  this.currentTime < nextTrack.position
                )
              } else {
                return this.currentTime >= track.position
              }
            }) || // << --- explain this in a minute
            Object.assign({}, this.$store.state.player.tracklist[0], {
              artwork: this.$store.state.player.tracklist[0].episodeArtwork,
              artist: 'Soulection Radio',
              title: 'Hosted by Soulection',
            })
        }
        requestAnimationFrame(() => {
          this.step()
        })
      }
    },
    stop() {
      if (this.player) {
        this.player.stop()
      }
    },
    pause() {
      if (this.player) {
        this.player.pause()
      }
    },
    onErrorImageSwitch(e) {
      e.target.src = this.currentTrack.episodeArtwork
    },
  },
}
</script>
