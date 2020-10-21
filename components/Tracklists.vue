<template>
  <div class="bg-black text-white flex flex-col items-center">
    <div class="w-full md:w-10/12 p-4 py-8 flex flex-col">
      <div class="flex flex-row items-end leading-none mb-4">
        <h2 class="flex-grow text-4xl">All Tracklists</h2>
        <span>Filter</span>
      </div>
      <div class="flex flex-row">
        <div class="w-2/12">filter options</div>
        <div class="w-10/12">
          <Tracklist
            v-for="episode of episodes"
            :key="episode"
            :episode="episode"
            class="mb-8"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tracklist from './Tracklist'
export default {
  components: {
    Tracklist,
  },
  props: {
    episodes: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
