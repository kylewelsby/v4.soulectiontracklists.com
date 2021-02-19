<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    EpisodeHero(
      :episode="data"
    )
    EpisodeTracklist(
      :episode="data"
    )
</template>
<script>
export default {
  async asyncData({ $supabase, params, error }) {
    const { error: err, data } = await $supabase
      .from('shows')
      .select(
        `id,
        title,
        artwork,
        links,
        content,
        location,
        duration,
        tags,
        published_at,
        profile:profile_id (*),
        chapters(*, markers(*, track(*)))
        `
      )
      .eq('profile_id', 1)
      .eq('slug', params.slug)
      .single()
    if (err) {
      error({
        statusCode: 404,
        message: `Could not find page \`${params.slug}\` \n\n${err.message}`,
      })
    }
    return {
      data,
    }
  },
  head() {
    return {
      title: this.data.title,
    }
  },
}
</script>
