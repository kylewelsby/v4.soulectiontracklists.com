<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="container mx-auto p-4 py-8"
    )
      div(
        class="flex flex-row flex-wrap items-center"
      )
        h2(
          class="text-2xl md:text-3xl flex-grow font-bold font-header uppercase"
        ) LIVE
        nuxt-link(
          to="/events"
          class="border border-gray-400 rounded-full px-2 md:px-8 py-2 flex flex-row items-center"
        )
          span(
            class="hidden md:inline mr-2"
          ) All
          svg(
            viewBox="0 0 16 17"
            class="w-5 fill-current stroke-current"
          )
            path(
              d="M2 8.5h12M10 12.5l4-4-4-4"
              stroke-linecap="round"
            )
      div(
        class="text-gray-400 text-sm font-light"
      ) Upcoming live events and experiences with the Soulection team.
      div(
        class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-20"
      )
        EventsListItem(
          v-for="event of events"
          :event="event"
        )
</template>
<script>
export default {
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    sortedEvents() {
      return this.events
        .slice(0)
        .sort((a, b) => {
          if (a.published_at > b.published_at) return 1
          if (a.published_at < b.published_at) return -1
          return 0
        })
        .filter((e) => {
          return Date.parse(e.published_at) >= new Date()
        })
        .slice(0, 2)
    },
  },
}
</script>
