<template lang="pug">
  SiteSubNav(
    :title="title"
  )
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Soulection Live',
    },
  },
}
</script>
