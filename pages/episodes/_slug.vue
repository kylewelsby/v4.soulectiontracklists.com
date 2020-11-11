<template>
  <div class="bg-white flex flex-col items-stretch">
    <div class="bg-white flex flex-col items-center">
      <div class="w-full md:w-10/12 p-4 py-8">
        <ArtworkHeader
          :title="page.title"
          :date="page.date"
          :artwork-path="page.artwork"
          highlighted="Testing"
        >
          {{ formattedSummary }}
          <span v-if="soundcloudData && soundcloudData.media">
            <button
              class="bg-black p-3 w-12 h-12 rounded-full flex items-center justify-center mt-4"
              @click="playEpisode()"
            >
              <svg
                class="text-white fill-current w-5 h-5 ml-1"
                viewBox="0 0 320.001 320.001"
              >
                <defs />
                <path
                  d="M295.84 146.049l-256-144c-4.96-2.784-11.008-2.72-15.904.128C19.008 5.057 16 10.305 16 16.001v288c0 5.696 3.008 10.944 7.936 13.824 2.496 1.44 5.28 2.176 8.064 2.176 2.688 0 5.408-.672 7.84-2.048l256-144c5.024-2.848 8.16-8.16 8.16-13.952s-3.136-11.104-8.16-13.952z"
                />
              </svg>
            </button>
          </span>
        </ArtworkHeader>
        <nuxt-content :document="page" />
      </div>
    </div>
    <div class="bg-black text-white flex flex-col items-center">
      <div class="w-full md:w-10/12 p-4">
        <div
          v-for="(session, index) of page.sessions"
          :id="slugify(session.name)"
          :key="index"
        >
          <div class="p-4">
            <div v-if="session.artwork">
              <!-- TODO artwork -->
            </div>
            <div>
              <div class="text-2xl font-medium">
                {{ session.name }}
              </div>
              <div v-if="session.content" class="mt-4">
                <nuxt-content :document="session.content" />
              </div>
            </div>
          </div>
          <div
            v-for="(track, trackIndex) of session.trackPages"
            :key="trackIndex"
            class="flex flex-row items-center justify-center p-4 text-lg"
          >
            <a href="" class="h-12 w-12 mr-6 relative rounded bg-default-image">
              <img
                v-if="track && track.artwork"
                :src="artworkPath(track)"
                class="self-center rounded inline-block min-w-12 min-h-12 h-12 w-12 max-w-12 max-h-12 object-cover"
                onerror="this.src = '/default-artist.png'"
              />
              <span
                class="absolute top-0 right-0 -mt-2 -mr-2 bg-white shadow rounded-full w-5 h-5 leading-none text-xs flex items-center justify-center p-2 text-gray-500"
              >
                {{ trackIndex + 1 }}
              </span>
            </a>
            <span class="flex flex-col flex-grow">
              <a
                class="text-xs order-first cursor-pointer"
                @click="seekTo(session.cue[trackIndex])"
              >
                {{ session.cue[trackIndex] }}
              </a>
              <nuxt-link
                v-if="session.artistPages[trackIndex]"
                :to="session.artistPages[trackIndex].dir"
                class="font-medium order-3"
              >
                {{ session.artistPages[trackIndex].title }}
              </nuxt-link>
              <span v-else class="font-medium order-3">
                {{ session.tracks[trackIndex].split(' - ')[0] }}
              </span>
              <nuxt-link
                v-if="track"
                class="font-light order-2"
                :to="track.path"
              >
                {{ track.title }}
              </nuxt-link>
              <span v-else class="font-light order-2">
                {{ session.tracks[trackIndex].split(' - ')[1] }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-default-image {
  background-image: url('~assets/images/default-artist.png');
  background-size: cover;
}
</style>
<script>
import ArtworkHeader from '@/components/ArtworkHeader'

export default {
  components: {
    ArtworkHeader,
  },
  async asyncData({ $content, $axios, params, error }) {
    let slug = params.slug
    if (slug === '_index') {
      slug = ''
    }
    const page = await $content('episodes', slug)
      .fetch()
      .then((page) => {
        const promises = []
        page.flatTracklist = []
        page.sessions.forEach((session) => {
          session.trackPages = []
          session.artistPages = []
          session.refs.forEach((ref, index) => {
            const promise = $content(ref.replace(/\.md$/, ''))
              .limit(1)
              .fetch()
              .then((page) => {
                session.trackPages[index] = page
              })
              .catch(() => {
                session.trackPages[index] = null
              })
            const artistRef = ref
              .replace(/^artists\/(.+)\/tracks\/.*\.md$/, '$1')
              .replace(/\.md$/, '')
            const promise2 = $content('artists', artistRef)
              .limit(1)
              .fetch()
              .then((page) => {
                session.artistPages[index] = page[0]
              })
              .catch(() => {
                session.artistPages[index] = null
              })
            promises.push(promise)
            promises.push(promise2)
          })
        })
        return Promise.all(promises).then(() => {
          page.flatTracklist = []
          page.sessions.forEach((session) => {
            session.refs.forEach((ref, index) => {
              const track = {
                position: (session.cue[index] || '00:00:00')
                  .split(':')
                  .reduce((acc, time) => 60 * acc + +time),
              }
              if (session.artistPages[index]) {
                track.artist = session.artistPages[index].title
              } else {
                track.artist = session.tracks[index].split(' - ')[0]
              }
              if (session.trackPages[index]) {
                track.title = session.trackPages[index].title
                track.artwork = `https://firebase.soulectiontracklists.com/cdn/image/${session.trackPages[index].artwork}`
              } else {
                track.title = session.tracks[index].split(' - ')[1]
              }
              track.episodeArtwork = `https://firebase.soulectiontracklists.com/cdn/image/${page.artwork}`
              track.episodeTitle = page.title
              track.sessionTitle = session.name
              page.flatTracklist.push(track)
            })
          })
          return page
        })
      })
      .catch((_err) => {
        error({ statusCode: 404, message: 'Episode not found' })
      })
    return { page }
  },
  data: () => ({
    soundcloudData: null,
  }),
  computed: {
    formattedSummary() {
      const options = {
        tracks: this.page.sessions.reduce((sum, session) => {
          return sum + session.tracks.length
        }, 0),
        sessions: this.page.sessions.length,
        hasInterview: this.page.sessions.some((session) =>
          (session.name || '').includes('Interview')
        ),
      }
      let key = 'episode.soloSession'
      if (options.sessions > 1) {
        key = 'episode.multiSession'
      }
      if (options.hasInterview) {
        key = key + 'WithInterview'
      }
      return this.$t(key, options)
    },
  },
  mounted() {
    if (this.page.soundcloud) {
      this.$axios
        .get(
          'https://us-central1-soulection-tracklists.cloudfunctions.net/onSoundCloud',
          // 'http://localhost:5000/soulection-tracklists/us-central1/onSoundCloud',
          {
            params: {
              permalink: this.page.soundcloud,
            },
          }
        )
        .then((res) => {
          this.soundcloudData = res.data
        })
    }
  },
  methods: {
    slugify(string) {
      const a =
        'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
      const b =
        'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    },
    artworkPath(track) {
      if (track && track.artwork) {
        return `https://firebase.soulectiontracklists.com/cdn/image/${track.artwork}`
      } else {
        return ''
      }
    },
    playEpisode() {
      if (this.soundcloudData && this.soundcloudData.streamUrl) {
        this.$store.commit('player/setUrl', this.soundcloudData.streamUrl)
        this.$store.commit('player/setTracklist', this.page.flatTracklist)
      }
    },
    seekTo(cue) {
      this.$store.dispatch('player/seekTo', {
        position: (cue || '00:00:00')
          .split(':')
          .reduce((acc, time) => 60 * acc + +time),
      })
    },
  },
}
</script>
