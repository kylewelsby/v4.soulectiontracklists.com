<template lang="pug">
  SiteSubNav(
    title="Tracklists"
  )
    SiteSubNavLink(
      to="/tracklists/"
    ) All
    SiteSubNavLink(
      v-for="key of tags"
      :to="`/tracklists/t/${key}/`"
      :key="key"
    ) {{ $tc(`filter.types.${key}`, counts[key]) }}
</template>
<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    counts: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
