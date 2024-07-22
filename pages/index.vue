<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    //- HomeHero
    HomeRoseGoldAddicted

    HomeRecords(
      :latest-album="album"
    )
    HomeSupply
    HomeShows(
      :latest-show="latestShow"
    )
    HomeEvents(
      :events="events"
    )
</template>

<script>
export default {
  name: 'HomePage',
  async asyncData({ $supabase, $axios, error }) {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    const {data} = await $axios.get(`https://v5-api-soulectiontracklists-com.fly.dev/shows?page=1&tags=15,19`, config);
    const showResp = data[0];
    const {data: eventData} = await $axios.get(`https://v5-api-soulectiontracklists-com.fly.dev/shows?page=1&tags=16&limit=9`, config);
    // const albumResp = await $supabase
    //   .from('albums')
    //   .select(
    //     `id,
    //     title,
    //     artwork,
    //     published_at,
    //     artist(
    //       id,
    //       title
    //     )`
    //   )
    //   .eq('state', 'published')
    //   .order('published_at', { ascending: false })
    //   .limit(1)
    //   .single()
    //   console.log(albumResp.data)
      const albumData = {
        id: 'vyw1XmSbzks',
        title: 'Soulection Sound 002: S!RENE (Remixes)',
        artwork: '/images/albums/_LlJxW7StcM.jpg',
        published_at: '2024-02-28T08:18:00+00:00',
        artist: { id: '6TVwqO9zP9Q', title: 'S!RENE' }
      }

    return {
      latestShow: showResp,
      album: albumData,
      events: eventData,
    }
  },
  head() {
    return {
      title: '',
    }
  },
}
</script>
