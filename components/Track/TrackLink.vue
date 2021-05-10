<template lang="pug">
  div(
  )
    a(
      :href="link"
      rel="noopener"
      :target="target"
      class="rounded-full inline-flex flex-row justify-start items-center font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-800 transition p-2 -m-2"
      :class="`track-link--${platform}`"
    )
      SiteIconButton(
        class="dark:bg-white dark:text-black p-1.5"
        :icon="platform"
      )
      span(
        v-if="!hideTitle"
        class="ml-4 pr-4"
      ) {{ $t(`platforms.${platform}`) }}
</template>

<script>
const SEARCH_LINKS = {
  amazonMusic:
    'https://www.amazon.co.uk/s/ref=nb_sb_noss?url=search-alias%3Ddigital-music&tag=soulectiontracklists-21&field-keywords={{}}',
  appleMusic:
    'https://music.apple.com/us/search/song?term={{}}&at=1010lMz4&app=music',
  audioMack: 'https://audiomack.com/search?q={{}}',
  bandcamp: 'https://bandcamp.com/search?q={{}}',
  beatport: 'https://www.beatport.com/search/tracks?q={{}}',
  bing: 'https://www.bing.com/search?q={{}}',
  discogs: 'https://www.discogs.com/search/?q={{}}&type=release',
  deezer: 'https://www.deezer.com/search/{{}}/track',
  duckduckgo: 'https://duckduckgo.com/?q={{}}',
  google: 'https://www.google.co.uk/search?q={{}}',
  lastfm: 'https://www.last.fm/search/tracks?q={{}}',
  soundcloud: 'https://soundcloud.com/search?q={{}}',
  spotify: 'https://open.spotify.com/search/{{}}',
  tidal: 'https://listen.tidal.com/search?q={{}}',
  traxsource: 'https://www.traxsource.com/search?term={{}}',
  youtube:
    'https://www.youtube.com/results?search_query={{}}&sp=EgIQAQ%253D%253D',
}
export default {
  props: {
    platform: {
      type: String,
      default: '',
    },
    href: {
      type: [String, null],
      default: '',
    },
    target: {
      type: String,
      default: '_blank',
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
    trackName: {
      type: String,
      default: '',
    },
    iconSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    searchUrl() {
      return (SEARCH_LINKS[this.platform] || '').replace(
        '{{}}',
        encodeURIComponent(this.trackName)
      )
    },
    link() {
      if (this.href) {
        if (this.platform === 'appleMusic') {
          const u = new URL(this.href)
          u.searchParams.set('at', '1010lMz4')
          u.searchParams.set('app', 'music')
          return u.toString()
        } else if (this.platform === 'amazonMusic') {
          const u = new URL(this.href)
          u.searchParams.set('tag', 'soulectiontracklists-21')
          return u.toString()
        }
        return this.href
      } else {
        return this.searchUrl
      }
    },
  },
}
</script>
