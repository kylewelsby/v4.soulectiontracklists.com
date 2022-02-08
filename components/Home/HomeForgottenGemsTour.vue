<template lang="pug">
  div(
    class="flex flex-col items-center"
    v-if="isLive"
  )
    div(
      class="container mx-auto p-4 py-8"
    )
      div(
        class="mt-4 flex flex-col lg:flex-row md:items-center"
      )
        div(
          class="md:w-1/2 text-enter md:text-right md:ml-4"
        )
          nuxt-link(
            to="/events/"
          )
            Artwork(
              src="/images/shows/PV1iB-dWjhU.jpg"
              :size="480"
            )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-col items-start"
        )
          div(
            v-for="event of events"
            class="my-2 flex items-center text-sm"
          )
            div(
              class="w-40"
            ) {{ event.published_at | formattedDate }}
            SiteButton(
              v-if="href(event)"
              class="text-xs"
            ) {{ title(event.title) }} Tickets

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
    },
    isLive() {
      const published = this.events.some((e) => e.state === 'published')
      const after = this.events.some(
        (e) => Date.parse(e.published_at) > new Date()
      )
      return published && after
    },
  },
  methods: {
    href(event) {
      if (event && event.links) {
        return Object.values(event.links)[0]
      }
      return null
    },
    title(title) {
      return title.replace('The Forgotten Gems Tour - ', '')
    },
  },
}
</script>
