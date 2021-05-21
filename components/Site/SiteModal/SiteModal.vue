<template lang="pug">
  transition(
    leave-active-class="duration-300"
  )
    div(
      v-show="show"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="thank-you" role="dialog" aria-modal="true"
    )
      div(
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      )
        transition(name="ease-out-overlay")
          div(
            v-show="show"
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          )
        span(
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ) &#8203;
        transition(name="ease-out-modal")
          div(
            v-show="show"
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          )
            div
              div(
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
              )
                SiteIcon(
                  class="h-8 w-8 text-red-600"
                  icon="heart"
                )
              div(
                class="mt-3 text-center sm:mt-5"
              )
                h3(
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="thank-you"
                ) Thank you
                div(
                  class="mt-2"
                )
                  p(
                    class="text-sm text-gray-500"
                  ) You're supporting artists and producers by discovering their music.
                  p(
                    class="text-xs text-gray-500 mt-8"
                  )
                    | Tracklist links and hosting of this website are maintained independently by
                    |
                    a(
                      href="https://mekyle.com/"
                      class="dark:underline"
                    ) Kyle Welsby
                    | .
                  p(
                    class="text-xs text-gray-500 mt-4"
                  )
                    | Feel free to share some love for the countless hours and dedication to the Soulection Tracklists.
                  div(
                    class="flex flex-row mt-4 justify-center items-center"
                  )
                    SiteButton(
                      href="https://ko-fi.com/A3403WZD"
                      rel="noopener"
                      target="_blank"
                      class="dark:bg-gray-100 mr-1 text-xs"
                    ) Buy Kyle a Coffee
                    SiteButton(
                      href="https://www.patreon.com/soulectiontracklists?u=11043753&redirect_uri=%2fstats%2f&utm_medium=widget"
                      rel="noopener"
                      target="_blank"
                      class="dark:bg-gray-100 ml-1 text-xs"
                    ) Become a Patron
              div(
                class="mt-3 sm:mt-6 flex flex-row justify-center items-center"
              )
                SiteButton(
                  @click.prevent="close()"
                  class="border-2"
                ) Close
</template>
<script>
export default {
  computed: {
    show() {
      return this.$store.state.supportModal === true
    },
  },
  methods: {
    close() {
      this.$store.commit('CLOSE_SUPPORT_MODAL')
    },
  },
}
</script>
