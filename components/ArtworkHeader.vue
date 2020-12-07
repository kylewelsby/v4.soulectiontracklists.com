<template>
  <div class="flex flex-col lg:flex-row lg:items-center my-6 lg:my-8">
    <Artwork :path="artworkPath" :size="84" class="mb-8 lg:mb-0 lg:mr-10" />
    <div>
      <h1 class="tracking-tighter text-4xl font-semibold">
        {{ title }}
      </h1>
      <div
        class="mt-2 text-lg font-serif font-medium flex flex-row items-center"
      >
        <span v-if="date" class="inline-block pr-2 py-1">
          {{ formattedDate }} &bull;
        </span>
        <span class="bg-yellow-500 inline py-1">
          {{ highlighted }}
        </span>
      </div>
      <div class="mt-2 text-gray-500 underline">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Untitled Document',
      require: true,
    },
    artworkPath: {
      type: String,
      default: 'default artwork URL',
      require: false,
    },
    highlighted: {
      type: String,
      default: null,
      require: false,
    },
    date: {
      type: [Date, String],
      default: null,
      require: false,
    },
  },
  setup(props) {
    const formattedDate = computed(() => {
      if (props.date) {
        return new Date(props.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      } else {
        return ''
      }
    })
    return {
      formattedDate,
    }
  },
})
</script>
