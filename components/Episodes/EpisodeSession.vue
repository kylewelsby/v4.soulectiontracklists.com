<template>
  <div :id="slug" class="episode__session">
    <div class="p-4 flex flex-col lg:flex-row lg:items-center">
      <Artwork
        v-if="session.artwork"
        :path="session.artwork"
        :size="48"
        class="mb-8 lg:mb-0 lg:mr-10"
      />
      <div>
        <h4 class="text-2xl font-medium">{{ session.name }}</h4>
        <div v-if="session.content" class="mt-4">
          <nuxt-content :document="session.content" />
        </div>
      </div>
    </div>
    <div>
      <EpisodeTrack
        v-for="(ref, index) of session.refs"
        :key="index"
        :track-ref="ref"
        :track="session.tracks[index]"
        :cue="session.cue[index]"
        :track-number="index"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import EpisodeTrack from '@/components/Episodes/EpisodeTrack'
import { slugify } from '@/utils'

export default defineComponent({
  components: {
    EpisodeTrack,
  },
  props: {
    session: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const slug = computed(() => slugify(props.session.name))
    return {
      slug,
    }
  },
})
</script>
<style>
.episode__session .nuxt-content p {
  @apply py-2;
}

.episode__session .nuxt-content a {
  @apply underline;
}
</style>
