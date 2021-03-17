<template lang="pug">
  div(
    class="flex flex-col items-center bg-home-records-hero"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
    )
      div(
        class="flex flex-row flex-wrap items-center"
      )
        h2(
          class="text-3xl flex-grow font-bold"
        ) Records
        nuxt-link(
          to="/records/"
          class="border border-gray-400 rounded-full px-8 py-2 flex flex-row items-center"
        )
          | All
          svg(
            viewBox="0 0 16 17"
            fill="none"
            class="ml-2 w-5"
          )
            path(
              d="M2 8.5h12M10 12.5l4-4-4-4"
              stroke="#000"
              stroke-linecap="round"
            )
      div(
        class="text-gray-400 text-sm font-light"
      ) Listen to singles, albums, playlists, and compilations releaced by Soulection.
      div(
        class="mt-4 flex flex-col md:flex-row md:items-center"
      )
        div(
          class="md:w-1/2 lg:w-auto md:mr-4"
        )
          Artwork(
            src="https://i1.sndcdn.com/artworks-fcmS3RFt5C3lT5UN-OyyHUw-t500x500.jpg"
            :size="512"
            provider="static"
            class="shadow-lg rounded-2xl"
          )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-row md:flex-col items-start"
        )
          button(
            class="order-2 shadow-md rounded-full mb-2 ml-4 md:ml-0"
          )
            svg(
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 57 57"
              class="fill-current w-12 h-12"
            )
              path(
                fill-rule="nonzero"
                d="M28.525.416c15.464 0 28 12.536 28 28s-12.536 28-28 28-28-12.536-28-28 12.536-28 28-28zm-5.687 16.633a.875.875 0 00-1.313.758v21.218a.875.875 0 001.313.758l18.375-10.61a.875.875 0 000-1.515z"
              )
          div(
            class="order-1 flex-grow"
          )
            h5(
              class="mb-1 text-xl"
            ) Elujay &amp; J.Robb
            h4(
              class="mb-1 font-bold text-2xl"
            ) GEMS IN THE CORNERSTORE
            div(
              class="mb-3 font-light text-gray-400"
            ) December 3, 2020
</template>
