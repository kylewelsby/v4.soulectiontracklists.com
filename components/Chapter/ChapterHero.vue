<template lang="pug">
  div(
    class="p-4 flex flex-col items-start lg:flex-row lg:items-center"
  )
    Artwork(
      v-if="chapter.artwork"
      :src="chapter.artwork"
      :size="128"
      class="mb-8 lg:mb-0 lg:mr-10"
    )
    div
      h4(
        class="text-2xl font-medium"
      ) {{ chapter.title }}
      div(
        class="flex flex-row mt-8"
        v-if="chapter.links"
      )
        SiteButton(
          v-if="chapter.links && chapter.links.appleMusic"
          :href="chapter.links.appleMusic"
          class="mr-4"
        ) Listen on Apple Music
        SiteButton(
          v-if="chapter.links && chapter.links.soundcloud"
          :href="chapter.links.soundcloud"
          class="mr-4"
        ) Listen on SoundCloud
        SiteButton(
          v-if="chapter.links && chapter.links.mixcloud"
          :href="chapter.links.mixcloud"
          class="mr-4"
        ) Listen on Mixcloud
      div(
        v-if="chapter.content"
        class="mt-4"
        v-html="$md.render(chapter.content)"
      )

</template>
<script>
export default {
  props: {
    chapter: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
}
</script>
