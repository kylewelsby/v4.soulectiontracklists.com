<template lang="pug">
  div(
    class="h-screen flex overflow-hidden bg-white"
  )
    AdminSidebar()
    div(
      class="flex-1 max-w-4xl mx-auto w-0 flex flex-col md:px-8 xl:px-0"
    )
      main(
        class="flex-1 relative z-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      )
        Nuxt
</template>
