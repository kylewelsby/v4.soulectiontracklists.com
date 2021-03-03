<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    div(
      class="bg-white flex flex-col items-center"
    )
      div(
        class="w-full md:w-10/12 p-4 py-8"
      )
        ArtworkHeader(
          :title="data.title"
          :artwork-path="artwork"
          :highlighted="data.artist.title"
        )
          | {{ appearances }}
    div(
      class="bg-black text-white flex flex-col items-center"
    )
      div(
        class="w-full md:w-10/12 p-4"
      )
        h2(
          class="mt-8 text-4xl font-semibold tracking-tighter"
        ) Links
        h3(
          class="text-lg mt-5"
        ) Buy, Listen, Download, and Support on
        ul(
          class="grid md:grid-cols-2"
        )
          li(
            v-for="(data, index) of linkedPlatforms"
            :key="index"
            class="my-3"
          )
            TrackLink(
              :platform="data.platform"
              :href="data.href"
              :track-name="trackName"
            )
        h3(
          class="text-lg mt-5"
        ) Search on
        ul(
          class="grid md:grid-cols-2 opacity-75"
        )
          li(
            v-for="(platform, index) of unlinkedPlatforms"
            :key="index"
            class="my-3"
          )
            TrackLink(
              :platform="platform"
              :track-name="trackName"
            )
        h2(
          class="mt-8 text-4xl font-semibold tracking-tighter"
        ) Appearances
        EpisodeListItem(
          v-for="show of shows"
          :key="show.id"
          :episode="show"
        )
</template>
<script>
import * as shvl from 'shvl'
import uniqby from 'lodash.uniqby'
export default {
  async asyncData({ $supabase, params, error }) {
    const { error: err, data } = await $supabase
      .from('tracks')
      .select(
        `*,
        artist(
          *
        )`
      )
      .eq('slug', params.slug)
      .eq('artist.slug', params.artist)
      .single()
    const { count: appearanceCount } = await $supabase
      .from('markers')
      .select('*', { head: true, count: 'exact' })
      .eq('track', data.id)
    const { data: markers } = await $supabase
      .from('markers')
      .select(
        `chapter(
          show(
            id,
            artwork,
            title,
            slug,
            content,
            published_at
          )
        )`
      )
      .eq('track', data.id)
      .order('published_at', { foreignTable: 'chapter.show', ascending: false })

    let shows = markers.map((marker) => marker.chapter.show)
    shows = uniqby(shows, 'id')
    const lastMarker = markers[0]

    const { data: linkedPlatforms } = await $supabase
      .from('track_links')
      .select('*')
      .eq('track', data.id)

    if (err) {
      error({ statusCode: 404 })
    }
    return { data, appearanceCount, lastMarker, shows, linkedPlatforms }
  },
  data() {
    return {
      platforms: [
        'amazonMusic',
        'appleMusic',
        'audioMack',
        'audius',
        'bandcamp',
        'bing',
        'discogs',
        'deezer',
        'duckduckgo',
        'google',
        'lastfm',
        'soundcloud',
        'spotify',
        'tidal',
        'youtube',
        'traxsource',
        'beatport',
        // 'website',
        // 'instagram',
        // 'facebook',
        // 'dropbox',
        // 'box',
        // 'googleDrive',
        // 'mega',
      ],
    }
  },
  computed: {
    appearances() {
      return this.$tc('tracklistAppearances', this.appearanceCount, {
        number: shvl.get(this.lastMarker, 'chapter.show.title'),
      })
    },
    artwork() {
      return this.data.artwork ? this.data.artwork : undefined
    },
    trackName() {
      return `${this.data.artist.title} - ${this.data.title}`
    },
    unlinkedPlatforms() {
      const availablePlatforms = this.linkedPlatforms.map(
        (data) => data.platform
      )
      return this.platforms
        .filter((platform) => {
          return !availablePlatforms.includes(platform)
        })
        .sort((a, b) => a.localeCompare(b))
    },
  },
}
</script>
