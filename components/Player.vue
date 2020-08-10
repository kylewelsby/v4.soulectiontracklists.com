<template>
  <div class="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div>
      <button @click="load()">Load</button>
      <button @click="play()">Play</button>
      <button @click="stop()">Stop</button>
      <button @click="pause()">Pause</button>
    </div>

    <input
      class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      :value="currentTime"
    />
    Player {{ currentTime }} {{ duration }}
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
export default {
  data() {
    return {
      player: null,
      currentTime: 0,
      duration: 0,
    }
  },
  methods: {
    load() {
      if (this.player) {
        this.player.stop()
        this.player = null
      }
      this.currentTime = 0
      this.player = new Howl({
        src:
          'https://api.soundcloud.com/tracks/856789768/stream?client_id=a281614d7f34dc30b665dfcaa3ed7505',
        // 'https://api-v2.soundcloud.com/media/soundcloud:tracks:862742644/d95011bf-4f15-45d2-828b-894980ca5535/stream/hls?client_id=a281614d7f34dc30b665dfcaa3ed7505',
        // 'https://cf-hls-media.sndcdn.com/playlist/knaymjb2rO04.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L2tuYXltamIyck8wNC4xMjgubXAzL3BsYXlsaXN0Lm0zdTgiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1OTY0NjQ5NDl9fX1dfQ__&Signature=UPzrP2aQM4xWIg4LAEuRXQQNYNtkAvJgxLkTD7vE3C9YLyZg45~nPbnXwZg63fVBxI9p-cjuehA0PLJgSbwpXl0~bkuCvZzH5XKZYo6DFYdTVw4UQkDHcH43oimXJdRXTVi5ApzW2INBbn14DqcobmoKIjKHB0k1QNkKY~RI4qvecaEOx6EFefl6TZi3SaEfjYJFAHF0IhPWETbDnAFG-ICoPQflXk2E0v~4ubqWlyfUjOQiYPzL-uN~-Ee5HgUM4G1feNdJrP1OaGXH5~DkK3FXYbQjEJwoRxPCP457HevGDtSDFgnU-tS6Zcd9HaOqyHjmNc3yvbFgezOtqYVbhA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
        html5: true,
        volume: 1.0,
        onplay: () => {
          this.duration = this.player.duration()
          requestAnimationFrame(() => {
            this.step()
          })
        },
        onstop: () => {
          this.duration = 0
          this.currentTime = 0
        },
      })
      this.play()
    },
    play() {
      if (this.player && !this.player.playing()) {
        this.player.play()
      }
    },
    step() {
      if (this.player && this.player.playing()) {
        this.currentTime = this.player.seek()
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
  },
}
</script>
