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
        class="mr-4 w-10 max-w-10 h-10 max-h-10"
        :filled="true"
        :href="links.appleMusic"
        v-if="links.appleMusic"
      )
      SiteIconButton(
        icon="soundcloud"
        class="mr-4 w-10 max-w-10 h-10 max-h-10"
        :filled="true"
        :href="links.soundcloud"
        v-if="links.soundcloud"
      )
      SiteIconButton(
        icon="mixcloud"
        class="mr-4 w-10 max-w-10 h-10 max-h-10"
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
