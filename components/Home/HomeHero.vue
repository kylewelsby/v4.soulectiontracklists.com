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
        class="lg:w-2/5 lg:order-1 flex flex-col justify-center"
      )
        div(
          class="font-bold font-header uppercase z-10 mt-4"
        )
          span(
            class="block text-sm md:text-2xl"
          ) Welcome
          span(
            class="block text-xl md:text-4xl"
          ) To The Sound of Tomorrow
        //- SiteIconButton(
        //-   icon="arrow-right"
        //-   class="mt-8 p-2 border-opacity-25 dark:border-opacity-25 self-center pointer-events-none lg:self-start w-12 h-12 min-h-12 min-w-12 max-w-12 max-h-12"
        //- )
    //- div(
    //-   class="container mx-auto p-4 grid gap-2 md:gap-8 grid-cols-5 justify-items-center items-center"
    //- )
      //- div
      //-   Artwork(
      //-     :src="images[0]"
      //-     :size="300"
      //-     class="w-full"
      //-   )
      //- div
      //-   Artwork(
      //-     :src="images[1]"
      //-     :size="300"
      //-     class="w-full"
      //-   )
      //- div
      //-   Artwork(
      //-     :src="images[2]"
      //-     :size="300"
      //-     class="w-full"
      //-   )
      //- div
      //-   Artwork(
      //-     :src="images[3]"
      //-     :size="300"
      //-     class="w-full"
      //- )
      //- div
      //-   Artwork(
      //-     :src="images[4]"
      //-     :size="300"
      //-     class="w-full"
      //- )
</template>
<script>
export default {
  data() {
    return {
      youtubeID: 'iSfdsK8jKR0',
      images: [
        // '/soulection/home/100295100014.jpg',
        // '/soulection/home/100295110010 copy.jpg',
        '/soulection/home/100295100004.jpg',
        '/soulection/home/100295090005.jpg',
        '/soulection/home/100295090003.jpg',
        '/soulection/home/100295090004-2.jpg',
        '/soulection/home/100295130003.jpg',
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
