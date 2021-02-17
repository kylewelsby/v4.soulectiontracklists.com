<template lang="pug">
  footer(
    class="bg-white flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4"
    )
      div(
        class="flex"
      )
        div(
          class="flex-grow"
        )
          SiteBrand
        div(
          class="flex-grow flex flex-col items-end"
        )
          nuxt-link(
            class="bg-black rounded-full text-white px-6 py-2 font-medium text-l flex flex-row"
            to="/donate/"
          ) Donate / Support
      div(
        class="flex flex-row mt-3"
      )
        div(
          class="flex flex-col flex-grow items-start"
        )
          nuxt-link(
            class="py-1 text-sm"
            to="/episodes/"
          ) All Tracklists
          nuxt-link(
            class="py-1 text-sm"
            to="https://soulection.com/events/"
          ) Soulection Events
          nuxt-link(
            class="py-1 text-sm"
            to="https://soulection.com/signup/"
          ) Receive Email Updates
        div(
          class="flex flex-col flex-grow items-end"
        )
          nuxt-link(
            class="py-1 text-sm"
            to="/tracks/"
          ) All Tracks Played
          nuxt-link(
            class="py-1 text-sm"
            to="https://soulection.com/contact/"
          ) Contact
      p(
        class="mt-6 text-gray-500 text-sm"
      )
        | Soulection Tracklists is developed and maintained independently with love by
        |
        a(
          class="underline"
          href="https://mekyle.com"
        ) Kyle Welsby
        |
        | . Officially affiliated with
        |
        a(
          class="underline"
          href="https://soulection.com"
        ) Soulection LLC
        | , and some music services that offer affiliation programmes.
</template>
