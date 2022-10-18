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
          class="aspect-w-12 aspect-h-5 lg:aspect-w-12 md:aspect-w-12"
        )
          nuxt-img(
          src="/soulection/home/_GXV4316.jpeg"
          class="rounded-xl md:rounded-xl w-full h-[200px] inline-block object-contain"
          width="1536"
          fit="contain"
          provider="twicpics"
          )
          //- video(
          //-   :src="youTubeEmbeddedURI"
          //-   frameborder="0"
          //-   autoplay
          //-   muted
          //-   loop
          //-   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          //-   allowfullscreen
          //-   class="rounded-xl md:rounded-2xl"
          //- )
      div(
        class="lg:w-2/5 lg:order-1 flex flex-col justify-end"
      )
        div(
          class="font-bold font-header uppercase md:whitespace-nowrap z-10 mt-4"
        )
          nuxt-link(
            class="flex flex-col items-start md:flex-row md:items-center justify-start mb-12"
            to="https://soulection.supply/"
          )
          span(
            class="block text-sm md:text-2xl"
          ) Welcome
          span(
            class="block text-xl md:text-4xl md:mb-10 lg:mb-10"
          ) To The Sound of Tomorrow
          span(
              class="text-sm pr-4 invisible sm:visible md:visible"
            ) 
          span(
              class="pr-4 text-sm break-normal invisible sm:visible md:visible"
            ) 
            //- SiteIconButton(
            //-   icon="arrow-right"
            //-   class="hidden md:block p-2 border-opacity-25 dark:border-opacity-25 self-center lg:self-start w-12 h-12 min-h-12 min-w-12 max-w-12 max-h-12"
            //- )

        //- SiteIconButton(
        //-   icon="arrow-down"
        //-   class="mt-8 p-2 border-opacity-25 dark:border-opacity-25 self-center lg:self-start w-12 h-12 min-h-12 min-w-12 max-w-12 max-h-12"
        //- )
    div(
      class="container mx-auto p-4 grid gap-2 md:gap-8 grid-cols-5 justify-items-center items-center"
    )
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
      youtubeID: 'rioXaDvRDe8',
      images: [
        // '/soulection/home/100295100014.jpg',
        // '/soulection/home/100295110010 copy.jpg',
        // '/soulection/home/phabo-soulquarus/Phabo2021-107.jpg',
        // '/soulection/home/phabo-soulquarus/Phabo2021-61.jpg',
        // '/soulection/home/phabo-soulquarus/Phabo2021-98.jpg',
        // '/soulection/home/phabo-soulquarus/Phabo2021-24.jpg',
        // '/soulection/home/phabo-soulquarus/Phabo2021-90.jpg',
        '/soulection/home/phabo-soulquarus-merch/000021970006.jpg',
        '/soulection/home/phabo-soulquarus-merch/000021960026.jpg',
        '/soulection/home/phabo-soulquarus-merch/000021960039.jpg',
        '/soulection/home/phabo-soulquarus-merch/000021980033.jpg',
        '/soulection/home/phabo-soulquarus-merch/000021960025.jpg',
      ],
    }
  },
  computed: {
    youTubeEmbeddedURI() {
      return `https://soulhomepage.s3.us-west-1.amazonaws.com/BrooklynMirage.mp4`
    },
  },
}
</script>
