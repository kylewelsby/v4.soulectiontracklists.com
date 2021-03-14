<template lang="pug">
  div(
    class="flex flex-column"
  )
    span(
      class="text-white font-bold"
    ) {{ title }}
    span(
      class="mx-2"
    ) by
    span(
      class="underline text-white font-bold"
    ) {{ artist }}
</template>
<script>
export default {
  props: {
    artist: {
      type: String,
      default: 'Unknown Artist',
    },
    title: {
      type: String,
      default: 'Untitled Track',
    },
  },
}
</script>
