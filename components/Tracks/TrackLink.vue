<template>
  <a
    :href="link"
    rel="noopener"
    target="_blank"
    class="flex flex-row justify-start items-center font-semibold text-lg"
  >
    <div
      class="rounded-full bg-white flex flex-col items-center justify-center content-center min-w-10 w-10 min-h-32 h-10"
    >
      <img
        v-if="logo"
        :src="logo"
        width="32"
        height="32"
        class="rounded-full bg-white"
      />
    </div>
    <span v-if="!hideTitle" class="ml-4">
      {{ $t(`providers.${provider}`) }}
    </span>
  </a>
</template>
<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
const searchLinks = {
  amazonMusic:
    'https://www.amazon.co.uk/s/ref=nb_sb_noss?url=search-alias%3Ddigital-music&tag=soulectiontracklists-21&field-keywords={{}}',
  appleMusic: 'https://music.apple.com/us/search/song?term={{}}',
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
export default defineComponent({
  props: {
    provider: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    trackName: {
      type: String,
      default: '',
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const searchUrl = () => {
      return (searchLinks[props.provider] || '').replace(
        '{{}}',
        encodeURIComponent(props.trackName)
      )
    }
    const link = computed(() =>
      props.href ? props.href : searchUrl(props.trackName)
    )
    const logo = computed(() => {
      try {
        return require(`@/assets/images/providers/${props.provider}.svg?data`)
      } catch (_err) {}
    })
    return {
      logo,
      link,
    }
  },
})
</script>
