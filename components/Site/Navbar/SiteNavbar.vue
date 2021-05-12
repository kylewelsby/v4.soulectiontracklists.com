<template lang="pug">
  header(
    class="site-navbar w-full text-black dark:text-white"
  )
    div(
      class="container mx-auto flex flex-row items-center py-5 px-4 md:px-2"
    )
      nav(
        class="md:opacity-100 md:pointer-events-auto flex-1 fixed md:static flex inset-0 flex-col md:flex-row md:flex z-50 transition duration-150 ease-in-out"
        :class="{'bg-white dark:bg-[#6F8872] opacity-100 pointer-events-auto': state === 'opened', 'opacity-0 pointer-events-none': state === 'closed'}"
        @click.stop="close()"
      )
        SiteNavItem(
          to="/"
        ) Home
        SiteNavItem(
          to="/records/"
        ) Records
        SiteNavItem(
          to="/tracklists/"
        ) Tracklists
        SiteNavItem(
          href="https://soulection.supply/"
        ) Supply
        SiteNavItem(
          to="/about/"
        ) About
        //- SiteNavItem(
        //-   to="/contact/"
        //- ) Contact
      SiteBrand
      div(
        class="flex-1 flex justify-end"
      )
        SiteNavSearch()
        SiteIconButton(
          icon="menu"
          class="md:hidden p-1 border-opacity-25 dark:border-opacity-25"
          @click="toggle()"
        )
</template>
<script>
export default {
  data() {
    return {
      state: 'closed',
    }
  },
  methods: {
    toggle() {
      if (this.state === 'closed') {
        this.state = 'opened'
      } else {
        this.state = 'closed'
      }
    },
    close() {
      this.state = 'closed'
    },
  },
}
</script>
