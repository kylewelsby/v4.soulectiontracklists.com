<template>
  <div class="flex flex-row items-center justify-center p-4 text-lg">
    <a href="" class="h-12 w-12 mr-6 relative rounded bg-default-image">
      <Artwork :path="trackDoc ? trackDoc.artwork : null" :size="12" />
      <span
        class="absolute top-0 right-0 -mt-2 -mr-2 bg-white shadow rounded-full w-5 h-5 leading-none text-xs flex items-center justify-center p-2 text-gray-500"
      >
        {{ trackNumber + 1 }}
      </span>
    </a>
    <span class="flex flex-col flex-grow">
      <a class="text-xs order-first cursor-pointer" @click="seekTo(cue)">
        {{ cue }}
      </a>
      <nuxt-link
        v-if="artistDoc"
        :to="artistDoc.dir"
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
  </div>
</template>
<script>
import {
  defineComponent,
  useStatic,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

import Artwork from '@/components/Artwork'

export default defineComponent({
  components: {
    Artwork,
  },
  props: {
    trackRef: {
      type: String,
      default: '',
    },
    cue: {
      type: String,
      default: '00:00:00',
    },
    trackNumber: {
      type: Number,
      default: 0,
    },
    track: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { $content } = useContext()
    const [artistString, titleString] = props.track.split(' - ')
    const tRef = ref(props.trackRef.replace(/\.md$/, ''))
    const trackDoc = useStatic(
      async (ref) => {
        const data = await $content(ref)
          .limit(1)
          .fetch()
          .catch(() => null)
        return data
      },
      tRef,
      'track'
    )
    const artistRef = ref(
      props.trackRef.replace(/^(.+)\/tracks\/.*\.md$/, '$1')
    )
    const artistDoc = useStatic(
      async (ref) => {
        const data = await $content(ref, '/_index')
          .limit(1)
          .fetch()
          .catch(() => null)
        return data
      },
      artistRef,
      'artist'
    )
    return {
      trackDoc,
      artistDoc,
      artistString,
      titleString,
    }
  },
})
</script>
