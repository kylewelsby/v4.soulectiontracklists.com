<template>
  <div :id="slug" class="episode__session">
    <div class="p-4 flex flex-col lg:flex-row lg:items-center">
      <Artwork
        v-if="chapter.artwork"
        :path="chapter.artwork"
        :size="48"
        class="mb-8 lg:mb-0 lg:mr-10"
      />
    </div>
    <div>
      <h4 class="text-2xl font-medium">{{ chapter.name }}</h4>
      <div v-if="chapter.content" class="mt-4">
        <!-- <nuxt-content :document="chapter.content" /> -->
      </div>
    </div>
    <div>
      <ChapterMarker
        v-for="(marker, index) of chapter.markers"
        :key="marker.id"
        :marker="marker"
        :track-number="index"
      />
    </div>
  </div>
</template>
<script>
import { slugify } from '@/utils'
import ChapterMarker from '@/components/ChapterMarker.vue'

export default {
  components: {
    ChapterMarker,
  },
  props: {
    chapter: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    slug () {
      return slugify(this.chapter.name)
    }
  }
};
</script>
