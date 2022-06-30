<template lang="pug">
  div(
    v-if="latestAlbum"
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
        ) Records
        nuxt-link(
          to="/records/"
          class="border border-gray-400 rounded-full px-2 md:px-8 py-2 flex flex-row items-center"
        )
          span(
            class="hidden md:inline mr-2"
          ) All Records
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
      ) Listen to singles, albums, playlists, and compilations released by Soulection.
      div(
        class="mt-4 flex flex-col md:flex-row md:items-center"
      )
      //- div(
      //-   class="lg:w-1/5 lg:order-2"
      //- )
      //-   div(
      //-     class="aspect-w-16 aspect-h-9"
      //-   )
      //-     iframe(
      //-       :src="youTubeEmbeddedURI"
      //-       frameborder="0"
      //-       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //-       allowfullscreen
      //-       class="rounded-xl md:rounded-2xl"
      //-     )
        div(
          class="md:w-1/2 text-center md:text-left lg:w-auto md:mr-4"
        )
          nuxt-link(
            :to="albumPath"
          )
            Artwork(
              :src="latestAlbum.artwork"
              :size="360"
              class="shadow-lg rounded-2xl"
            )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-row md:flex-col items-start"
        )
          nuxt-link(
            class="order-2 shadow-md rounded-full mb-2 ml-4 md:ml-0"
            :to="albumPath"
          )
            svg(
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 57 57"
              class="fill-current w-12 h-12"
            )
              path(
                fill-rule="nonzero"
                d="M28.525.416c15.464 0 28 12.536 28 28s-12.536 28-28 28-28-12.536-28-28 12.536-28 28-28zm-5.687 16.633a.875.875 0 00-1.313.758v21.218a.875.875 0 001.313.758l18.375-10.61a.875.875 0 000-1.515z"
              )
          div(
            class="order-1 flex-grow"
          )
            nuxt-link(
              :to="albumPath"
              class="block mb-1 font-bold text-2xl"
            ) {{ latestAlbum.title }}
            nuxt-link(
              class="block mb-1 text-xl"
              :to="artistPath"
            ) {{ latestAlbum.artist.title }}
            div(
              class="mb-3 font-light text-gray-400"
            ) {{ formattedDate }}

</template>
<script>
export default {
  data() {
    return {
      youtubeID: 'M-GDgu7htKU',
    }
  },
  props: {
    latestAlbum: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    youTubeEmbeddedURI() {
      return `https://www.youtube-nocookie.com/embed/${this.youtubeID}?playlist=${this.youtubeID}&modestbranding=1&controls=1&autoplay=1&loop=1&mute=1`
    },
    formattedDate() {
      if (this.latestAlbum.published_at) {
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
        }).format(Date.parse(this.latestAlbum.published_at))
      } else {
        return 'INVALID DATE'
      }
    },
    albumPath() {
      if (this.latestAlbum && this.latestAlbum.id) {
        return `/records/${this.latestAlbum.id}/`
      } else {
        return ''
      }
    },
    artistPath() {
      if (this.latestAlbum.artist) {
        return `/artists/${this.latestAlbum.artist.id}/`
      } else {
        return ''
      }
    },
  },
}
</script>
