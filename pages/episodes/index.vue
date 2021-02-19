<template lang="pug">
  div(
    class="bg-white flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4"
    )
      Pagination(
        path="/episodes/page/"
        :total="count"
        :per-page="$config.paginate"
      )
      EpisodeListItem(
        v-for="episode in data"
        :key="episode.id"
        :episode="episode"
      )
</template>

<script>
import Pagination from '@/components/Shared/Pagination'
export default {
  components: {
    Pagination,
  },
  async asyncData({ $supabase, params, $config, error }) {
    const { error: err1, count } = await $supabase
      .from('shows')
      .select('id', { count: 'planned' })
      .eq('profile_id', 1)
    if (err1) {
      error({
        statusCode: 500,
        message: `Somethign went wrong with querying the database\n\n${err1.message}`,
      })
    }
    const { error: err, data } = await $supabase
      .from('shows')
      .select(
        `id,
        title,
        artwork,
        content,
        published_at,
        slug`
      )
      .eq('profile_id', 1)
      .order('published_at', { ascending: false })
      .range(0, $config.paginate)
    if (err) {
      error({
        statusCode: 500,
        message: `Somethign went wrong with querying the database\n\n${err.message}`,
      })
    }
    return {
      data,
      count,
    }
  },
  head() {
    return {
      title: 'Episodes',
    }
  },
}
</script>
