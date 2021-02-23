<template lang="pug">
  div(
    class="w-2/12"
  )
    h4(
      class="text-lg font-bold mb-2"
    ) Type
    ul(
      class="mb-4"
    )
      li
        nuxt-link(
          to="/episodes/"
          class="inline-flex items-center mt-2"
        )
          input(
            type="radio"
            class="form-radio h-5 w-5 text-gray-500"
            :checked="isAll"
          )
          span(
            class="ml-2"
          ) All shows ({{ totalCount }})
      li(
        v-for="(count, key) of tagsWithCounts"
      )
        nuxt-link(
          :to="`/episodes/t/${key}/`"
          class="inline-flex items-center mt-2"
        )
          input(
            type="radio"
            class="form-radio h-5 w-5 text-gray-500"
            :checked="isActive(key)"
          )
          span(
            class="ml-2"
          ) {{ $tc(`filter.types.${key}`, count) }}
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      default: 0,
    },
    tagsWithCounts: {
      type: Object,
      default: () => ({
        solo: 0,
        takeover: 0,
        'peoples-choice': 0,
        discord: 0,
        guests: 0,
        interview: 0,
        missing: 0,
      }),
    },
  },
  computed: {
    isAll() {
      return !this.$route.params.type
    },
  },
  methods: {
    isActive(key) {
      return this.$route.params.type === key
    },
  },
}
</script>
