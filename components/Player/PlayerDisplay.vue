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
        div(
          class="player-display__show-title truncate overflow-ellipsis overflow-hidden"
        ) {{ showTitle }}
        div(
          class="hidden lg:block"
        ) {{ chapterTitle }}
        div(
          class="marquee lg:hidden"
        )
          div(
            class="marquee__inner"
          )
            PlayerDisplayText(
              :artist="artistTitle"
              :title="trackTitle"
            )
            PlayerDisplayText(
              :artist="artistTitle"
              :title="trackTitle"
            )
            PlayerDisplayText(
              :artist="artistTitle"
              :title="trackTitle"
            )
            PlayerDisplayText(
              :artist="artistTitle"
              :title="trackTitle"
            )
    div(
      class="min-w-min lg:w-5/12 order-3 flex justify-end"
    )
      div(
        class="hidden lg:flex flex-grow marquee mr-4"
      )
        div(
          class="marquee__inner"
        )
          PlayerDisplayText(
            :artist="artistTitle"
            :title="trackTitle"
          )
          PlayerDisplayText(
            :artist="artistTitle"
            :title="trackTitle"
          )
          PlayerDisplayText(
            :artist="artistTitle"
            :title="trackTitle"
          )
          PlayerDisplayText(
            :artist="artistTitle"
            :title="trackTitle"
          )
      button(
        @click="showLinks()"
      ) 🔼
    PlayerWidget
</template>
<script>
import * as shvl from 'shvl'
export default {
  computed: {
    hasShow() {
      return this.$store.getters['player/hasShow']
    },
    showTitle() {
      return shvl.get(this.$store.state.player, 'show.title')
    },
    chapterTitle() {
      return shvl.get(this.$store.state.player, 'currentMarker.chapterTitle')
    },
    artistTitle() {
      return shvl.get(
        this.$store.state.player,
        'currentMarker.track.artist.title'
      )
    },
    trackTitle() {
      return shvl.get(this.$store.state.player.currentMarker, 'track.title')
    },
    artwork() {
      return (
        shvl.get(this.$store.state.player.currentMarker, 'track.artwork') ||
        shvl.get(this.$store.state.player.show, 'artwork')
      )
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
:root {
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
}
</style>
