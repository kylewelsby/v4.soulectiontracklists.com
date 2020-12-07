<template>
  <TrackRow
    :track-doc="trackDoc"
    :artist-doc="artistDoc"
    :track-string="trackString"
    :artist-string="artistString"
  />
</template>
<script>
import {
  defineComponent,
  useStatic,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
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
      type: [Number, null],
      default: 0,
    },
    track: {
      type: String,
      default: '',
    },
    hideCue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { $content } = useContext()
    const [artistString, titleString] = props.track.split(' - ')
    const tRef = ref(encodeURIComponent(props.trackRef.replace(/\.md$/, '')))
    const trackDoc = useStatic(
      async (ref) => {
        const data = await $content(decodeURIComponent(ref))
          .limit(1)
          .fetch()
          .catch(() => null)
        return data
      },
      tRef,
      'track'
    )
    const artistRef = ref(
      encodeURIComponent(props.trackRef.replace(/^(.+)\/tracks\/.*\.md$/, '$1'))
    )
    const artistDoc = useStatic(
      async (ref) => {
        const data = await $content(decodeURIComponent(ref), '/_index')
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
