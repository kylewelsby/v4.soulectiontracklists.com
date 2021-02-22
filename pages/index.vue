<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    HomeHero(
      :latest-show="latestShow"
    )
    //- News events

</template>

<script>
export default {
  async asyncData({ $supabase, $config, error }) {
    const { error: err, data } = await $supabase
      .from('shows')
      .select('title, slug, artwork')
      .eq('profile_id', 1)
      .order('published_at', { ascending: false })
      .limit(1)
      .single()
    if (err) {
      console.error(err)
      error({ statusCode: 500 })
    }
    return {
      latestShow: data,
    }
  },
  head() {
    return {
      title: '',
    }
  },
}
</script>
