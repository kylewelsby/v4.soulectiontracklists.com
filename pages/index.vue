<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    //- HomeHero
    HomePhaboSoulquarus
    //- HomeLatest(
    //-   :post="post"
    //- )
    HomeRecords(
      :latest-album="album"
    )
    HomeShows(
      :latest-show="latestShow"
    )
    HomeDecadeOfLegacy
    HomeSupply(
      :latest-item="supply"
    )
    HomeEvents(
      :events="events"
    )
</template>

<script>
export default {
  async asyncData({ $sentry, $supabase, $config, error, $content }) {
    // const postResp = await $supabase
    //   .from('posts')
    //   .select('title, artwork, href, published_at')
    //   .eq('profile', $config.profileId)
    //   .limit(1)
    //   .single()
    const showResp = await $supabase
      .from('shows')
      .select('*')
      .eq('state', 'published')
      .eq('profile', $config.profileId)
      .overlaps('tags', $config.homepageTagNames)
      .order('published_at', { ascending: false })
      .limit(1)
      .single()
    const albumResp = await $supabase
      .from('albums')
      .select(
        `id,
        title,
        artwork,
        published_at,
        artist(
          id,
          title
        )`
      )
      .eq('state', 'published')
      .order('published_at', { ascending: false })
      .limit(1)
      .single()
    const supplyResp = await $supabase
      .from('supply')
      .select('*')
      .eq('id', 1)
      .single()
    const events = await $content('events')
      .fetch()
      .catch((err) => {
        console.error(err)
      })
    return {
      latestShow: showResp.data,
      album: albumResp.data,
      supply: supplyResp.data || {},
      events: events.events,
      // post: postResp.data,
    }
  },
  head() {
    return {
      title: '',
    }
  },
}
</script>
