<template lang="pug">
  div(
    class="flex flex-col items-center bg-home-supply-hero"
  )
    div(
      class="w-full md:w-10/12 p-4 py-8"
    )
      div(
        class="flex flex-row flex-wrap items-center"
      )
        h2(
          class="text-3xl flex-grow font-bold"
        ) Supply
        a(
          href="https://soulection.supply"
          rel="noopener"
          target="_blank"
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
      ) Shop exclusive clothing, accessories, music and more.
      div(
        class="mt-4 flex flex-col md:flex-row md:items-center"
      )
        a(
          class="md:w-1/2 lg:w-auto md:mr-4"
          href="https://soulection.supply"
          rel="noopener"
          target="_blank"
        )
          Artwork(
            src="/soulection/supply/GXV5218_1728x.jpg"
            :size="512"
            class="shadow-lg rounded-2xl"
          )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-col items-start"
        )
          h4(
            class="mb-1 font-bold text-2xl"
          ) Soulection x BBC Collection
          div(
            class="mb-3 font-light text-gray-500"
          ) Feb 19, 2021
          SiteButton(
            href="https://soulection.supply"
          ) Shop
</template>
