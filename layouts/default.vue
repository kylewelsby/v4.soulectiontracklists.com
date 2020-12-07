<template>
  <div class="relative antialiased text-gray-900">
    <SiteHeader />
    <Nuxt />
    <Player />
  </div>
</template>
<script>
export default {}
</script>
<style>
.nuxt-content p {
  @apply py-2;
}
.nuxt-content a {
  @apply underline;
}
</style>
