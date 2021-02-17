<template lang="pug">
  footer(
    class="site-footer bg-white flex flex-col items-center"
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
          a(
            class="py-1 text-sm"
            to="https://soulection.com/events/"
          ) Soulection Events
          a(
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
          a(
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
        | . Officially affiliated with
        |
        a(
          class="underline"
          href="https://soulection.com"
        ) Soulection LLC
        | , and some music services that offer affiliation programmes.
      p(
        class="mt-6 text-gray-500 text-sm"
      )
        | Except where otherwise
        |
        nuxt-link(
          class="underline"
          to="/policies"
        ) noted
        | ,
        | content on this site is licensed under a
        |
        a(
          class="underline"
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        ) Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
        | .
</template>
