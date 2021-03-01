<template lang="pug">
  div
    | {{ data.title }}
    | {{ data.tracks }}
</template>
<script>
export default {
  async asyncData({ $supabase, params, error }) {
    const { error: err, data } = await $supabase
      .from('artists')
      .select(
        `id,
      title,
      tracks(
        id,
        title,
        slug
      )`
      )
      .eq('slug', params.slug)
      .single()
    if (err) {
      error({
        statusCode: 404,
      })
    }
    return {
      data,
    }
  },
}
</script>
