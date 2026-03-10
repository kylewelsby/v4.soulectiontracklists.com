<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    div(
      class="px-4 container mx-auto mt-10 mb-6"
    )
      EventsSubNav
      div(
        class="mb-6"
      )
        p(
          class="my-8 font-light"
        ) Upcoming live events and experiences with the Soulection team.
      div(
        class="grid grid-cols-1 md:grid-cols-3 gap-20"
      )
        EventsListItem(
          v-for="event of data"
          :event="event"
          :key="event.id"
        )
</template>

<script>
export default {
  name: 'SoulectionEvents',
  async asyncData({ $staticData, error }) {
    try {
      const data = await $staticData('data/events.json')
      return { data }
    } catch (err) {
      error({ statusCode: 500, message: err.message || err })
    }
  },
}
</script>
