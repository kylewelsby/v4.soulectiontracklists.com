<template lang="pug">
  div(
    class="flex flex-col items-start xl:flex-row xl:items-end border-b border-black border-opacity-50 dark:border-white dark:border-opacity-20"
  )
    div(
      class="flex-1 text-4xl font-bold font-header uppercase"
    ) {{ title }}
    div(
      class="w-full xl:w-auto flex flex-row site-sub-nav__menu relative"
    )
      div(
        class="flex-1 overflow-x-auto "
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
  height: 100%;
  @apply w-4 bg-gradient-to-r to-[#151515] from-transparent;
}

.site-sub-nav__menu::before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  @apply w-4 bg-gradient-to-l to-[#151515] from-transparent;
}
</style>
