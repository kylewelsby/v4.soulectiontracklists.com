<template>
  <div class="bg-white flex flex-col items-center">
    <div class="w-full md:w-10/12 p-4 py-8">
      <p>
        It would take
        <strong>{{ formattedDuration }}</strong> to listen to every Soulection
        Radio Show continuously.
      </p>
      <p>
        There currently are
        <strong v-if="allEpisodes">{{ allEpisodes.length }} episodes</strong>
        playing a total of
        <strong>{{ formattedTotalPlayCount }}</strong> identified tracks,
        <strong>{{ formattedTrackCount }}</strong> of them unique.
      </p>
      <p>
        Soulection Radio has had
        <nuxt-link to="/episodes/takeovers">
          {{ totalTakeoverCount }} guest takeovers </nuxt-link
        >.
      </p>
      <p>
        Sadly there are still {{ totalMissingTracklistShows }} that are missing
        tracklists ☹️.
      </p>
      <p>
        Soulection Radio has had the privilege of broadcasting
        {{ broadcasterCounts.kbeach }} episodes on KBeach Radio,
        {{ broadcasterCounts.rinsefm }} episodes on Rinse.fm,
        {{ broadcasterCounts.redbullStudios }} episodes from RedBull Studios,
        and currently {{ broadcasterCounts.appleMusic }} and counting episodes
        on Apple Music,
      </p>
      <p>
        You can find {{ platformCounts.appleMusic }} episodes on Apple Music,
        {{ platformCounts.soundCloud }} episodes on SoundCloud, and
        {{ platformCounts.mixcloud }} episodes on MixCloud.
      </p>
      <p>
        SoulectionTracklists.com started indexing the Radio Show since December
        2016 and many hours have been dedicated into the maintenance of this
        website.
      </p>
      <p>
        It takes about 3+ hours per week to process a new episode of Soulection
        Radio onto this site.
      </p>
      <p>This website costs <strong>~$200 per year</strong> to maintain.</p>
      <p>
        Your contributions and support have paid
        {{ donations.formatted }} towards hosting this website.
      </p>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useAsync,
  ref,
  reactive,
  computed,
  watch,
} from '@nuxtjs/composition-api'

import humanizeDuration from 'humanize-duration'

export default defineComponent({
  setup() {
    const { $content } = useContext()
    const totalPlayCount = ref(0)
    const totalTrackCount = ref(0)
    const totalListeningTime = ref(0)
    const formattedDuration = ref(humanizeDuration(0))
    const totalTakeoverCount = ref(0)
    const totalMissingTracklistShows = ref(0)
    const broadcasterCounts = reactive({
      kbeach: 0,
      rinsefm: 0,
      redbullStudios: 0,
      appleMusic: 0,
    })

    const platformCounts = reactive({
      mixcloud: 0,
      soundCloud: 0,
      appleMusic: 0,
    })

    const donations = reactive({
      total: 0,
      formatted: computed(() => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(donations.total / 100)
      }),
    })

    const formattedTotalPlayCount = computed(() => {
      return new Intl.NumberFormat('en-US').format(totalPlayCount.value)
    })

    const formattedTrackCount = computed(() => {
      return new Intl.NumberFormat('en-US').format(totalTrackCount.value)
    })

    watch(totalListeningTime, (value) => {
      formattedDuration.value = humanizeDuration(value * 1000)
    })

    const allEpisodes = useAsync(async () => {
      const allEpisodes = await $content('episodes')
        .where({
          episode: {
            $gt: 0,
          },
        })
        .fetch()
      let counter = 0
      allEpisodes.forEach((episode) => {
        if (episode.takeover) {
          totalTakeoverCount.value++
        }
        if (episode.station === 'appleMusic' || episode.station === 'beats1') {
          broadcasterCounts.appleMusic++
        }
        if (episode.station === 'kbeach') {
          broadcasterCounts.kbeach++
        }
        if (episode.station === 'rinse') {
          broadcasterCounts.rinsefm++
        }
        if (episode.station === 'redbull') {
          broadcasterCounts.redbullStudios++
        }
        if (episode.appleMusic || episode.beats1) {
          platformCounts.appleMusic++
        }
        if (episode.soundcloud) {
          platformCounts.soundCloud++
        }
        if (episode.mixcloud) {
          platformCounts.mixcloud++
        }
        if (episode.duration && Number.isInteger(episode.duration)) {
          totalListeningTime.value += episode.duration
        }
        if (!episode.sessions || episode.sessions.length === 0) {
          totalMissingTracklistShows.value++
        }
        episode.sessions.forEach((session) => {
          counter += session.tracks.length
        })
      })
      totalPlayCount.value = counter

      return allEpisodes
    })

    const allTracks = useAsync(async () => {
      const allTracks = await $content('artists', { deep: true })
        .where({
          path: {
            $contains: '/tracks/',
          },
        })
        .fetch()
      totalTrackCount.value = allTracks.length
      return allTracks
    })

    useAsync(async () => {
      const openDoc = await $content('/open').fetch()
      Object.entries(openDoc.datasets).forEach(([key, dates]) => {
        if (key !== 'visitors') {
          Object.values(dates).forEach((cents) => {
            donations.total += cents
          })
        }
      })
    })
    return {
      allEpisodes,
      allTracks,
      totalPlayCount,
      totalListeningTime,
      totalTakeoverCount,
      totalMissingTracklistShows,
      formattedTotalPlayCount,
      formattedTrackCount,
      formattedDuration,
      broadcasterCounts,
      platformCounts,
      donations,
    }
  },
  head: {
    title: 'Donate & Support',
  },
})
</script>
