<template lang="pug">
  div(
    class="flex flex-col lg:flex-row lg:items-center my-6 lg:my-8"
  )
    Artwork(
      class="self-center mb-8 lg:mb-0 lg:mr-10"
      :src="artworkPath"
      :size="327"
    )
    div
      h1(
        class="tracking-tighter text-4xl font-semibold artwork__header__title"
      ) {{ title }}
      div(
        class="mt-2 text-lg font-serif font-medium flex flex-col md:flex-row items-start md:items-center"
      )
        span(
          v-if="date"
          class="inline-block pr-2 py-1"
        ) {{ formattedDate }} &bull;
        span(
          class="bg-yellow-500 inline py-1"
          v-if="$slots.highlighted"
        )
          slot(name="highlighted")
      div(
        v-if="$slots.default"
        class="mt-2 text-gray-500 underline"
      )
        slot
      div(
        v-if="$slots.content"
        class="mt-4"
      )
        slot(
          name="content"
        )
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Untitled Document',
      require: true,
    },
    artworkPath: {
      type: String,
      default: '/default-artist.png',
      require: false,
    },
    date: {
      type: [Date, String],
      default: null,
      require: false,
    },
  },
  computed: {
    formattedDate() {
      if (this.date) {
        return new Date(this.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      } else {
        return this.date
      }
    },
  },
}
</script>
