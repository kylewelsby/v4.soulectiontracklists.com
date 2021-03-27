<template lang="pug">
  div(
    class="mb-10"
  )
    div(
      class="flex flex-col items-center"
    )
      div(
        class="my-10"
      )
        AlbumsHeader(
          :album="data"
        )
    div(
      class="w-8/12 mx-auto content__body text-sm tracking-wide pb-10"
      v-html="content"
    )
    div(
      class="bg-black text-white flex flex-col items-center py-10"
      v-if="sortedLinks.length > 0"
    )
      h3(
        class="text-2xl font-bold"
      ) Listen On
      div(
        class="flex flex-row justify-center flex-wrap w-10/12"
      )
        TrackLink(
          v-for="(link, index) in sortedLinks"
          :key="index"
          :platform="link.platform"
          :href="link.href"
          class="bg-gray-800 rounded-full p-2 pr-4 m-2"
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
