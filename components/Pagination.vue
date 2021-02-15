<template>
  <div class="flex flex-row">
    <nuxt-link
      :to="{
        name: name,
        params: { page: current - 1 },
      }"
      class="relative inline-flex justify-center items-center rounded-full text-black bg-white p-2 border-2 border-current mr-2"
    >
      <span class="sr-only">Previous</span>
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </nuxt-link>
    <nuxt-link
      v-for="(page, index) of pages"
      :key="index"
      class="relative inline-flex justify-center items-center text-black b p-2 leading-none w-10 h-10 text-sm mr-2"
      :class="{
        'underline font-bold': current == page.number,
        'cursor-default': page.break,
      }"
      :to="page.to || {}"
      :tag="page.break ? 'span' : 'a'"
      :disabled="page.break"
    >
      <span v-if="page.break">&hellip;</span>
      <span v-else>{{ page.number }}</span>
    </nuxt-link>
    <!-- <div>{{ current }} / {{ totalPages }}</div> -->
    <nuxt-link
      :to="{
        name: name,
        params: { page: current + 1 },
      }"
      class="relative inline-flex justify-center items-center rounded-full text-black b p-2 border-2 border-current"
    >
      <span class="sr-only">Next</span>
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
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
    const pages = computed(() => {
      const arr = []
      arr.push({
        number: 1,
        to: {
          name: props.name,
          params: { page: 1 },
        },
      })
      arr.push({
        break: true,
      })
      arr.push({
        number: props.current - 1,
        to: {
          name: props.name,
          params: { page: props.current },
        },
      })
      arr.push({
        number: props.current,
        to: {
          name: props.name,
          params: { page: props.current },
        },
      })
      arr.push({
        number: props.current,
        to: {
          name: props.name,
          params: { page: props.current + 1 },
        },
      })
      arr.push({
        number: props.current,
        to: {
          name: props.name,
          params: { page: props.current },
        },
      })
      arr.push({
        break: true,
      })
      arr.push({
        number: totalPages.value,
        to: {
          name: props.name,
          params: { page: totalPages.value },
        },
      })
      return arr
    })
    return {
      totalPages,
      pages,
    }
  },
})
</script>
