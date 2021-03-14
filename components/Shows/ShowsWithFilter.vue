<template lang="pug">
  div(
    class="bg-black text-white flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8 flex flex-col"
    )
      div(
        class="flex flex-row items-end leading-none mb-4"
      )
        h2(
          class="flex-grow text-4xl"
        ) {{ title }}
        //- span Filter
      div(
        class="grid grid-cols-4 gap-4"
      )
        ShowsFilter(
          :total-count="totalCount"
          :tags-with-counts="tagsWithCounts"
          class="hidden lg:block"
        )
        ShowsList(
          :shows="shows"
          :count="count"
          :path="path"
          class="col-span-3"
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
