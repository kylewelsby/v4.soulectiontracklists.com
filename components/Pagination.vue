<template>
  <div>
    <nuxt-link
      :to="{
        name: name,
        params: { page: current - 1 },
      }"
      class="rounded bg-blue-500 text-white py-2 px-4"
    >
      Prev
    </nuxt-link>
    {{ current }} / {{ totalPages }}
    <nuxt-link
      :to="{
        name: name,
        params: { page: current + 1 },
      }"
      class="rounded bg-blue-500 text-white py-2 px-4"
    >
      Next
    </nuxt-link>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    name: {
      type: String,
      require: true,
      default: '',
    },
    current: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 50,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const totalPages = computed(() => {
      return Math.ceil(props.totalCount / props.perPage)
    })
    return {
      totalPages,
    }
  },
})
</script>
