<template lang="pug">
  SiteSubNav(
    :title="title"
  )
    SiteSubNavLink(
      to="/records/"
    ) All Releases
    SiteSubNavLink(
      to="/records/t/black-label"
    ) Black Label
    SiteSubNavLink(
      to="/records/t/white-label"
    ) White Label
    SiteSubNavLink(
      to="/records/t/single"
    ) Singles
    SiteSubNavLink(
      to="/records/t/ep"
    ) EP
    SiteSubNavLink(
      to="/records/t/album"
    ) Albums
    SiteSubNavLink(
      to="/records/t/compilation"
    ) Compilations
</template>
<script>
export default {
  computed: {
    title() {
      if (this.$route.params.type) {
        return this.$t(`filter.titles.${this.$route.params.type}`)
      } else {
        return 'Records'
      }
    },
  },
}
</script>
