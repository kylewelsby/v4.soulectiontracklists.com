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
        a(
          href="https://soulection.squarespace.com/events"
          rel="noopener"
          target="_blank"
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
        class="mt-4 flex flex-col md:flex-row md:items-center"
      )
        div(
          v-for="event of sortedEvents"
          class="flex flex-col md:flex-row md:items-center mb-8"
        )
          a(
            class="md:w-1/2 lg:w-auto text-center md:text-left md:mr-4"
            :href="event.links.website"
            rel="noopener"
            target="_blank"
          )
            Artwork(
              :src="event.artwork"
              :size="360"
              class="shadow-lg rounded-2xl"
            )
          div(
            class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-col items-start"
          )
            h4(
              class="mb-1 font-bold text-2xl"
            ) {{ event.title }}
            div(
              class="flex flex-row"
            )
              span(
                v-for="(chapter, index) of event.chapters"
              )
                span(
                  v-if="index !== 0"
                )
                  | &nbsp;/
                |
                | {{ chapter.title }}
            div(
              class="mb-3 font-light text-gray-400"
            ) {{ event.published_at | formattedDate }}
            SiteButton(
              :href="event.links.website"
            ) Get Tickets
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
