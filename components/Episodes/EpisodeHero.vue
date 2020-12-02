<template>
  <div class="episode__hero bg-white flex flex-col items-center">
    <div class="w-full md:w-10/12 p-4 py-8">
      <ArtworkHeader
        :title="page.title"
        :date="page.date"
        :artwork-path="page.artwork"
        :highlighted="highlighted"
      >
        {{ trackSummary }}
        <span v-if="page.soundcloudData && page.soundcloudData.media">
          <button
            class="bg-black p-3 w-12 h-12 rounded-full flex items-center justify-center mt-4"
            @click="playEpisode()"
          >
            <svg
              class="text-white fill-current w-5 h-5 ml-1"
              viewBox="0 0 320.001 320.001"
            >
              <defs />
              <path
                d="M295.84 146.049l-256-144c-4.96-2.784-11.008-2.72-15.904.128C19.008 5.057 16 10.305 16 16.001v288c0 5.696 3.008 10.944 7.936 13.824 2.496 1.44 5.28 2.176 8.064 2.176 2.688 0 5.408-.672 7.84-2.048l256-144c5.024-2.848 8.16-8.16 8.16-13.952s-3.136-11.104-8.16-13.952z"
              />
            </svg>
          </button>
        </span>
      </ArtworkHeader>
      <nuxt-content :document="page" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useSummary } from '@/compositions/Episodes'
import { useLocationByISOCode } from '@/compositions'

export default defineComponent({
  props: {
    document: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props, { root }) {
    const page = props.document
    const trackSummary = useSummary({ $i18n: root.$i18n }, page.sessions)

    const location = useLocationByISOCode(page.location)
    const highlighted = `Live from ${location}`

    return {
      page,
      trackSummary,
      highlighted,
    }
  },
})
</script>
