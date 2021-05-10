<template lang="pug">
  div
    div(
      class="text-opacity-50"
    ) Listen on
    div(
      class="flex flex-row mt-2"
    )
      SiteIconButton(
        icon="apple-music"
        class="p-2 mr-4 w-12 h-12 min-w-12 min-h-12 max-w-12 h-12 max-h-12"
        :filled="true"
        :href="links.appleMusic"
        v-if="links.appleMusic"
      )
      SiteIconButton(
        icon="soundcloud"
        class="p-2 mr-4 w-12 h-12 min-w-12 min-h-12 max-w-12 h-12 max-h-12"
        :filled="true"
        :href="links.soundcloud"
        v-if="links.soundcloud"
      )
      SiteIconButton(
        icon="mixcloud"
        class="p-2 mr-4 w-12 h-12 min-w-12 min-h-12 max-w-12 h-12 max-h-12"
        :filled="true"
        :href="links.mixcloud"
        v-if="links.mixcloud"
      )
</template>
<script>
export default {
  props: {
    links: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
