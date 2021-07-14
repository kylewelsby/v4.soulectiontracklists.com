<template lang="pug">
  a(
    :href="href"
    rel="noopener"
    target="_blank"
    class="flex flex-col items-start"
  )
    Artwork(
      :src="event.artwork"
      :size="512"
      class="shadow-lg rounded-2xl"
    )
    h2(
      class="mt-4 text-2xl font-bold tracking-tight"
    ) {{ event.title }}
    div(
      class="text-gray-300 truncate mb-2"
    ) {{ event.chapters.map((c) => c.title).join(' / ') }}
    div(
      class="text-sm"
    ) {{ event.published_at | formattedDate }}
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
  },
}
</script>
