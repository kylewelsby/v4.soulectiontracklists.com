<template lang="pug">
  a(
    href="https://soulection.com"
    class="site-brand flex flex-row items-center font-semibold"
  )
    SoulectionIcon(
      class="w-10 fill-current"
    )
    //- span Soulection
    //- span Tracklists
</template>
<script>
import SoulectionIcon from '~/assets/soulection-icon.svg?inline'
export default {
  components: {
    SoulectionIcon,
  },
}
</script>
