<template lang="pug">
  div(
    class="flex flex-col items-stretch"
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
  async asyncData({ $supabase, $config, $axios, params, error }) {
    // try {
    const config = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const data = await $axios.$get(`https://v5-api-soulectiontracklists-com.fly.dev/shows/${params.slug}`, config);
      if (data) {
        data.chapters.forEach((chapter) => {
          chapter.markers.forEach((marker) => {
            const track = marker.track
            if (track) {
              const artist = marker.track.artist
              artist.path = `/artists/${artist.slug}/`
              // track.path = `${artist.path}tracks/${track.slug}/`
            }
          })
        })
        return { data }
      } else {
        throw new Error('Show not found')
      }
    // } catch (err) {
    //   error({
    //     statusCode: 404,
    //     message: `Could not find page \`${params.slug}\``,
    //     isMissingShow: true,
    //   })
    // }
  },
  head() {
    return {
      title: this.data.title,
    }
  },
}
</script>
