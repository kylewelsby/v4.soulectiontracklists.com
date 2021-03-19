<template lang="pug">
  div(
    class="flex flex-shrink-0"
  )
    div(
      class="flex flex-col w-64"
    )
      div(
        class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white"
      )
        div(
          class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto"
        )
          div(
            class="flex items-center flex-shrink-0 px-4"
          )
            SiteBrand
          nav(
            class="mt-5 flex-1 px-2 bg-white space-y-1"
          )
            nuxt-link(
              to="/admin/posts/"
              class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )
              svg(
                class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                x-description="Heroicon name: outline/view-list"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              )
                path(
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                )
              | Posts
            nuxt-link(
              to="/admin/albums/"
              class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )
              svg(
                class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                x-description="Heroicon name: outline/view-list"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              )
                path(
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                )
              | Records
            nuxt-link(
              to="/admin/events/"
              class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )
              svg(
                class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                x-description="Heroicon name: outline/view-list"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              )
                path(
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                )
              | Events
            nuxt-link(
              to="/admin/shows/"
              class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )
              svg(
                class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                x-description="Heroicon name: outline/view-list"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              )
                path(
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                )
              | Tracklists
        div(
          class="flex-shrink-0 flex border-t border-gray-200 p-4"
        )
          nuxt-link(
            to="/"
            class="flex-shrink-0 w-full group block"
          )
            | Logout
</template>
