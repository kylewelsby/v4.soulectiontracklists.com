<template lang="pug">
  div(
    class="mx-auto max-w-lg flex flex flex-col justify-center"
  )
    a(
      :href="`https://soulectiontracklists.com/episodes/${latestShow.slug}/`"
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
        :href="`https://soulectiontracklists.com/episodes/${latestShow.slug}/`"
        target="_parent"
        class="bg-gray-800 text-white text-xs text-center uppercase p-3 px-6 font-bold tracking-wider"
      ) View Tracklist

</template>
<script>
import { useFilteredShows, useSummary } from '~/compositions'

export default {
  layout: 'empty',
  async asyncData({ $sentry, $supabase, $config, error }) {
    const { error: err, shows } = await useFilteredShows({
      $supabase,
      $config,
    })
    if (err) {
      $sentry.captureException(err)
      error({ statusCode: 500, message: err, err })
    }
    return {
      latestShow: shows[0],
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
