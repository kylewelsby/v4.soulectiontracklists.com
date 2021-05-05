<template lang="pug">
  div(
    class="player__display w-full lg:w-2/12 order-1 lg:order-2 flex flex-column justify-center"
  )
    button(
      class="text-gray-100 focus:outline-none focus:ring"
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
      class="player__controls__toggle-button rounded-full text-white mx-4 flex justify-center items-center focus:outline-none focus:ring"
    )
      svg(
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 57 57"
        class="fill-current w-12 h-12"
      )
        path(
          v-if="isPlaying"
          fill-rule="nonzero"
          data-is-playing
          d="M28.525.416c15.464 0 28 12.536 28 28s-12.536 28-28 28-28-12.536-28-28 12.536-28 28-28zm-7.175 15c-2.112 0-3.825 1.684-3.825 3.76v19.48c0 2.076 1.713 3.76 3.825 3.76 2.111 0 3.824-1.684 3.824-3.76v-19.48c0-2.076-1.713-3.76-3.824-3.76zm14.351 0c-2.111 0-3.823 1.684-3.824 3.76v19.48c0 2.076 1.712 3.76 3.824 3.76s3.824-1.684 3.824-3.76v-19.48c0-2.076-1.712-3.76-3.824-3.76z"
        )
        path(
          v-else
          fill-rule="nonzero"
          data-is-paused
          d="M28.525.416c15.464 0 28 12.536 28 28s-12.536 28-28 28-28-12.536-28-28 12.536-28 28-28zm-5.687 16.633a.875.875 0 00-1.313.758v21.218a.875.875 0 001.313.758l18.375-10.61a.875.875 0 000-1.515z"
        )

    button(
      class="text-gray-100 focus:outline-none focus:ring"
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
</template>

<script>
export default {
  computed: {
    isPlaying() {
      return this.$store.getters['player/isPlaying']
    },
  },
  methods: {
    skipBackward() {
      return this.$store.dispatch('player/skipBackward')
    },
    toggle() {
      return this.$store.dispatch('player/toggle')
    },
    skipForward() {
      return this.$store.dispatch('player/skipForward')
    },
  },
}
</script>
