<template lang="pug">
  div(
    class="flex flex-col items-center py-20"
  )
    div(
      class="px-4 container mx-auto text-center"
    )
      h1(
        class="text-3xl font-bold mb-4"
      ) Search Unavailable
      p(
        class="text-lg opacity-75"
      ) Search is no longer available. Browse our tracklists, artists, and records using the navigation above.
</template>
<script>
export default {
  name: 'SoulectionSearch',
  head() {
    return {
      title: 'Search',
    }
  },
}
</script>
