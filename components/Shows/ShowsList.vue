<template lang="pug">
  div
    EpisodeListItem(
      v-for="show in shows"
      :key="show.id"
      :episode="show"
    )
    Pagination(
      :path="path"
      :total="count"
      :per-page="$config.paginate"
    )
</template>
<script>
export default {
  props: {
    shows: {
      type: Array,
      default: () => [],
    },
    count: {
      type: Number,
      default: 0,
    },
    path: {
      type: String,
      default: '/tracklists/page/',
    },
  },
}
</script>
