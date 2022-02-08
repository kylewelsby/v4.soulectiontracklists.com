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
          Artwork(
            src="/images/shows/PV1iB-dWjhU.jpg"
            :size="480"
          )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-row md:flex-col items-start"
        )
          a(
            v-for="event of events"
            :href="href(event)"
            class="my-2 flex text-sm"
          )
            div(
              class="w-40"
            ) {{ event.published_at | formattedDate }}
            div(
              class="w-40"
            ) {{ title(event.title) }}
            SiteButton(
              v-if="href(event)"
              class="text-xs"
            ) Tickets

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
