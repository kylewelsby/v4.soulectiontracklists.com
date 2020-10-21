<template>
  <nuxt-link :to="episode" class="flex flex-row items-center">
    <div class="w-32 mr-4">
      <Artwork :path="episode.artwork" />
    </div>
    <div class="text-gray-300">
      <div>{{ formattedDate }}</div>
      <h4 class="text-lg text-white font-semibold">{{ episode.title }}</h4>
    </div>
  </nuxt-link>
</template>

<script>
import Artwork from './Artwork'
export default {
  components: {
    Artwork,
  },
  props: {
    episode: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    formattedDate() {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
      }).format(Date.parse(this.episode.date))
    },
  },
}
</script>
