<template>
  <div>
    <div v-for="episode in data" :key="episode.id">
      <nuxt-link :to="`episodes/${episode.slug}`">
        {{ episode.title }} {{ episode.published_at }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $supabase, params, $config, error }) {
    let page = params.page - 1 || 0
    if (page <= 0) {
      page = 0
    }
    const { error: err, data } = await $supabase
      .from('shows')
      .select(
        `id,
        title,
        content,
        published_at,
        slug`
      )
      .eq('profile_id', 1)
      .order('published_at', { ascending: false })
      .range(page, page + $config.paginate)
    if (err) {
      error({
        statusCode: 500,
        message: `Somethign went wrong with querying the database\n\n${err.message}`,
      })
    }
    return {
      data,
    }
  },
}
</script>
