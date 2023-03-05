<template lang="pug">
  a(
    :href="href"
    rel="noopener"
    target="_blank"
    class="flex flex-col items-start"
  )
    Artwork(
      :src="event.artwork"
      :size="448"
      class="shadow-lg rounded-2xl"
      :dpr="2"
    )
    div(
      class="w-full flex flex-col"
    )
      h2(
        class="mt-4 text-xl font-bold tracking-tight"
      ) {{ event.title }}
      div(
        class="text-gray-300 truncate mb-2"
      ) {{ event.chapters.map((c) => c.title).join(' / ') }}
      div(
        class="text-sm"
        v-if="!hideDate"
      ) {{ event.published_at | formattedDate }}
      SiteButton(
        class="mt-4"
        :href="href"
      ) Get Tickets
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    href() {
      if (this.event && this.event.links) {
        return Object.values(this.event.links)[0]
      }
      return null
    },
    hideDate() {
      if (this.event && this.event.tags) {
        return this.event.tags.includes(18)
      }
      return false
    },
  },
}
</script>
