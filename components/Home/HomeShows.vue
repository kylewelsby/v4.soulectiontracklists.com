<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="container mx-auto p-4 py-8"
    )
      div(
        class="flex flex-row flex-wrap items-center"
      )
        h2(
          class="text-2xl md:text-3xl flex-grow font-bold font-header uppercase"
        ) Radio
        nuxt-link(
          to="/tracklists/"
          class="border border-gray-200 rounded-full px-2 md:px-8 py-2 flex flex-row items-center"
        )
          span(
            class="hidden md:inline"
          ) All Tracklists
          svg(
            viewBox="0 0 16 17"
            class="ml-2 w-5 fill-current stroke-current"
          )
            path(
              d="M2 8.5h12M10 12.5l4-4-4-4"
              stroke-linecap="round"
            )
      div(
        class="text-gray-400 text-sm font-light"
      ) Discover the artists and tracks played on Soulection Radio, Live Sets, and Discord Sessions.
      div(
        class="mt-4 flex flex-col md:flex-row md:items-center"
      )
        div(
          class="md:w-1/2 lg:w-auto text-center md:text-left md:mr-4"
        )
          nuxt-link(
            :to="`/tracklists/${latestShow.slug}/`"
          )
            Artwork(
              :src="latestShow.artwork"
              :size="360"
              class="shadow-lg rounded-2xl"
            )
        div(
          class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-row md:flex-col items-start"
        )
          nuxt-link(
            class="order-2 shadow-md rounded-full mb-2 ml-4 md:ml-0 latest-show__play-btn"
            :to="`/tracklists/${latestShow.slug}/`"
            @click.native="playShow()"
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
            nuxt-link(
              class="mb-1 text-2xl font-bold"
              :to="`/tracklists/${latestShow.slug}/`"
            ) {{ showTitle }}
            div(
              class="mb-1 font-light"
            ) {{ excerpt }}
            div(
              class="mb-3 font-light text-gray-400"
            ) {{ formattedDate }}
</template>
<script>
export default {
  props: {
    latestShow: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    showTitle() {
      if (this.latestShow.title.startsWith('Show')) {
        return `Soulection Radio ${this.latestShow.title}`
      } else {
        return this.latestShow.title
      }
    },
    excerpt() {
      const html = this.$md
        .renderInline(this.latestShow.content.split('<!--more-->')[0].trim())
        .replace(/<a /g, '<span ')
        .replace(/<\/a>/g, '</span>')
      return html
    },
    formattedDate() {
      if (this.latestShow.published_at) {
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long',
        }).format(Date.parse(this.latestShow.published_at))
      } else {
        return 'INVALID DATE'
      }
    },
  },
  methods: {
    playShow() {
      this.$store.dispatch('player/fetchShow', this.latestShow.id)
    },
  },
}
</script>
