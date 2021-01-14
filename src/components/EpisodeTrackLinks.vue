<template>
  <div class="hidden lg:block">
    <span v-if="validLinkCount <= limit" class="flex flex-frow flex-wrap">
      <TrackLink
        v-for="data in links"
        :key="data.platform"
        :provider="data.platform"
        :href="data.href"
        hide-title
        class="ml-2"
      />
    </span>
    <g-link
      v-else
      :to="to"
      class="rounded-full bg-white text-black min-h-32 block py-1 px-4"
    >
      {{ validLinkCount }}
      <!-- {{ $tc('linkCount', validLinkCount) }} -->
    </g-link>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import TrackLink from "@/components/TrackLink"
export default defineComponent({
  components: {
    TrackLink
  },
  props: {
    links: {
      type: Array,
      default: () => {},
    },
    to: {
      type: String,
      default: () => {},
    },
    limit: {
      type: Number,
      default: () => 4
    }
  },
  setup(props) {
    const validLinkCount = props.links.length
    return {
      validLinkCount,
    }
  },
})
</script>
