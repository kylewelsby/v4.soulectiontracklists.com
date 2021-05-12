<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="container mx-auto p-4 py-8 flex flex-col lg:flex-row"
    )
      div(
        class="lg:w-3/5 lg:order-2"
      )
        div(
          class="aspect-w-16 aspect-h-9"
        )
          iframe(
            src="https://www.youtube-nocookie.com/embed/tL_c9ZGcRRM?playlist=tL_c9ZGcRRM&modestbranding=1&controls=1&autoplay=1&loop=1&mute=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="rounded-xl md:rounded-2xl"
          )
      div(
        class="lg:w-2/5 lg:order-1 flex flex-col justify-end"
      )
        div(
          class="font-bold whitespace-nowrap z-10 mt-4"
        )
          span(
            class="block text-lg md:text-5xl"
          ) Welcome
          span(
            class="block text-xl md:text-6xl"
          ) To The Sound of Tomorrow
        SiteIconButton(
          icon="arrow-down"
          class="mt-8 p-2 border-opacity-25 dark:border-opacity-25 self-center lg:self-start w-12 h-12 min-h-12 min-w-12 max-w-12 max-h-12"
        )
    div(
      class="container mx-auto p-4 grid gap-2 md:gap-8 grid-cols-5 justify-items-center items-center"
    )
      div
        Artwork(
          src="/soulection/home/imgonline-com-ua-compressed-3PgQJJjZn58Xt_3350x.jpg"
          :size="300"
          class="w-full"
        )
      div
        Artwork(
          src="/soulection/home/EyZ0tkGU8AAspjV.jpeg"
          :size="300"
          class="w-full"
        )
      div
        Artwork(
          src="/soulection/home/EyZ0tkeVoAEQ9aX.jpg"
          :size="300"
          class="w-full"
        )
      div
        Artwork(
          src="/soulection/home/EyZ0tj-U4AIGnhf.jpg"
          :size="300"
          class="w-full"
      )
      div
        Artwork(
          src="/soulection/home/imgonline-com-ua-compressed-mRVzt4cw2Dp_3350x.jpg"
          :size="300"
          class="w-full"
      )
</template>
