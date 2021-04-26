<template lang="pug">
  form(
    class="mr-2"
    @submit.prevent="onSubmit()"
  )
    SiteIconButton(
      icon="search"
      class="md:hidden border-opacity-25 dark:border-opacity-25"
      @click="toggle()"
    )
    div(
      class="md:block inset-0 bg-opacity-50 z-50 transition duration-150 ease-in-out"
      :class="{'block fixed bg-black': state === 'opened', 'hidden': state === 'closed'}"
      @click="close()"

    )
      div(
        class="relative rounded-full bg-white md:bg-transparent text-black sm:dark:text-white m-4 sm:m-0"
        @click.stop
      )
        input(
          @keydown.esc="close()"
          type="search"
          ref="search"
          v-model="query"
          placeholder="Search"
          class="h-8 block w-full bg-transparent pr-10 text-gray-900 sm:dark:text-white placeholder-opacity-50 placeholder-black dark:placeholder-opacity-50 dark:placeholder-black sm:dark:placeholder-white focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:focus:border-white dark:focus:border-opacity-50 dark:focus:ring-white sm:text-sm rounded-full border border-black border-opacity-25 dark:border-white dark:border-opacity-25"
        )
        button(
          type="submit"
          class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        )
          SiteIcon(
            icon="search"
            class="w-5 h-5"
          )

</template>
<script>
export default {
  data() {
    return {
      state: 'closed',
      query: '',
    }
  },
  watch: {
    state(val) {
      if (val === 'opened') {
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      }
    },
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
    onSubmit() {
      this.$router.push({
        path: '/tracks/lookup/',
        query: {
          q: this.query,
        },
      })
      this.close()
    },
  },
}
</script>
