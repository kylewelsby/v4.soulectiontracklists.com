<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
    )
      div(
        class="flex flex-row flex-wrap items-center"
      )
        h2(
          class="text-3xl flex-grow font-bold"
        ) New Releases
        div(
          class="order-3 w-full md:w-auto md:order-none text-sm"
        )
          span 01
          span(
            class="mx-2 text-gray-400"
          ) /
          span(
            class="text-gray-400"
          ) 04
        div(

        )
          button(
            class="ml-4"
          ) ⬅
          button(
            class="ml-4"
          ) ➡
      div(
        class="mt-4 flex flex-col md:flex-row md:items-center"
      )
        div(
          class="md:w-1/2 lg:w-auto md:mr-4"
        )
          Artwork(
            src="https://scontent-lht6-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.90.720.720a/s640x640/156563063_460987381747619_3544166675853617933_n.jpg?tp=1&_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_cat=111&_nc_ohc=tSVol6ED1LkAX_Uo1XS&ccb=7-4&oh=d2bbde61a5d835d09c0467eaf453d749&oe=60549816"
            :size="512"
            provider="static"
            class="shadow-lg rounded-2xl"
          )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-col items-start"
        )
          h5(
            class="mb-1 text-xl"
          ) Sango
          h4(
            class="mb-1 font-bold text-2xl"
          ) Da Rocinha 4 Vinyl (pre-order)
          div(
            class="mb-3 font-light text-gray-400"
          ) Only available March 5 - 12
          nuxt-link(
            to="/"
            class="bg-black rounded-full text-white px-10 py-2 font-medium text-l flex flex-row"
          ) Pre-Order


</template>
