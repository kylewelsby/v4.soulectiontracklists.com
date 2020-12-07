<template>
  <div class="hidden lg:block">
    <span v-if="validLinkCount <= 4" class="flex flex-frow flex-wrap">
      <TrackLink
        v-for="(data, provider) in validLinks"
        :key="provider"
        :provider="provider"
        :href="data.href"
        hide-title
        class="ml-2"
      />
    </span>
    <nuxt-link
      v-else
      :to="to"
      class="rounded-full bg-white text-black min-h-32 block py-1 px-4"
    >
      {{ $tc('linkCount', validLinkCount) }}
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    links: {
      type: Object,
      default: () => {},
    },
    to: {
      type: String,
      default: () => {},
    },
  },
  setup(props) {
    const validLinks = Object.entries(props.links || {}).reduce(
      (acc, [provider, value]) => {
        if (value && value.href && value.href.length > 0) {
          acc[provider] = value
        }
        return acc
      },
      {}
    )
    const validLinkCount = Object.keys(validLinks).length
    return {
      validLinks,
      validLinkCount,
    }
  },
})
</script>
