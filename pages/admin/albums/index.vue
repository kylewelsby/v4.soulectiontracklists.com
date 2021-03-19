<template lang="pug">
  div(
    class="py-8"
  )
    div(
      class="px-4 sm:px-6 md:px-0 sm:flex sm:items-center sm:justify-between"
    )
      h1(
        class="text-2xl font-semibold text-gray-900"
      ) Records &amp; Albums
      div(
        class="mt-3 sm:mt-0 sm:ml-4"
      )
        nuxt-link(
          to="/admin/albums/new/"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ) Create new album
    div(
      class="px-4 sm:px-6 md:px-0"
    )
      div(
        class="py-4"
      )
        div(
          class="shadow overflow-hidden border border-gray-100 sm:rounded-lg"
        )
          table(
            class="min-w-full divide-y divide-gray-200"
          )
            thead(
              class="bg-gray-50"
            )
              tr
                th(
                  scope="col"
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                ) Title
                th(
                  scope="col"
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                ) State
                th(
                  scope="col"
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                ) Release Date
            tbody(
              class="bg-white divide-y divide-gray-200"
            )
              tr(
                v-for="album in data"
                :key="album.id"
              )
                td(
                  class="px-6 py-4 whitespace-nowrap"
                )
                  nuxt-link(
                    :to="`/admin/albums/${album.id}/`"
                    class="flex items-center"
                  )
                    div(
                      class="flex-shrink-0 h-10 w-10"
                    )
                      Artwork(
                        :src="album.artwork"
                        :size="52"
                      )
                    div(
                      class="ml-4"
                    )
                      div(
                        class="text-sm font-medium text-gray-900"
                      ) {{ album.title }}
                      div(
                        class="text-sm text-gray-500"
                      ) {{ album.artist.title }}
                td(
                  class="px-6 py-4 whitespace-nowrap"
                )
                  span(
                    class="inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium bg-green-100 text-green-800"
                  ) Published
                td(
                  class="px-6 py-4 whitespace-nowrap"
                ) {{ album.published_at | formattedDate }}

</template>

<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  async asyncData({ $supabase, error }) {
    const { data, error: err } = await $supabase
      .from('albums')
      .select('*,artist(*)')
      .order('published_at', { ascending: false })
    if (err) {
      error({ statusCode: 500, err })
    }
    return { data }
  },
}
</script>
