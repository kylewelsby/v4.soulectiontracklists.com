<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="container mx-auto p-4 py-8 flex flex-col lg:flex-row"
    )
      div(
        class="lg:w-3/5 lg:order-2"
      )
        div(
          class="aspect-w-16 aspect-h-9"
        )
          iframe(
            :src="youTubeEmbeddedURI"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="rounded-xl md:rounded-2xl"
          )
      div(
        class="lg:w-2/5 lg:order-1 flex flex-col justify-end"
      )
        div(
          class="font-bold font-header uppercase md:whitespace-nowrap z-10 mt-4"
        )
          nuxt-link(
            class="flex flex-col items-start md:flex-row md:items-center justify-start mb-12"
            to="/records/1-p4CWiHA4k/"
          )
            span(
              class="text-sm pr-4"
            ) New Release:
            span(
              class="pr-4 text-xl"
            ) Phabo - Soulquarius
            SiteIconButton(
              icon="arrow-right"
              class="hidden md:block p-2 border-opacity-25 dark:border-opacity-25 self-center lg:self-start w-12 h-12 min-h-12 min-w-12 max-w-12 max-h-12"
            )
          span(
            class="block text-sm md:text-2xl"
          ) Welcome
          span(
            class="block text-xl md:text-4xl"
          ) To The Sound of Tomorrow
        SiteIconButton(
          icon="arrow-down"
          class="mt-8 p-2 border-opacity-25 dark:border-opacity-25 self-center lg:self-start w-12 h-12 min-h-12 min-w-12 max-w-12 max-h-12"
        )
    div(
      class="container mx-auto p-4 grid gap-2 md:gap-8 grid-cols-5 justify-items-center items-center"
    )
      div
        Artwork(
          :src="images[0]"
          :size="300"
          class="w-full"
        )
      div
        Artwork(
          :src="images[1]"
          :size="300"
          class="w-full"
        )
      div
        Artwork(
          :src="images[2]"
          :size="300"
          class="w-full"
        )
      div
        Artwork(
          :src="images[3]"
          :size="300"
          class="w-full"
      )
      div
        Artwork(
          :src="images[4]"
          :size="300"
          class="w-full"
      )
</template>
<script>
export default {
  data() {
    return {
      youtubeID: 'b9I_HXC7JBA',
      images: [
        // '/soulection/home/100295100014.jpg',
        // '/soulection/home/100295110010 copy.jpg',
        '/soulection/home/phabo-soulquarus/Phabo2021-107.jpg',
        '/soulection/home/phabo-soulquarus/Phabo2021-61.jpg',
        '/soulection/home/phabo-soulquarus/Phabo2021-98.jpg',
        '/soulection/home/phabo-soulquarus/Phabo2021-24.jpg',
        '/soulection/home/phabo-soulquarus/Phabo2021-90.jpg',
      ],
    }
  },
  computed: {
    youTubeEmbeddedURI() {
      return `https://www.youtube-nocookie.com/embed/${this.youtubeID}?playlist=${this.youtubeID}&modestbranding=1&controls=1&autoplay=1&loop=1&mute=1`
    },
  },
}
</script>
