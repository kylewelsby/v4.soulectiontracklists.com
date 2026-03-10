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
  async asyncData({ $staticData, params, error }) {
    try {
      const data = await $staticData(`data/shows/${params.slug}.json`)
      if (data) {
        data.chapters.forEach((chapter) => {
          chapter.markers.forEach((marker) => {
            const track = marker.track
            if (track) {
              const artist = marker.track.artist
              artist.path = `/artists/${artist.id || artist.slug}/`
            }
          })
        })
        return { data }
      } else {
        throw new Error('Show not found')
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: `Could not find page \`${params.slug}\``,
        isMissingShow: true,
      })
    }
  },
  head() {
    return {
      title: this.data.title,
    }
  },
}
</script>
