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
</template>
<script>
import * as shvl from 'shvl'
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
    const { data: lastMarker } = await $supabase
      .from('markers')
      .select(
        `chapter(
          show(title)
        )`
      )
      .eq('track', data.id)
      .order('published_at', { foreignTable: 'chapter.show', ascending: false })
      .limit(1)
      .single()
    if (err) {
      error({ statusCode: 404 })
    }
    return { data, appearanceCount, lastMarker }
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
  },
}
</script>
