<template lang="pug">
  nuxt-link(
    :to="`/records/${album.id}/`"
    class="flex flex-col items-start"
  )
    Artwork(
      :src="album.artwork"
      :size="448"
      :dpr="2"
      class="shadow-lg rounded-2xl"
    )
    h2(
      class="mt-4 text-2xl font-bold tracking-tight"
    ) {{ album.title }}
    h3(
      class="text-1xl font-medium tracking-wide"
    ) {{ album.artist.title }}
    div(
      class="mt-2 text-sm font-light whitespace-nowrap text-opacity-50 text-black dark:text-opacity-50 dark:text-white"
    )
      //- | {{ albumType }}
      //- | &middot;
      | {{ album.published_at | formattedDate }}
</template>
<script>
export default {
  props: {
    album: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    albumType() {
      return 'Album'
    },
  },
}
</script>
