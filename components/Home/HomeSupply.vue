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
        ) Supply
        a(
          href="https://soulection.supply"
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
      ) Shop exclusive clothing, accessories, music and more.
      div(
        class="mt-4 flex flex-col md:flex-row md:items-center"
      )
        a(
          class="md:w-1/2 lg:w-auto text-center md:text-left md:mr-4"
          href="https://soulection.supply"
          rel="noopener"
          target="_blank"
        )
          Artwork(
            :src="latestItem.artwork"
            :size="360"
            class="shadow-lg rounded-2xl"
          )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-col items-start"
        )
          h4(
            class="mb-4 font-bold text-2xl"
          ) {{ latestItem.title }}
              div(
              class="text-gray-400 text-sm font-light"
              ) For early access to future Soulection Supply releases + more
          //- div(
          //-   class="mb-3 font-light text-gray-400"
          //- ) {{ formattedDate }}
          SiteButton(
            href="https://soulection.superphone.io/f/M2D6Szgv"
          ) Join Our Phonebook
</template>
<script>
export default {
  props: {
    latestItem: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    formattedDate() {
      if (this.latestItem.published_at) {
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
        }).format(Date.parse(this.latestItem.published_at))
      } else {
        return 'INVALID DATE'
      }
    },
  },
}
</script>
