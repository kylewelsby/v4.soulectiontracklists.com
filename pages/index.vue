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
  async asyncData({ $staticData, error }) {
    try {
      const shows = await $staticData('data/homepage-shows.json')
      const events = await $staticData('data/homepage-events.json')
      const albumData = {
        id: 'vyw1XmSbzks',
        title: 'Soulection Sound 002: S!RENE (Remixes)',
        artwork: '/images/albums/_LlJxW7StcM.jpg',
        published_at: '2024-02-28T08:18:00+00:00',
        artist: { id: '6TVwqO9zP9Q', title: 'S!RENE' }
      }
      return {
        latestShow: shows[0],
        album: albumData,
        events,
      }
    } catch (err) {
      error({ statusCode: 500, message: err.message })
    }
  },
  head() {
    return {
      title: '',
    }
  },
}
</script>
