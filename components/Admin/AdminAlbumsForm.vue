<template lang="pug">
  form(
    class="space-y-8 divide-y divide-gray-200"
    @submit.prevent="$emit('sumit')"
  )
    div(
      class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
    )
      FormDatePicker(
        id="published_at"
        title="Date"
        v-model="value.published_at"
      )
      FormTextInput(
        id="title"
        title="Title"
        v-model="value.title"
      )
      FormTextInput(
        id="catalog"
        title="Catalog #"
        v-model="value.catalogNumber"
      )
      FormFilePond(

      )
    div
      h3(
        class="text-lg leading-6 font-medium text-gray-900"
      ) Tracklist
    div(
      class="pt-5"
    )
      div(
        class="flex justify-end"
      )
        button(
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click.prevent="$emit('cancel')"
        ) Cancel
        button(
          type="submit"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        ) Save
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      artworks: [],
    }
  },
  watch: {
    value() {
      this.$emit('input', this.value)
    },
  },
  methods: {
    handleFilePondInit() {
      console.log('FilePond has initialized')
      this.$refs.pond.getFiles()
    },
  },
}
</script>
