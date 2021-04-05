<template lang="pug">
  div(
    class="mx-2 flex flex-col items-start lg:flex-row lg:items-end border-b-2 border-black border-opacity-50 dark:border-white dark:border-opacity-50"
  )
    div(
      class="flex-1 text-4xl font-bold font-header uppercase"
    ) {{ title }}
    div(
      class="w-full flex flex-row"
    )
      div(
        class="flex-1 overflow-x-auto site-sub-nav__menu relative"
      )
        nav(
          class="flex flex-row"
        )
          slot
      //- div "^"
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Untitled',
    },
  },
}
</script>
<style>
.site-sub-nav__menu::after {
  content: ' ';
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  @apply bg-gradient-to-r from-red-500 to-transparent;
}
</style>
