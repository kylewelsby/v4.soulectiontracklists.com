<template lang="pug">
  nuxt-link(
    :to="`/episodes/${episode.slug}/`"
    :class="classes"
  )
    Artwork(
      :src="episode.artwork"
      :size="128"
      class="min-w-24 min-h-24 w-24 h-24 max-w-32 max-h-32 md:min-w-32 md:min-h-32 md:w-32 md:h-32"
    )
    div(
      class="ml-4 flex-grow min-w-0"
    )
      div {{ formattedDate }}
      h4(
        class="text-lg font-bold my-2"
      ) {{ episode.title }}
      div(
        class="text-gray-300 truncate"
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
      const classes = ['py-4', 'flex', 'flex-row']
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
