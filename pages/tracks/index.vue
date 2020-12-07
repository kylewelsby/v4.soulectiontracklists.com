<template>
  <div>
    <!-- <table>
      <tr v-for="(doc, i) of document" :key="i">
        <td>{{ doc.artist }}</td>
        <td>{{ doc.title }}</td>
        <td>{{ doc.lastPlayedAt }}</td>
        <td>
          <nuxt-link :to="`/episodes/${doc.lastEpisodeNumber}`">
            {{ doc.lastEpisodeNumber }}
          </nuxt-link>
        </td>
      </tr>
    </table> -->
    <TrackRow
      v-for="(ref, i) of document"
      :key="i"
      :track-doc="ref"
      :artist-doc="null"
      :track-string="ref.title"
      :artist-string="ref.artist"
    />
    <!-- <EpisodeTrack
      v-for="ref of document"
      :key="ref"
      :track-ref="document.path"
      :track-number="null"
      :track-name="`${ref} - ${}`"
      hide-cue
    /> -->
  </div>
</template>
<script>
import { defineComponent, useContext, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $content } = useContext()
    const document = useAsync(async () => {
      const tracks = await $content('artists', { deep: true })
        .where({
          lastPlayedAt: {
            $gt: new Date(1990, 1, 1),
          },
          path: { $contains: '/tracks/' },
        })
        // .only(['artwork''artist', 'title', 'lastPlayedAt', 'lastEpisodeNumber'])
        .sortBy('lastPlayedAt', 'desc')
        .limit(60)
        .fetch()
      return tracks
    })
    return {
      document,
    }
  },
  head: {
    title: 'All Tracks',
  },
})
</script>
