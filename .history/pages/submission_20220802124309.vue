<template lang="pug">
    div(
      class="prose prose-sm sm:prose lg:prose-lg dark:prose-dark px-4 mx-auto"
    )
      h1(
        class="font-header uppercase"
      ) {{ page.title }}
      nuxt-content(
        :document="page"
      )
        div(
    class="container mx-auto px-4 flex flex-col items-center mt-10"
  )
  div(
    class="flex flex-col items-center"
  )
    div(
      class="container mx-auto p-4 py-8 flex flex-col lg:flex-row relative"
    )
      nuxt-img(
        src="/soulection/home/soulection-curtains.jpeg"
        class="rounded-xl md:rounded-2xl w-full h-[240px] inline-block object-cover"
        width="1536"
        fit="contain"
        provider="twicpics"
      )
      div(
        class="absolute z-10 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center"
      )
        //- span(
        //-   class="mt-10 font-header text-xl md:text-4xl text-center"
        //- ) Connect deeper
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
            | Subscribe to Newsletter
          SiteButton(
            class="mx-2 mt-4"
            href="https://discord.gg/soulection"
          )
            SiteIcon(
              class="w-6 mr-2"
            )
            | Join Our Discord
    h1(
      class="font-bold text-2xl mt-8 my-4 font-header uppercase underline"
    ) Details & Requirements
    div(
      class="w-full lg:w-10/12 grid grid-cols-1 md:grid-cols-6 gap-20 p-4"
    )
      SubmissionLinks(
        v-for="(member, index) in page.team"
        :key="index"
        :member="member"
        class="md:col-span-2"
        :class="{'md:col-start-2': index == 3}"
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
