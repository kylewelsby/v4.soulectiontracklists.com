<template lang="pug">
  div(
    class="container mx-auto flex flex-col items-center mt-10"
  )
    div(
      class="prose prose-sm sm:prose lg:prose-lg dark:prose-dark px-4 mx-auto text-center"
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
        class="rounded-xl md:rounded-2xl w-full h-[380px] inline-block object-cover"
        width="1536"
        fit="contain"
        provider="twicpics"
      )
      div(
        class="absolute z-10 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center"
      )
        //- span(
        //-   class="mt-10 font-header text-xl md:text-4xl text-center"
        //- ) Download & Submit
        span(
          class="flex flex-col lg:flex-col"
        )
          SiteButton(
            class="mx-2 mt-4"
            href="https://soulection.com"
          )
            | Download Instrumental + Acapella
          SiteButton(
            class="mx-2 mt-8"
            href="https://soulection.com"
          )
            | Artist Submission Form
    div(
      class="prose prose-sm sm:prose lg:prose-lg dark:prose-dark px-4 mx-auto"
    )
      nuxt-content(
        :document="page"
      )
      //- div(
      //-   class="relative z-10 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center"
      //- )
        //- span(
        //-   class="mt-10 font-header text-xl md:text-4xl text-center"
        //- ) Download & Submit
        //- span(
        //-   class="flex flex-col lg:flex-col"
        //- )
        //-   SiteButton(
        //-     class="mx-2 mt-4"
        //-     href="https://soulection.com"
        //-   )
        //-     SiteIcon(
        //-       class="w-6 mr-2"
        //-     )
        //-     | Download Instrumental + Acapella
        //-   SiteButton(
        //-     class="mx-2 mt-8"
        //-     href="https://soulection.com"
        //-   )
        //-     SiteIcon(
        //-       class="w-6 mr-2"
        //-     )
        //-     | Artist Submission Form
                div(
          class="flex flex-col items-start text-left"
        )
          span(
            class="font-header mb-2 text-2xl font-bold"
          ) Zane Lowe Interview
          | Joe Kay sits down with Apple Music’s Zane Lowe to celebrate the 10 year anniversary and 500 episodes of Soulection Radio. Since 2011, Soulection has grown into a global creative hub for innovative musicians, crate-digging DJs, and open-minded fans.
        div(
        class="my-4 items-center"
      )
        div(
          class=""
        )
          div(
            class="aspect-w-16 aspect-h-9"
          )
            iframe(
              src="https://www.youtube-nocookie.com/embed/-uwvSeJrKL8"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="rounded-2xl h-full"
            )
</template>
<script>
export default {
  name: 'SoulectionSubmissions',
  async asyncData({ $content, error }) {
    const page = await $content('submissions')
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
