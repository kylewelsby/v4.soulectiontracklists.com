<template lang="pug">
  div(
    class="bg-white flex flex-col items-stretch"
  )
    HomeLatest
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
      .limit()
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
    }
  },
  head() {
    return {
      title: '',
    }
  },
}
</script>
