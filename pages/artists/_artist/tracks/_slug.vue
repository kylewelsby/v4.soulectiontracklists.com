<template lang="pug">
  ul
    li(
      v-for="row in data"
      :key="row.id"
    ) {{row}}
</template>
<script>
export default {
  async asyncData({ $supabase, params, error, redirect }) {
    const { error: err, data } = await $supabase
      .from('artists')
      .select('id, title, slug, tracks(id, slug)')
      .match({
        slug: params.artist,
        'tracks.slug': params.slug,
      })
    if (err) {
      console.error(err)
    }
    if (data.length === 0 || data[0].tracks.length === 0) {
      error({ statusCode: 404 })
      return
    } else if (data.length === 1 && data[0].tracks.length === 1) {
      // redirect(301, `/tracks/${data[0].tracks[0].id}/`)
      return
    } else {
      console.log('300 many found')
      // redirect(300, `/tracks/lookup`, {
      // q: `${params.artist} - ${params.slug}`,
      // })
    }
    return { data }
  },
}
</script>
