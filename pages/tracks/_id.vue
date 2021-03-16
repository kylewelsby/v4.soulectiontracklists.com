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
          template(#highlighted)
            nuxt-link(
              :to="artistPath"
            ) {{ data.artist.title }}
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
          class="grid md:grid-cols-2 lg:grid-cols-3"
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
          class="grid md:grid-cols-2 lg:grid-cols-3 opacity-75"
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
import sortedUniqBy from 'lodash.sorteduniqby'
import { absoulteUrlForPath } from '~/utils/absoulteUrlForPath'
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
      .eq('id', params.id)
      .single()
    if (err) {
      if (err.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
        return
      } else {
        throw err
      }
    }
    const { count: appearanceCount } = await $supabase
      .from('markers')
      .select('*', { head: true, count: 'exact' })
      .eq('track', data.id)
    const { data: markers } = await $supabase
      .from('markers')
      .select(
        `chapter(
          id,
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
    shows = sortedUniqBy(shows, 'published_at')
    shows = shows.reverse()

    const lastMarker = markers[0]

    const { data: linkedPlatforms } = await $supabase
      .from('track_links')
      .select('*')
      .eq('track', data.id)

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
  head() {
    return {
      title: this.trackName,
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
    artistPath() {
      return `/artists/${this.data.artist.slug}/`
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
    breadcrumbs() {
      const list = []
      list.push(
        {
          path: absoulteUrlForPath('/', this),
          name: 'Souelction',
        },
        {
          path: absoulteUrlForPath('/tracks/', this),
          name: 'Tracks',
        },
        {
          path: absoulteUrlForPath(`/tracks/${this.data.id}/`, this),
          name: this.trackName,
        }
      )
      return list
    },
  },
  jsonld() {
    if (!this.data) {
      return {}
    }
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path,
    }))
    const artists = [this.data.artist].map((item, _index) => ({
      '@type': 'MusicGroup',
      name: item.title,
      sameAs: [absoulteUrlForPath(`/artists/${item.id}/`, this)],
    }))
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MusicRecording',
          name: this.data.title,
          byArtist: artists,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: items,
        },
      ],
    }
  },
}
</script>
