<template lang="pug">
  div(
    class="container mx-auto px-4"
  )
    div(
      class="flex flex-row items-end leading-none mb-4"
    )
      h2(
        class="text-2xl font-header uppercase"
      ) {{ title }}
    ShowsList(
      :shows="shows"
      :count="count"
      :path="path"
    )
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'All Tracklists',
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    tagsWithCounts: {
      type: Object,
      default: () => undefined,
    },
    shows: {
      type: Array,
      default: () => [],
    },
    path: {
      type: String,
      default: () => undefined,
    },
  },
}
</script>
