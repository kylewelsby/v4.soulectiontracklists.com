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
  async asyncData({ $supabase, params, error }) {
    const { error: err, data } = await $supabase
      .from('shows')
      .select(
        `id,
        title,
        artwork,
        links,
        content,
        location,
        duration,
        tags,
        published_at,
        profile:profile_id (*),
        chapters(
          *,
          markers(
            *,
            track(
              *,
              artist(
                title,
                slug
              ),
              track_links(
                href,
                platform
              )
            )
          )
        )
        `
      )
      .eq('profile_id', 1)
      .eq('slug', params.slug)
      .single()
    if (err) {
      error({
        statusCode: 404,
        message: `Could not find page \`${params.slug}\``,
        isMissingShow: true,
      })
    } else {
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
    }
    return {
      data,
    }
  },
  head() {
    return {
      title: this.data.title,
    }
  },
}
</script>
