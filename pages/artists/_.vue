<template>
  <div class="bg-white flex flex-col items-stretch">
    <div class="bg-white flex flex-col items-center">
      <div class="w-full md:w-10/12 p-4 py-8">
        <ArtworkHeader
          :title="page.title"
          :artwork-path="page.artwork"
          :highlighted="artistPage.title"
        >
          {{
            $tc('tracklistAppearances', page.episodes.length, {
              number: page.episodes.sort().reverse()[0],
            })
          }}
        </ArtworkHeader>
        <div>
          <nuxt-content :document="page" />
        </div>
      </div>
    </div>
    <div class="bg-black text-white flex flex-col items-center">
      <div class="w-full md:w-10/12 p-4">
        <h2 class="mt-8 text-4xl font-semibold tracking-tighter">Links</h2>
        <h3 class="text-lg mt-5">Buy, Listen, Download, and Support on</h3>
        <ul class="grid md:grid-cols-2">
          <li
            v-for="(data, index) of linkedProviders"
            :key="index"
            class="my-3"
          >
            <a
              :href="data.href"
              rel="noopener"
              target="_blank"
              class="flex flex-row justify-start items-center font-semibold text-lg"
            >
              <div
                class="rounded-full bg-white flex flex-col items-center justify-center content-center min-w-10 w-10 min-h-10 h-10 mr-4"
              >
                <img
                  :src="providerLogo(data.provider)"
                  width="32"
                  height="32"
                  class="rounded-full bg-white"
                />
              </div>
              {{ $t(`providers.${data.provider}`) }}
            </a>
          </li>
        </ul>
        <h3 class="text-lg mt-5">Search on</h3>
        <ul class="grid md:grid-cols-2 opacity-75">
          <li
            v-for="(data, index) of unlinkedProviders"
            :key="index"
            class="my-3"
          >
            <a
              :href="searchUrl(data.provider)"
              rel="noopener"
              target="_blank"
              class="flex flex-row justify-start items-center font-semibold text-lg"
            >
              <div
                class="rounded-full bg-white flex flex-col items-center justify-center content-center min-w-10 w-10 min-h-32 h-10 mr-4"
              >
                <img
                  :src="providerLogo(data.provider)"
                  width="32"
                  height="32"
                  class="rounded-full bg-white"
                />
              </div>

              {{ $t(`providers.${data.provider}`) }}
            </a>
          </li>
        </ul>
        <h2 class="mt-8 text-4xl font-semibold tracking-tighter">
          Appearances
        </h2>
        <nuxt-link
          v-for="(episode, episodeIndex) of episodes"
          :key="episodeIndex"
          :to="episode.path"
        >
          {{ episode.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import ArtworkHeader from '@/components/ArtworkHeader'

export default {
  components: {
    ArtworkHeader,
  },
  async asyncData({ $content, params, error }) {
    try {
      const artistPage = await $content(
        'artists',
        params.pathMatch.replace(/\/tracks\/.*/, '')
      )
        .fetch()
        .then((pages) => pages[0])
      const page = await $content('artists', params.pathMatch).fetch()
      const episodes = await $content('episodes')
        .where({ episode: { $in: page.episodes } })
        .fetch()
      return {
        page,
        artistPage,
        episodes,
      }
    } catch (err) {
      const errResp = { statusCode: 500, message: err.message }
      if (err.message === 'Not Found') {
        errResp.statusCode = 404
        errResp.message = 'Track not found'
      }
      error(errResp)
    }
  },
  data() {
    return {
      providers: [
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
        'website',
        'instagram',
        'facebook',
        'dropbox',
        'box',
        'googleDrive',
        'mega',
      ],
      providerSearchUrls: {
        amazonMusic:
          'https://www.amazon.co.uk/s/ref=nb_sb_noss?url=search-alias%3Ddigital-music&tag=soulectiontracklists-21&field-keywords={{}}',
        appleMusic: 'https://music.apple.com/us/search/song?term={{}}',
        audioMack: 'https://audiomack.com/search?q=',
        bandcamp: 'https://bandcamp.com/search?q={{}}',
        beatport: 'https://www.beatport.com/search/tracks?q={{}}',
        bing: 'https://www.bing.com/search?q={{}}',
        discogs: 'https://www.discogs.com/search/?q={{}}&type=release',
        deezer: 'https://www.deezer.com/search/{{}}/track',
        duckduckgo: 'https://duckduckgo.com/?q={{}}',
        google: 'https://www.google.co.uk/search?q={{}}',
        lastfm: 'https://www.last.fm/search/tracks?q={{}}',
        soundcloud: 'https://soundcloud.com/search?q={{}}',
        spotify: 'https://open.spotify.com/search/results/{{}}',
        tidal: 'https://listen.tidal.com/search?q={{}}',
        traxsource: 'https://www.traxsource.com/search?term={{}}',
        youtube:
          'https://www.youtube.com/results?search_query={{}}&sp=EgIQAQ%253D%253D',
      },
    }
  },
  head() {
    return {
      title: `${this.artistPage.title} - ${this.page.title}`,
    }
  },
  computed: {
    trackName() {
      return `${this.artistPage.title} - ${this.page.title}`
    },
    trackArtwork() {
      return `https://firebase.soulectiontracklists.com/cdn/image/${this.page.artwork}`
    },
    linkedProviders() {
      const array = []
      this.providers.forEach((provider) => {
        if (this.page.links[provider] && this.page.links[provider].href) {
          array.push(Object.assign({}, this.page.links[provider], { provider }))
        }
      })
      return array.sort((a, b) => a.provider.localeCompare(b.provider))
    },
    unlinkedProviders() {
      const array = []
      this.providers.forEach((provider) => {
        if (!this.page.links[provider] || !this.page.links[provider].href) {
          array.push({ provider })
        }
      })
      return array
        .sort((a, b) => a.provider.localeCompare(b.provider))
        .filter((item) =>
          Object.keys(this.providerSearchUrls).includes(item.provider)
        )
    },
  },
  methods: {
    searchUrl(provider) {
      return (this.providerSearchUrls[provider] || '').replace(
        '{{}}',
        encodeURIComponent(this.trackName)
      )
    },
    providerLogo(provider) {
      try {
        return require(`@/assets/images/providers/${provider}.svg?data`)
      } catch (_err) {}
    },
  },
}
</script>
