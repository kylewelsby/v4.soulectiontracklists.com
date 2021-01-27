<template>
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
        <g-link to="/episodes" class="font-medium text-gray-500 flex flex-row items-center">
          Go to Tracklists
          <g-image
            src="/icons/chevron.svg"
            width="12"
            height="12"
            class="ml-2"
          />
        </g-link>
      </div>

      <div
        class="flex-grow text-right flex flex-col items-end content-end justify-end max-w-xs"
      >
        <h1>
          <span class="block uppercase tracking-widest font-light mb-2">
            New Tracklist
          </span>
          <span class="block font-semibold text-2xl mb-5">
            &nbsp; {{ latestEpisode.title }}
          </span>
        </h1>
        <g-link :to="latestEpisode.path" class="flex flex-col content-center">
          <Artwork :path="latestEpisode.artwork" class="mb-5" :size="84" />
          <button
            class="bg-black rounded-full text-white px-6 py-2 font-medium text-l flex flex-row self-center"
          >
            <g-image
              src="/icons/play.svg"
              with="12"
              height="12"
              class="w-6 mr-2"
            />
            Play Show
          </button>
        </g-link>
      </div>
    </div>
  </div>
</template>
<script>
import Artwork from '@/components/Artwork'
export default {
  components: {
    Artwork,
  },
  props: {
    latestEpisode: {
      type: Object,
      default: () => {},
    }
  }
}
</script>