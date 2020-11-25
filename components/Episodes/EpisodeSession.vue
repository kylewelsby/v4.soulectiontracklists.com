<template>
  <div>
    <div class="p-4">
      <div v-if="session.artwork">
        <Artwork :path="session.artwork" :size="32" />
      </div>
      <div>
        <h4 class="text-2xl font-medium">{{ session.name }}</h4>
        <div v-if="content" class="mt-4">
          <nuxt-content :document="content" />
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
import { defineComponent, useAsync } from '@nuxtjs/composition-api'
import EpisodeTrack from '@/components/Episodes/EpisodeTrack'

/** @todo fix session content with markdown parser */
// import Markdown from '@nuxt/content/parsers/markdown'
// import { getDefaults, processMarkdownOptions } from '@nuxt/content/lib/utils'

// function getOptions() {
//   const defaults = getDefaults()
//   const options = Object.assign({}, defaults)
//   processMarkdownOptions(options)
//   return options
// }

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
    // const options = getOptions()
    // const md = new Markdown(options.markdown)
    const body = useAsync(async () => {
      // const body = await md.generateBody(props.session.content)
      const body = await {}
      return body
    })
    return {
      content: {
        body,
      },
    }
  },
})
</script>
