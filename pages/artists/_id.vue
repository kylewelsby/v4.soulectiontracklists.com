<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    div(
      class="flex flex-col items-center"
    )
      div(
        class="container mx-auto p-4 py-8"
      )
        SiteSubNav(
          title=""
        )
          SiteSubNavLink(
            href="#links"
            target="_self"
          ) Links
          SiteSubNavLink(
            href="#tracks"
            target="_self"
          ) {{ uniqueMarkers.length }} Tracks
          SiteSubNavLink(
            href="#appearances"
            target="_self"
          ) {{ appearanceCount }} Appearances
        ArtworkHeader(
          :title="data.title"
          :artwork-path="artwork"
        )
          | {{ appearances }}

    div(
      class="flex flex-col items-center"
    )
      div(
        class="container mx-auto p-4"
      )
        h2(
          class="mt-8 text-4xl font-semibold tracking-tighter"
        )
          a(name="links") Links
        span(
          v-if="linkedPlatforms.length > 0"
        )
          h3(
            class="text-lg mt-5"
          ) Follow, Discover and Support {{ data.title }} on
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
                :track-name="artistName"
              )
        h3(
          class="text-lg mt-5"
        ) Search for {{ data.title }} on
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
              :track-name="artistName"
            )
        div(
          class="mt-8"
          v-if="albums.length > 0"
        )
          h2(
            class="text-4xl font-semibold tracking-tighter"
          )
            a(name="releases") Soulection Releases
          div(
            class="grid md:grid-cols-2 lg:grid-cols-3 mt-4"
          )
            TrackListItem(
              class="-mx-4 rounded"
              v-for="album in albums"
              :fallback="albumFallback(album)"
              :show-track-number="false"
              :show-artist="false"
            )
        h2(
          class="mt-8 text-4xl font-semibold tracking-tighter"
        )
          a(name="tracks") Tracks
        div(
          class="grid md:grid-cols-2 lg:grid-cols-3 mt-4"
        )
          TrackMarker(
            class="-mx-4"
            v-for="marker of uniqueMarkers"
            :key="marker.id"
            :marker="marker"
            :show-timestamp="false"
            :show-artist="false"
            :show-track-number="false"
          )
        h2(
          class="mt-8 text-4xl font-semibold tracking-tighter"
        )
          a(name="appearances") Appearances
        div(
          class="grid grid-cols-2 gap-x-4"
        )
          EpisodeListItem(
            v-for="show of shows"
            :key="show.id"
            :episode="show"
            :alt-layout="true"
          )
            div(
              class="mt-2 text-gray-400 text-sm"
            )
              div(
                v-for="marker of showTrack(show)"
                :key="marker.id"
              ) {{ marker.chapter.title }} | Track {{ marker.position }}
                span(
                  v-if="marker.timestamp"
                  class="ml-2"
                ) ({{ marker.timestamp}})
</template>
<script>
import * as shvl from 'shvl'
import uniqBy from 'lodash.uniqby'
import sortBy from 'lodash.sortby'
import sortedUniqBy from 'lodash.sorteduniqby'
export default {
  async asyncData({ $supabase, params, error, redirect }) {
    const id = params.id
    const { error: err, data } = await $supabase
      .from('artists')
      .select(
        `id,
        slug,
        title,
        artwork,
        tracks(
          id,
          title,
          slug
        )`
      )
      .or(`id.eq.${id},slug.eq.${id}`)
      .single()
    if (err) {
      if (err.details.startsWith('Results contain 0 rows,')) {
        error({
          statusCode: 404,
        })
        return
      } else {
        redirect(300, `/artists/lookup?q=${id}`)
        return
      }
    }
    if (data.id !== data.slug && data.slug === id) {
      redirect(301, `/artists/${data.id}/`)
      return
    }
    const trackIds = data.tracks.map((track) => track.id)

    const { data: markers } = await $supabase
      .from('markers')
      .select(
        `id,
        position,
          timestamp,
          rawTrack,
          track(
            id,
            title,
            artwork,
            slug,
            path,
            artist(
              title,
              slug
            )
          ),
          chapter(
            position,
            title,
            show(
              *
            )
          )`
      )
      .in('track', trackIds)
    // .order('published_at', { foreignTable: 'chapter.show', ascending: false })
    const { data: albums } = await $supabase
      .from('albums')
      .select('id, title, artist, artwork')
      .eq('state', 'published')
      .eq('artist', data.id)
      .order('published_at', { ascending: false })

    let uniqueMarkers = uniqBy(markers, (marker) => marker.track.id)
    uniqueMarkers = sortBy(uniqueMarkers, (marker) => marker.track.title)
    let shows = markers.map((marker) => marker.chapter.show)
    shows = sortedUniqBy(shows, 'published_at')
    shows = shows.reverse()
    const lastMarker = markers[0]

    const { data: linkedPlatforms } = await $supabase
      .from('artist_links')
      .select('*')
      .eq('artist', data.id)

    return {
      data,
      shows,
      uniqueMarkers,
      markers,
      lastMarker,
      linkedPlatforms,
      albums,
    }
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
  jsonld() {
    if (!this.data) {
      return {}
    }
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: this.$router.options.base + item.path,
    }))
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MusicGroup',
          name: this.data.title,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: items,
        },
      ],
    }
  },
  head() {
    return {
      title: this.data.title,
    }
  },
  computed: {
    appearanceCount() {
      return this.shows.length
    },
    appearances() {
      return this.$tc('tracklistAppearances', this.appearanceCount, {
        number: shvl.get(this.shows[0], 'title'),
      })
    },
    artwork() {
      return this.data.artwork ? this.data.artwork : undefined
    },
    artistName() {
      return `${this.data.title}`
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
          path: '/',
          name: 'Souelction',
        },
        {
          path: '/artists/',
          name: 'Artists',
        },
        {
          path: `/artists/${this.data.id}/`,
          name: this.data.title,
        }
      )
      return list
    },
  },
  methods: {
    showTrack(show) {
      return this.markers.filter((marker) => {
        return marker.chapter.show.id === show.id
      })
    },
    albumFallback(album) {
      const obj = {}
      obj.artist = this.data.title
      obj.title = album.title
      obj.artwork = album.artwork
      return obj
    },
  },
}
</script>
