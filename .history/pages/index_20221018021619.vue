<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    //- HomeHero
    HomeRoseGoldAddicted
    //- HomeLatest(
    //-   :post="post"
    //- )
    //- HomeSoulectionPlus
    //- HomeForgottenGemsTour(
    //-   :events="forgottenGemsTour"
    //- )
    HomeSupply(
      :latest-item="supply"
    )
    HomeShows(
      :latest-show="latestShow"
    )
    HomeRecords(
      :latest-album="album"
    )
    //- HomeDecadeOfLegacy
    HomeEvents(
      :events="events"
    )
    HomeSubscribe
    //- HomePhaboSoulquarus
</template>

<script>
export default {
  name: 'HomePage',
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
    const eventsResp = await $supabase
      .from('shows')
      .select('*, chapters(*)')
      .eq('state', 'published')
      .eq('profile', $config.profileId)
      .gt('published_at', new Date().toISOString())
      .overlaps('tags', [16])
      .order('published_at', { ascending: true })
      .limit(3)
    const forgottenGemsTourResp = await $supabase
      .from('shows')
      .select('*, chapters(*)')
      .eq('state', 'published')
      .eq('profile', $config.profileId)
      .gt('published_at', new Date().toISOString())
      .overlaps('tags', [17])
      .order('published_at', { ascending: true })
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
    return {
      latestShow: showResp.data,
      album: albumResp.data,
      supply: supplyResp.data || {},
      events: eventsResp.data,
      forgottenGemsTour: forgottenGemsTourResp.data,
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
