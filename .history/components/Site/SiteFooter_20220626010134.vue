<template lang="pug">
  footer(
    class="site-footer flex flex-col items-center pb-20"
  )
    div(
      class="container mx-auto p-4"
    )
      SiteSocials
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
          SiteButton(
            to="/get-notified/"
          ) Email updates
      div(
        class="flex flex-row mt-3"
      )
        div(
          class="flex flex-col flex-grow items-start"
        )
          nuxt-link(
            class="py-1 text-sm"
            to="/tracklists/"
          ) Radio
          nuxt-link(
            class="py-1 text-sm"
            to="/records/"
          ) Records
          a(
            class="py-1 text-sm"
            href="https://soulection.supply/"
            target="_blank"
            rel="noopener"
          ) Supply
          //- nuxt-link(
          //-   class="py-1 text-sm"
          //-   to="/events/"
          //- ) Events
        div(
          class="flex flex-col flex-grow items-end"
        )
          //- nuxt-link(
          //-   class="py-1 text-sm"
          //-   to="/signup/"
          //- ) Receive Email Updates
          //- nuxt-link(
          //-   class="py-1 text-sm"
          //-   to="/tracks/"
          //- ) All Tracks Played
          nuxt-link(
            class="py-1 text-sm"
            to="/about/"
          ) About
          nuxt-link(
            class="py-1 text-sm"
            to="/contact/"
          ) Contact
      p(
        class="mt-6 text-gray-500 text-sm"
      )
        | Designed by
        |
        a(
          class="underline"
          href="https://dorianlromero.com?source=soulection.com"
        ) Dorian Levi Romero,
        |
        | Developed and maintained independently by
        |
        a(
          class="underline"
          href="https://mekyle.com?source=soulection.com"
        ) Kyle Welsby
        | .
      p(
        class="mt-6 text-gray-500 text-sm"
      )
        | Officially affiliated with
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
          to="/privacy-policy"
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
      p(
        class="mt-6 text-gray-500 text-xs text-center"
      )
        nuxt-link(
          to="/privacy-policy/"
          class="mr-2 underline"
        ) Privacy Policy
        nuxt-link(
          to="/cookie-policy/"
          class="underline"
        ) Cookie Policy
      p(
        class="mt-6 text-gray-500 text-xs text-center"
      ) Soulection 2022
</template>
