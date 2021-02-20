<template lang="pug">
  div(
    class="flex flex-col items-center my-20 px-4 text-center"
  )
    h1(
      class="text-3xl font-extrabold tracking-tight sm:text-4xl"
    ) Get notified when the latest Tracklist is published.
    p(
      class="mt-4"
    ) Enter your email address below to receive a instant notification when a new tracklist is published.

    form(
      class="mt-8 sm:flex"
      @submit="join()"
    )
      label(
        for="emailAddress"
        class="sr-only"
      ) Email address

      input(
        name="emailAddress"
        id="emailAddress"
        required
        type="email"
        v-model="email"
        placeholder="Email address"
        class="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:placeholder-gray-400 sm:max-w-xs"
      )
      div(
        class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0"
      )
        button(
          type="submit"
          class="w-full bg-gray-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        ) Subscribe

    small(
      class="mt-8"
    )
      | Notifications mostly once per week.
    small(
      class="mt-4"
    )
      | This
      |
      em will not
      |
      | subscribe you to the Soulection Newsletter, consider joining the
      |
      a(
        href="https://soulection.com/signup/"
        target="_blank"
        class="underline"
      ) Officail Soulection Newsletter
      |
      | as well.
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    join() {},
  },
}
</script>
