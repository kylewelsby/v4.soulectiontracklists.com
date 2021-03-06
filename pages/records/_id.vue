<template lang="pug">
  div(
    class="my-20 container mx-auto flex flex-col items-center"
  )
    AlbumsHeader(
      :album="data"
    )
    div(
      class="my-20"
    )
      div(
        class="prose dark:prose-dark prose"
        v-html="content"
      )
    div(
      class="flex flex-col items-center py-10"
      v-if="sortedLinks.length > 0"
    )
      h3(
        class="text-2xl font-bold mb-4"
      ) Listen on
      div(
        class="flex flex-row justify-center flex-wrap w-10/12"
      )
        TrackLink(
          v-for="(link, index) in sortedLinks"
          :key="index"
          :platform="link.platform"
          :href="link.href"
          class="m-4"
          :iconSize="6"
        )
</template>
<script>
export default {
  async asyncData({ $supabase, params, error }) {
    const { data, error: err } = await $supabase
      .from('albums')
      .select('*,artist(id,title)')
      .eq('id', params.id)
      .single()
    if (err) {
      if (err.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
        return
      } else {
        error({ statusCode: 500, err })
      }
    }
    return {
      data,
    }
  },
  data() {
    return {
      platforms: [
        'amazonMusic',
        'spotify',
        'bandcamp',
        'discogs',
        'tidal',
        'deezer',
      ],
    }
  },
  head() {
    return {
      title: this.fullTitle,
    }
  },
  computed: {
    sortedLinks() {
      if (!this.data.links) return []
      return this.data.links.slice(0).sort((a, b) => {
        if (a.platform > b.platform) return 1
        if (a.platform < b.platform) return -1
        return 0
      })
    },
    rawContent() {
      return this.data.content || ''
    },
    rawExcerpt() {
      return this.rawContent.split('<!--more-->')[0] || ''
    },
    excerpt() {
      const html = this.$md
        .renderInline(this.rawExcerpt.trim())
        .replace(/<a /g, '<span ')
        .replace(/<\/a>/g, '</span>')
      return html
    },
    fullTitle() {
      return `${this.data.title} by ${this.data.artist.title}`
    },
    content() {
      const html = this.$md
        .renderInline(this.rawContent.trim())
        .replace(/<a /g, '<a rel="noopener"')
        .replace(/<\/a>/g, '</a>')
      return html
    },
  },
}
</script>

<style scoped>
.content__body a {
  @apply underline;
}
</style>
