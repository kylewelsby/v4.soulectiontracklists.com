<template lang="pug">
  div(
    class="antialiased flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8 flex flex-col items-center text-center"
    )
      svg(
        class="w-56 h-56 stroke-current fill-current text-gray-500"
        viewBox="0 0 385 385"
      )
        g(
          fill="none"
          fill-rule="nonzero"
        )
          path( stroke-dasharray="10" d="M192.45225 97C139.6885 97 97 139.73625 97 192.5s42.6885 95.5 95.45225 95.5C245.216 288 288 245.26375 288 192.5S245.216 97 192.45225 97z")
          path( stroke-dasharray="10" stroke-opacity=".8" d="M192.44425 81C130.8405 81 81 130.89625 81 192.5S130.8405 304 192.44425 304 304 254.10375 304 192.5 254.048 81 192.44425 81z")
          path( stroke-dasharray="10" stroke-opacity=".6" d="M192.43625 65C121.9925 65 65 122.05625 65 192.5S121.9925 320 192.43625 320 320 262.94375 320 192.5 262.88 65 192.43625 65z")
          path( stroke-dasharray="10" stroke-opacity=".4" d="M192.42825 49C113.1445 49 49 113.21625 49 192.5S113.1445 336 192.42825 336 336 271.78375 336 192.5 271.712 49 192.42825 49z")
          path( stroke-dasharray="10" stroke-opacity=".2" d="M192.42025 33C104.2965 33 33 104.37625 33 192.5S104.2965 352 192.42025 352C280.544 352 352 280.62375 352 192.5S280.544 33 192.42025 33z")
          path( stroke-dasharray="10" stroke-opacity=".1" d="M192.41225 17C95.4485 17 17 95.53625 17 192.5S95.4485 368 192.41225 368 368 289.46375 368 192.5 289.376 17 192.41225 17z")
          path( stroke-dasharray="10" stroke-opacity=".05" d="M192.40425 1C86.6005 1 1 86.69625 1 192.5S86.6005 384 192.40425 384 384 298.30375 384 192.5 298.208 1 192.40425 1z")
          path(fill="currentColor" d="M192.46025 113C148.5365 113 113 148.57625 113 192.5s35.5365 79.5 79.46025 79.5C236.384 272 272 236.42375 272 192.5S236.384 113 192.46025 113zM192.5 216.35c4.390664 0 7.95 3.559336 7.95 7.95s-3.559336 7.95-7.95 7.95-7.95-3.559336-7.95-7.95 3.559336-7.95 7.95-7.95zm0-63.6c4.390664 0 7.95 3.559336 7.95 7.95v31.8c0 4.390664-3.559336 7.95-7.95 7.95s-7.95-3.559336-7.95-7.95v-31.8c0-4.390664 3.559336-7.95 7.95-7.95z")
      h4(
        class="text-2xl font-bolder"
      ) {{message}}
      div(
        class="my-6"
      )
        nuxt-link(
          to="/"
          class="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        ) Back to homepage

        nuxt-link(
          to="/get-notified/"
          class="ml-2 inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-gray-700 border-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        ) Get notified

      p
        | Want to help fix this issue?
        |
        a(
          href=`mailto:kyle@soulectiontracklists.com?subject=${message}`
          class="underline font-semibold hover:text-blue-800"
        ) Send a email

      div(
        class="mt-8 font-medium text-gray-500 text-sm"
      )
        a(
          :href="$config.links.statusPage"
          target="_blank"
          class="underline hover:text-gray-800"
        ) Soulection Status
        |
        | &mdash;
        |
        a(
          :href="$config.links.discord"
          class="underline hover:text-gray-800"
        ) Soulection Discord

</template>
<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: this.message,
    }
  },
  computed: {
    message() {
      if (this.error.isMissingShow) {
        return 'Sorry to say - this tracklist is not available yet.'
      } else if (this.error.statusCode === 500) {
        return 'We’re sorry - something has gone wrong on our side.'
      } else if (this.error.statusCode === 404) {
        return 'Oops - this page doesn’t exist'
      } else if (this.error.statusCode === 403) {
        return "Errm - you're not authenticated to be here."
      } else {
        return this.error.message
      }
    },
  },
  beforeMount() {
    if (this.error.err) {
      this.$sentry.captureException(this.error.err)
    }
  },
}
</script>
