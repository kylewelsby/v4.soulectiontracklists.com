<template lang="pug">
  nuxt-link(
    :to="`/episodes/${episode.slug}/`"
    class="py-4 flex items-center"
  )
    Artwork(
      :src="episode.artwork"
      :size="128"
      class="w-32 h-32"
    )
    div(
      class="ml-4"
    )
      div {{ formattedDate }}
      h4(
        class="text-lg font-bold my-2"
      ) {{ episode.title }}
      div(
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
      if (this.episode.published_at) {
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
        }).format(Date.parse(this.episode.published_at))
      } else {
        return 'INVALID DATE'
      }
    },
    excerpt() {
      const html = this.$md
        .renderInline(this.episode.content.split('<!--more-->')[0].trim())
        .replace(/<a /g, '<span ')
        .replace(/<\/a>/g, '</span>')
      return html
    },
  },
}
</script>
