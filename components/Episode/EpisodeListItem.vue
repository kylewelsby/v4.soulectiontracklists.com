<template lang="pug">
  nuxt-link(
    :to="`/episodes/${episode.slug}`"
    class="py-4 flex items-center"
  )
    Artwork(
      :src="episode.artwork"
      :size="128"
    )
    div(
      class="ml-4"
    )
      div {{ formattedDate }}
      h4(
        class="text-lg font-bold my-2"
      ) {{ episode.title }}
      span(
        v-html="excerpt"
      )
</template>

<script>
export default {
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
      }).format(Date.parse(this.episode.published_at))
    },
    excerpt() {
      return this.$md.render(this.episode.content.split('<!--more-->')[0])
    },
  },
}
</script>
