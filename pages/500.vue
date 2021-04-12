<template lang="pug">
  div
    div(
      class="flex flex-col items-center mt-10"
    )
      div(
        class="px-4 container mx-auto"
      )
        div(
          class="flex justify-center items-center"
        )
          img(
            src="/videos/Soulection-500-Livestream-Eye--unscreen.gif"
          )
        div(
          class="w-full flex flex-row items-center content-between text-2xl my-4"
        )
          div(
            class="flex-1 font-bold"
          ) Soulection Radio Show #500
          div(
            class="flex-1 text-center"
          ) 2011 — 2021
          div(
            class="flex-1 text-right"
          ) A Decade of Legacy

    div(
      class="w-1/3 mx-auto prose-lg my-12 "
    )
      p In celebration of ten years of Soulection Radio and the release of Show 500, we decided to do something special.
      p To show our apprecation for all of your support over the years, we're bringing you the live performance of Soulection Radio Show #500, the first ever Soulection Radio Supply Capsule, and 9 exclusive Apple Music mixes from our longtime Soulection family.
      p Thank you and enjoy.
      SiteBrand
    div(
      class="container mx-auto p-4"
    )
      div(
        class="my-10 mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      )
        div(
          class="order-2"
        )
          div(
            class="aspect-w-16 aspect-h-9"
          )
            iframe(
              src="https://www.youtube-nocookie.com/embed/i-Cl8IgsiNw?playlist=i-Cl8IgsiNw"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="rounded-2xl"
            )
        div(
          class="order-1 flex flex-col items-end"
        )
          | Joe Kay sits down with Apple Music’s Zane Lowe to celebrate the 10 year anniversary and 500 episodes of Soulection Radio. Since 2011, Soulection has grown into a global creative hub for innovative musicians, crate-digging DJs, and open-minded fans.
      div(
        class="my-10 mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      )
        div(
          class=""
        )
          div(
            class="aspect-w-16 aspect-h-9"
          )
            iframe(
              src="https://www.youtube-nocookie.com/embed/tL_c9ZGcRRM"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="rounded-2xl h-full"
            )
        div(
          class="flex flex-col items-start"
        )
          span(
            class="mb-2 text-2xl font-bold"
          ) Soulection Radio Show #500 (Live Performance)
          SiteButton(
            to="/tracklists/500"
          ) Tracklist
      div(
        class="my-10 mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      )
        div(
          class="order-2"
        )
          div(
            class="aspect-w-16 aspect-h-9"
          )
            iframe(
              src="https://www.youtube-nocookie.com/embed/tL_c9ZGcRRM?playlist=tL_c9ZGcRRM"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="rounded-2xl"
            )
        div(
          class="order-1 flex flex-col items-end"
        )
          span(
            class="mb-2 text-2xl font-bold"
          ) Soulection Radio Capsule
          SiteButton(
            href="https://soulection.supply/collections/soulection-radio-show-500-capsule"
          ) Shop
      div(
        class="mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      )
        div(
          class="flex justify-center md:justify-end"
        )
          Artwork(
            src="/images/episodes/soulection-radio-show-500.jpg"
            :size="425"
            class="shadow-lg"
          )
        div(
          class="flex flex-col items-start"
        )
          nuxt-link(
            class="order-2 shadow-md rounded-full mb-2 ml-4 md:ml-0 latest-show__play-btn"
            :to="`/tracklists/500/`"
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
          h1(
            class="text-4xl font-bold"
          ) Soulection Radio Show #500
          div(
            class="mb-1 font-light"
          ) Joe Kay celebrates 500 shows with unreleased music and classics.
          div(
            class="mb-3 font-light text-gray-400"
          ) April 10, 2021

    div(
      class="px-4 container mx-auto my-10"
    )
      h2(
        class="text-2xl font-bold"
      ) Apple Music Mixes
      div(
        class="grid grid-cols-5 gap-8 my-4"
      )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix"
        )
          Artwork(
            src="/soulection/home/EyvctM4UcAAl73u.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#joe-kay"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-joe-kay.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#shaka-lion"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-shaka-lion.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#jael"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-jael.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#andre-power"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-andre-power.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#kronika"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-kronika.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#esta"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-esta.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#sasha-marie"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-sasha-marie.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#iamnobodi"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-iamnobodi.jpg"
            :size="300"
          )
        nuxt-link(
          to="/tracklists/timeless-sounds-10-year-mix#jered-jackson"
        )
          Artwork(
            src="/images/episodes/timeless-sounds-10-year-mix/timeless-sounds-10-year-mix-jered-jackson.jpg"
            :size="300"
          )
    div(
      class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 mt-40"
    )
      div
        nuxt-picture(
          src="/default-artist.png"
          :size="128"
        )
      div
        nuxt-picture(
          src="/default-artist.png"
          :size="128"
        )
      nuxt-link(
        v-for="show in data"
        :key="show.id"
        :to="`/tracklists/${show.slug}/`"
      )
        img(
          style="object-fit: cover"
          :data-twic-src="`image:${show.artwork}`"
          :src="`${$config.twicPicUrl}/${show.artwork}?twic=v1/output=preview`"
          :size="128"
        )
</template>
<script>
export default {
  async asyncData({ $supabase, $config }) {
    const { data } = await $supabase
      .from('shows')
      .select('id, title, slug, artwork')
      .ilike('title', 'Soulection Radio%')
      .eq('state', 'published')
      .eq('profile', $config.profileId)
      .order('published_at', { ascending: false })
    return {
      data,
    }
  },
  methods: {
    playShow() {
      this.$store.dispatch('player/fetchShow', 'EAPjusZhoaI') // TODO: Update me
    },
  },
}
</script>
