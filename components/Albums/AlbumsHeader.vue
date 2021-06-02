<template lang="pug">
  div(
    class="mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
  )
    div(
      class="flex justify-center md:justify-end"
    )
      Artwork(
        :src="album.artwork"
        :size="425"
        class="shadow-lg"
      )
    div(
      class="flex flex-col items-start"
    )
      h1(
        class="text-4xl font-bold"
      ) {{ album.title }}
      nuxt-link(
        class="text-2xl font-medium my-2"
        :to="`/artists/${album.artist.id}`"
      ) {{ album.artist.title }}
      div(
        class="flex flex-row items-center text-opacity-50 text-black dark:text-opacity-50 dark:text-white"
      )
        //- | EP
        //- svg(
        //-   viewBox="0 0 4 5"
        //-   class="w-1.5 h-1.5 fill-current mx-1.5"
        //- )
        //-   circle(
        //-     cx="2" cy="2.5" r="2"
        //-   )
        | {{ album.published_at | formattedDate }}
</template>
<script>
export default {
  props: {
    album: {
      type: Object,
      default: () => {},
    },
    artworkPath: {
      type: [String, null, undefined],
      default: undefined,
    },
  },
}
</script>
