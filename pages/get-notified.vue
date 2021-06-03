<template lang="pug">
  div(
    class="container mx-auto px-4 flex flex-col items-center mt-10"
  )
    h1(
      class="font-header uppercase text-3xl md:text-4xl"
    ) Newsletter
    div(
      class="md:w-2/3 lg:w-1/2 my-10 flex flex-col justify-center md:flex-row items-center"
    )
      form(
        @submit.prevent="subscribe()"
        class=" md:mr-4 text-sm"
      )
        h3(
          class="text-xl font-medium"
        ) Email Address
        p(
          class="text-sm"
        ) Receive updated on new music, tracklists, Soulection Supply, and events.
        input(
          v-model="email"
          class="my-4 h-8 block w-full bg-transparent px-4 text-gray-900 dark:text-white placeholder-opacity-50 placeholder-black dark:placeholder-opacity-50 dark:placeholder-black dark:placeholder-white focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:focus:border-white dark:focus:border-opacity-50 dark:focus:ring-white sm:text-sm rounded-full border border-black border-opacity-25 dark:border-white dark:border-opacity-25"
          placeholder="Email address"
        )

        //- h4(
        //-   class="text-lg font-medium"
        //- ) What would you like to receive?

        //- div(
        //-   class="flex flex-col my-4"
        //- )
        //-   div(
        //-     class="block"
        //-   )
        //-     input(
        //-       type="checkbox"
        //-       id="email-newsletter"
        //-       name="email-newsletter"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-newsletter"
        //-       class="ml-2"
        //-     ) Soulection Newsletter

        //-   div
        //-     input(
        //-       type="checkbox"
        //-       id="email-tracklists"
        //-       name="email-tracklists"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-tracklists"
        //-       class="ml-2"
        //-     ) Soulection Radio Shows &amp; Tracklists

        //-   div
        //-     input(
        //-       type="checkbox"
        //-       id="email-supply"
        //-       name="email-supply"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-supply"
        //-       class="ml-2"
        //-     ) Soulection Supply
        //-   div
        //-     input(
        //-       type="checkbox"
        //-       id="email-events"
        //-       name="email-events"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-events"
        //-       class="ml-2"
        //-     ) Soulection Events (live streams, shows, etc)

        SiteButton(
          href="https://soulection.squarespace.com/signup"
          type="button"
          class="mt-6"
        ) Subscribe
      div(
        class="mt-10 md:mt-0"
      )

        Artwork(
          src="/soulection/home/imgonline-com-ua-compressed-3PgQJJjZn58Xt_3350x.jpg"
          :size="512"
        )
    //- form(
    //-   class="mt-8 sm:flex"
    //-   @submit="join()"
    //- )
    //-   label(
    //-     for="emailAddress"
    //-     class="sr-only"
    //-   ) Email address

    //-   input(
    //-     name="emailAddress"
    //-     id="emailAddress"
    //-     required
    //-     type="email"
    //-     v-model="email"
    //-     placeholder="Email address"
    //-     class="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:placeholder-gray-400 sm:max-w-xs"
    //-   )
    //-   div(
    //-     class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0"
    //-   )
    //-     button(
    //-       type="submit"
    //-       class="w-full bg-gray-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    //-     ) Subscribe

    //- small(
    //-   class="mt-8"
    //- )
    //-   | Notifications mostly once per week.
    //- small(
    //-   class="mt-4"
    //- )
    //-   | This
    //-   |
    //-   em will not
    //-   |
    //-   | subscribe you to the Soulection Newsletter, consider joining the
    //-   |
    //-   a(
    //-     href="https://soulection.com/signup/"
    //-     target="_blank"
    //-     class="underline"
    //-   ) Officail Soulection Newsletter
    //-   |
    //-   | as well.
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  head() {
    return {
      title: 'Contact',
    }
  },
  methods: {
    async subscribe() {
      // some logic to add to email service
    },
  },
}
</script>
