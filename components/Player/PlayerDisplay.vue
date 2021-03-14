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
          class="hidden lg:block"
        ) {{ chapterTitle }}
        nuxt-link(
          class="flex-grow lg:hidden"
          :to="currentTrack.path"
        )
          marquee-text(
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
        class="flex flex-row flex-nowrap justify-end flex-grow min-w-0 lg:mr-4"
      )
        nuxt-link(
          class="hidden lg:flex justify-end flex-grow min-w-0"
          :to="trackPath"
          ref="displayTextWrapper"
        )
          marquee-text(
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
          :to="trackPath"
          class="ml-4"
        )
          svg(
            fill="currentColor"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
            fill-rule="evenodd"
          )
            path(
              d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
            )
            circle(
              fill="none"
              cx="12"
              cy="12"
              r="11.25"
              stroke-width="1.5"
            )
      nuxt-link(
        v-else
        class="mr-4"
        :to="showPath"
      ) View full tracklist
    PlayerWidget
</template>
<script>
import * as shvl from 'shvl'
export default {
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
        '/episodes/' + shvl.get(this.$store.state.player, 'show.slug') + '/'
      )
    },
    trackPath() {
      if (this.currentTrack) {
        return this.currentTrack.path
      } else {
        return ''
      }
    },
    chapterTitle() {
      return shvl.get(this.$store.getters['player/currentChapter'], 'title')
    },
    artistTitle() {
      return shvl.get(
        this.$store.getters['player/currentMarker'],
        'track.artist.title'
      )
    },
    trackTitle() {
      return shvl.get(
        this.$store.getters['player/currentMarker'],
        'track.title'
      )
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
      const totalLength = this.artistTitle.length + this.trackTitle.length
      return totalLength > 35
    },
  },
  methods: {
    showLinks() {
      window.alert('TODO')
    },
  },
}
</script>
<style>
/* :root {
  --marquee-width: 100vw;
  --offset: 10vw;
  --move-initial: calc(-25% + var(--offset));
  --move-final: calc(-50% + var(--offset));
}
.marquee {
  @apply overflow-hidden relative w-full max-w-full;
}

.marquee:after,
.marquee:before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  pointer-events: none;
  width: 20px;
}
.marquee:before {
  @apply bg-gradient-to-r from-gray-900 to-transparent;
  left: 0;
}
.marquee:after {
  @apply bg-gradient-to-l from-gray-900 to-transparent;
  right: 0px;
  margin-right: -1px;
}

.marquee__inner {
  @apply relative flex flex-row;
  width: fit-content;
  white-space: nowrap;
  transform: translate3d(var(--move-initial), 0, 0);
  animation: marquee 15s linear infinite;
  animation-play-state: running;
}

@keyframes marquee {
  0% {
    transform: translate3d(var(--move-initial), 0, 0);
  }
  100% {
    transform: translate3d(var(--move-final), 0, 0);
  }
} */
</style>
