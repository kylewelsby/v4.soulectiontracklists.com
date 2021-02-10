<template>
  <g-link :to="episode.path" class="py-4 flex items-center">
    <Artwork :path="episode.artwork" :size="36" />
    <div class="ml-4">
      <div>{{ formattedDate }}</div>
      <h4 class="text-lg font-bold my-2">{{ episode.title }}</h4>
      <span v-html="excerpt"/>
    </div>
  </g-link>
</template>
<script>
import Artwork from "@/components/Artwork"
export default {
  components: {
    Artwork,
  },
  props: {
    episode: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formattedDate () {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
      }).format(Date.parse(this.episode.date))
    },
    excerpt () {
      return this.episode.content.split('<!--more-->')[0]
    }
  }
}
</script>