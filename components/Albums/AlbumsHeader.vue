<template lang="pug">
  div(
    class="grid grid-cols-2 gap-8 items-center"
  )
    Artwork(
      :src="album.artwork"
      :size="327"
      class="max-w-[327px] shadow-lg"
    )
    div(
      class="max-w-[327px] flex flex-col items-start"
    )
      h1(
        class="text-4xl font-bold"
      ) {{ album.title }}
      h2(
        class="text-2xl font-medium"
      ) {{ album.artist.title }}
      div(
        class="flex flex-row items-center"
      )
        | EP
        svg(
          viewBox="0 0 4 5"
          class="w-1.5 h-1.5 fill-current mx-1.5"
        )
          circle(
            cx="2" cy="2.5" r="2"
          )
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
