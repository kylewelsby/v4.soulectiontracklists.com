<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    //- HomeLatest(
    //-   :post="post"
    //- )
    HomeRecords(
      :latest-album="album"
    )
    HomeShows(
      :latest-show="latestShow"
    )
    HomeSupply
    HomeEvents
</template>

<script>
import { useFilteredShows } from '~/compositions'

export default {
  async asyncData({ $sentry, $supabase, $config, error }) {
    const {
      error: err,
      shows,
      tagsWithCounts,
      totalCount,
      count,
    } = await useFilteredShows({
      $supabase,
      $config,
    })
    // const postResp = await $supabase
    //   .from('posts')
    //   .select('title, artwork, href, published_at')
    //   .eq('profile', $config.profileId)
    //   .limit(1)
    //   .single()
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
      .order('published_at', { ascending: false })
      .limit(1)
      .single()
    if (err) {
      $sentry.captureException(err)
      error({ statusCode: 500, message: err, err })
    }
    const album = albumResp.data
    return {
      latestShow: shows[0],
      shows,
      tagsWithCounts,
      count,
      totalCount,
      album,
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
