<template lang="pug">
  nuxt-link(
    :to="`/episodes/${episode.slug}/`"
    :class="classes"
  )
    Artwork(
      :src="episode.artwork"
      :size="128"
      class="w-32 h-32 min-w-32 min-h-32"
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
      slot
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      default: () => {},
    },
    altLayout: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const classes = ['py-4', 'flex']
      if (this.altLayout) {
        classes.push('items-start')
      } else {
        classes.push('items-center')
      }
      return classes
    },
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
