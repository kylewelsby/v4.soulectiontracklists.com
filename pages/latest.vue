<template lang="pug">
  div(
    class="mx-auto max-w-lg flex flex flex-col justify-center"
  )
    a(
      :href="`/tracklists/${latestShow.slug}/`"
      target="_parent"
      class="w-100"
    )
      Artwork(
        :src="latestShow.artwork"
        :size="512"
      )
    div(
      class="my-4"
    )
      p(
        class="py-2"
      ) {{ excerpt }}
      p(
        class="py-2"
      )
        | Playing
        |
        strong {{ summary }}
    div(
      class="grid grid-cols-2 gap-4"
    )
      a(
        :href="latestShow.links.appleMusic"
        target="_parent"
        class="bg-gray-800 text-white text-xs text-center uppercase p-3 px-6 font-bold tracking-wider"
      ) Listen on Apple Music 1
      a(
        :href="latestShow.links.soundcloud"
        target="_parent"
        class="bg-gray-800 text-white text-xs text-center uppercase p-3 px-6 font-bold tracking-wider"
      ) Listen on SoundCloud

    div(
      class="my-4 flex flex-row justify-center"
    )
      a(
        :href="`/tracklists/${latestShow.slug}/`"
        target="_parent"
        class="bg-gray-800 text-white text-xs text-center uppercase p-3 px-6 font-bold tracking-wider"
      ) View Tracklist

</template>
<script>
import { useSummary } from '~/compositions'

export default {
  name: 'SouelctionLatest',
  layout: 'empty',
  async asyncData({ $staticData, $sentry, error }) {
    try {
      const pageData = await $staticData('data/shows/page-1.json')
      const latestShowSummary = pageData.data[0]
      // Fetch full show data with chapters and links
      const latestShow = await $staticData(`data/shows/${latestShowSummary.slug}.json`)
      return { latestShow }
    } catch (err) {
      $sentry.captureException(err)
      error({ statusCode: 500, message: err.message || err })
    }
  },
  computed: {
    excerpt() {
      const html = this.$md
        .renderInline(this.latestShow.content.split('<!--more-->')[0].trim())
        .replace(/<a /g, '<span ')
        .replace(/<\/a>/g, '</span>')
      return html
    },
    summary() {
      return useSummary({ $i18n: this.$i18n }, this.latestShow.chapters)
    },
  },
}
</script>
