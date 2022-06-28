<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="container mx-auto p-4 py-8 flex flex-col lg:flex-row relative"
    )
      nuxt-img(
        src="https://soulmint.s3.us-west-1.amazonaws.com/277215178_695243968270035_615596215902232164_n.jpg"
        class="rounded-xl md:rounded-2xl w-full h-[240px] inline-block object-cover"
        width="1536"
        fit="contain"
        provider="twicpics"
      )
      div(
        class="absolute z-10 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center"
      )
        span(
          class="mt-10 font-header text-xl md:text-4xl text-center"
        ) Connect deeper
        span(
          class="flex flex-col lg:flex-row"
        )
          SiteButton(
            class="mx-2 mt-4"
            href="https://madmimi.com/signups/68317/join"
          )
            SiteIcon(
              icon="email"
              class="w-6 mr-2"
            )
            | Subscribe to Newsletter
          SiteButton(
            class="mx-2 mt-4"
            href="https://discord.gg/soulection"
          )
            SiteIcon(
              icon="discord"
              class="w-6 mr-2"
            )
            | Join Our Discord
</template>
