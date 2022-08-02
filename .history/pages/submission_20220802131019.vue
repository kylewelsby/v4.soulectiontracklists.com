<template lang="pug">
  div(
    class="container mx-auto flex flex-col items-center mt-10"
  )
    div(
      class="prose prose-sm sm:prose lg:prose-lg dark:prose-dark px-4 mx-auto"
    )
      h1(
        class="font-header uppercase"
      ) {{ page.title }}

        div(
    class="flex flex-col items-center"
  )
    div(
      class="container mx-auto p-4 py-8 flex flex-col lg:flex-row relative"
    )
      nuxt-img(
        src="/soulection/home/Rose_Addicted_Clean.jpeg"
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
        ) Download & Submit
        span(
          class="flex flex-col lg:flex-row"
        )
          SiteButton(
            class="mx-2 mt-4"
            href="https://madmimi.com/signups/68317/join"
          )
            SiteIcon(
              class="w-6 mr-2"
            )
            | Download
          SiteButton(
            class="mx-2 mt-4"
            href="https://discord.gg/soulection"
          )
            SiteIcon(
              class="w-6 mr-2"
            )
            | Submit
            nuxt-content(
        :document="page"
      )
</template>
<script>
export default {
  name: 'SoulectionAbout',
  async asyncData({ $content, error }) {
    const page = await $content('submission')
      .fetch()
      .catch((err) => {
        error({
          statusCode: 404,
          message: `Page not found ${err}`,
        })
      })

    return {
      page,
    }
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>
