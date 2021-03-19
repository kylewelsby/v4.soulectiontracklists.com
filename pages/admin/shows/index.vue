<template lang="pug">
  div(
    class="py-8"
  )
    div(
      class="px-4 sm:px-6 md:px-0"
    )
      h1(
        class="text-2xl font-semibold text-gray-900"
      ) Tracklists
    div(
      class="px-4 sm:px-6 md:px-0"
    )
      div(
        class="py-4"
      )
        p 🚧 Administration still in development 🚧
        p
          | In the mean time, contact
          |
          a(
            class="underline"
            href="mailto:kyle@soulectiontracklists.com"
          ) Kyle Welsby
          |
          | for any changes, updates.
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
}
</script>
