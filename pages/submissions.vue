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
        provider="imagekit"
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
            href="https://soulsubmissions.s3.us-west-1.amazonaws.com/ROSE+GOLD+-+ADDICTED+STEMS+90BPM.zip"
          )
            | Download Stems
          SiteButton(
            class="mx-2 mt-8"
            href="https://forms.gle/z8NE48BjgFJw17Ut5"
          )
            | Artist Submission Form
          SiteButton(
            class="mx-2 mt-8"
            href="https://soulsubmissions.s3.us-west-1.amazonaws.com/Soulection+Remix+Contest+ToS_form.pdf"
          )
            | Terms & Conditions
    div(
      class="prose prose-sm sm:prose lg:prose-lg dark:prose-dark px-4 mx-auto"
    )
      nuxt-content(
        :document="page"
      )

      //- div(
      //-   class="my-20 items-center"
      //- )
      //-   div(
      //-     class="relative"
      //-   )
      //-     div(
      //-       class="aspect-w-16 aspect-h-9"
      //-     )
      //-       iframe(
      //-         src="https://www.youtube-nocookie.com/embed/-uwvSeJrKL8"
      //-         frameborder="0"
      //-         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //-         allowfullscreen
      //-         class="rounded-2xl h-full"
      //-       )
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
