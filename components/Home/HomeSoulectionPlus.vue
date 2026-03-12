<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    nuxt-link(
      class="container mx-auto p-4 py-8 flex flex-col lg:flex-row relative"
      to="/500/"
    )
      img(
        src="https://cdn.soulectiontracklists.com/soulection/home/soulection-plus/fragment%20banner%20transparent.png"
        class="rounded-xl md:rounded-2xl w-full h-[420px] inline-block object-cover"
      )
      //- div(
      //-   class="absolute z-10 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center"
      //- )
      //-   span(
      //-     class="mt-10 font-header text-xl md:text-4xl text-center"
      //-   ) A Decade of Legacy
      //-   SiteButton(
      //-     class="mt-4"
      //-   )
      //-     | Learn more
      //-     SiteIcon(
      //-       icon="arrow-right"
      //-       class="w-6 ml-4"
      //-     )
</template>
