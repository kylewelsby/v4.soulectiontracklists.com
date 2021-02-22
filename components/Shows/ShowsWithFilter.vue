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
        ) All Tracklists
        //- span Filter
      div(
        class="flex flex-row"
      )
        div(
          class="w/2/12"
        )
          h4(
            class="text-lg font-bold"
          ) Type
          ul(
            class="mb-4"
          )
            li
              nuxt-link(
                to="/episodes/"
              ) All shows ({{ shows.length }})
            li(
              v-for="(count, key) of filterTypes"
            )
              nuxt-link(
                :to="`/episodes/t/${key}/`"
              ) {{ $tc(`filter.types.${key}`, count) }}
</template>
<script>
export default {
  props: {
    shows: {
      type: Array,
      default: () => [],
    },
    filterTypes: {
      type: Object,
      default: () => ({
        solo: 0,
        takeovers: 0,
        'peoples-choice': 0,
        discord: 0,
        guests: 0,
        interviews: 0,
        missing: 0,
      }),
    },
    takeoverCount: {
      type: Number,
      default: 0,
    },
    interviewCount: {
      type: Number,
      default: 0,
    },
  },
}
</script>
