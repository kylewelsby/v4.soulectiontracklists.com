<template>
  <div
    class="episode__track flex flex-row items-center justify-center p-4 text-lg"
  >
    <nuxt-link
      v-if="trackDoc"
      :to="trackDoc.path"
      class="h-12 w-12 mr-6 relative rounded bg-default-image"
    >
      <Artwork :path="trackDoc ? trackDoc.artwork : null" :size="12" />
      <span
        v-if="trackNumber"
        class="absolute top-0 right-0 -mt-2 -mr-2 bg-white shadow rounded-full w-5 h-5 leading-none text-xs flex items-center justify-center p-2 text-gray-500"
      >
        {{ trackNumber + 1 }}
      </span>
    </nuxt-link>
    <span v-else class="h-12 w-12 mr-6 relative rounded bg-default-image">
      <Artwork :path="trackDoc ? trackDoc.artwork : null" :size="12" />
      <span
        v-if="trackNumber"
        class="absolute top-0 right-0 -mt-2 -mr-2 bg-white shadow rounded-full w-5 h-5 leading-none text-xs flex items-center justify-center p-2 text-gray-500"
      >
        {{ trackNumber + 1 }}
      </span>
    </span>
    <span class="flex flex-col flex-grow">
      <a v-if="!hideCue" class="text-xs order-first cursor-pointer">
        {{ cue }}
      </a>
      <nuxt-link
        v-if="artistDoc"
        :to="artistDoc.path"
        class="font-medium order-3"
      >
        {{ artistDoc.title }}
      </nuxt-link>
      <span v-else class="font-medium order-3">
        {{ artistString }}
      </span>
      <nuxt-link v-if="trackDoc" :to="trackDoc.path" class="font-light order-2">
        {{ trackDoc.title }}
      </nuxt-link>
      <span v-else class="font-light order-2">
        {{ titleString }}
      </span>
    </span>
    <EpisodeTrackLinks
      v-if="trackDoc"
      :links="trackDoc.links"
      :to="trackDoc.path"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    trackDoc: {
      type: Object,
      default: () => {},
    },
    artistDoc: {
      type: Object,
      default: () => {},
    },
    artistString: {
      type: String,
      default: '',
    },
    trackString: {
      type: String,
      default: '',
    },
    hideCue: {
      type: Boolean,
      default: false,
    },
    cue: {
      type: String,
      default: '00:00:00',
    },
    trackNumber: {
      type: [Number, null],
      default: 0,
    },
  },
  setup(props) {},
})
</script>
