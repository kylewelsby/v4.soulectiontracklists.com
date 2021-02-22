<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    HomeHero(
      :latest-show="latestShow"
    )
    //- News events
    ShowsWithFilter(
      :shows="shows"
    )
</template>

<script>
export default {
  async asyncData({ $supabase, $config, error }) {
    const { error: err, data } = await $supabase
      .from('shows')
      .select('title,slug,artwork,content')
      .eq('profile_id', 1)
      .order('published_at', { ascending: false })
      .range(0, $config.paginate)
    if (err) {
      error({ statusCode: 500 })
    }
    return {
      latestShow: data[0],
      shows: data,
    }
  },
  head() {
    return {
      title: '',
    }
  },
}
</script>
