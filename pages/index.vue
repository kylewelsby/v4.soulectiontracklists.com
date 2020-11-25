<template>
  <div class="bg-white flex flex-col items-stretch">
    <!-- <NuxtContent
      class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
      :document="document"
    /> -->
    <div class="bg-white flex flex-col items-center">
      <div
        class="w-full md:w-10/12 p-4 py-8 flex flex-col md:flex-row items-center"
      >
        <div class="flex-grow my-4 mb-8 md:m-0 px-4 md:px-0">
          <p class="text-4xl lg:text-5xl font-serif leading-tight mb-3">
            For the artists,<br />
            listeners,<br />
            and discovery <br />
            of timeless sounds.
          </p>
          <nuxt-link
            to="/episodes"
            class="font-medium text-gray-500 flex flex-row items-center"
            >Go to Tracklists <IconChevron class="w-4 ml-2" />
          </nuxt-link>
        </div>
        <div
          class="flex-grow text-right flex flex-col items-end content-end justify-end max-w-xs"
        >
          <h1>
            <span class="block uppercase tracking-widest font-light mb-2">
              New tracklist</span
            >
            <span class="block font-semibold text-2xl mb-5">
              &nbsp;{{ latestEpisode.title }}
            </span>
          </h1>
          <Artwork :path="latestEpisode.artwork" class="mb-5" :size="84" />
          <button
            class="bg-black rounded-full text-white px-6 py-2 font-medium text-l flex flex-row self-center"
          >
            <IconPlay class="w-6 mr-2" />
            Play Show
          </button>
        </div>
      </div>
    </div>
    <Tracklists :episodes="episodes" />
  </div>
</template>

<script>
import Artwork from '@/components/Artwork'
import Tracklists from '@/components/Tracklists'
import IconPlay from '~/assets/images/icons/play.svg?inline'
import IconChevron from '~/assets/images/icons/chevron.svg?inline'

export default {
  components: {
    Artwork,
    IconPlay,
    IconChevron,
    Tracklists,
  },
  async asyncData({ $content, error }) {
    const document = await $content('index').fetch()
    const episodes = await $content('episodes', { deep: true })
      .where({ episode: { $gt: 0 } })
      .sortBy('date', 'desc')
      .fetch()
      .catch((_err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      document,
      episodes,
    }
  },
  computed: {
    latestEpisode() {
      return this.episodes[0]
    },
  },
}
</script>
