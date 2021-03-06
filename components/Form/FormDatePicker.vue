<template lang="pug">
  client-only
    div(
      class="sm:col-span-4"
    )
      label(
        class="block text-sm font-medium text-gray-700"
        :for="id"
      ) {{ title }}
      v-date-picker(
        v-bind:value="value"
        v-on:input="$emit('input', $event)"
        is-required
        mode="dateTime"
      )
        template(
          v-slot="{ inputValue, inputEvents }"
        )
          div(
            class="mt-1 flex rounded-md shadow-sm"
          )
            input(
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              :value="inputValue"
              v-on="inputEvents"
              type="text"
              :aria-describedby="`${id}-description`"
            )
      p(
        v-if="$slots.default"
        class="mt-2 text-sm text-gray-500"
        :id="`${id}-description`"
      )
        slot
</template>
<script>
let counter = 0
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: () => counter,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number, Boolean],
      default: undefined,
    },
  },
  created() {
    counter++
  },
}
</script>
