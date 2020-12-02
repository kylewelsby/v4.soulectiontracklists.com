<template>
  <div class="relative antialiased text-gray-900">
    <SiteHeader />
    <Nuxt />
    <Player />
  </div>
</template>
<script>
import SiteHeader from '~/components/SiteHeader'
import Player from '~/components/Player'
export default {
  components: {
    SiteHeader,
    Player,
  },
}
</script>
<style>
.nuxt-content p {
  @apply py-2;
}
.nuxt-content a {
  @apply underline;
}
</style>
