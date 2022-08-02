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
      nuxt-content(
        :document="page"
      )
        div(
    class="container mx-auto px-4 flex flex-col items-center mt-10"
  )
    h1(
      class="font-header uppercase text-2xl md:text-2xl"
    ) Details & Requirements
    div(
      class="md:w-2/3 lg:w-1/2 my-10 flex flex-col justify-center md:flex-row items-center"
    )
      form(
        @submit.prevent="download()"
        class=" md:mr-4 text-sm"
      )
        h3(
          class="text-xl font-medium"
        ) Instrumental + Acapella
        form(
        @submit.prevent="submit()"
        class=" md:mr-4 text-sm"
      )
        h3(
          class="text-xl font-medium"
        ) Instrumental + Acapella
        //- p(
        //-   class="text-sm"
        //- ) Rose Gold - Addicted (Instrumental) Rose Gold - Addicted (Acapella)
        //- input(
        //-   v-model="email"
        //-   class="my-4 h-8 block w-full bg-transparent px-4 text-gray-900 dark:text-white placeholder-opacity-50 placeholder-black dark:placeholder-opacity-50 dark:placeholder-black dark:placeholder-white focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:focus:border-white dark:focus:border-opacity-50 dark:focus:ring-white sm:text-sm rounded-full border border-black border-opacity-25 dark:border-white dark:border-opacity-25"
        //-   placeholder="Email address"
        //- )

        //- h4(
        //-   class="text-lg font-medium"
        //- ) What would you like to receive?

        //- div(
        //-   class="flex flex-col my-4"
        //- )
        //-   div(
        //-     class="block"
        //-   )
        //-     input(
        //-       type="checkbox"
        //-       id="email-newsletter"
        //-       name="email-newsletter"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-newsletter"
        //-       class="ml-2"
        //-     ) Soulection Newsletter

        //-   div
        //-     input(
        //-       type="checkbox"
        //-       id="email-tracklists"
        //-       name="email-tracklists"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-tracklists"
        //-       class="ml-2"
        //-     ) Soulection Radio Shows &amp; Tracklists

        //-   div
        //-     input(
        //-       type="checkbox"
        //-       id="email-supply"
        //-       name="email-supply"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-supply"
        //-       class="ml-2"
        //-     ) Soulection Supply
        //-   div
        //-     input(
        //-       type="checkbox"
        //-       id="email-events"
        //-       name="email-events"
        //-       checked
        //-     )
        //-     label(
        //-       for="email-events"
        //-       class="ml-2"
        //-     ) Soulection Events (live streams, shows, etc)

        SiteButton(
          href="https://madmimi.com/signups/68317/join"
          type="button"
          class="mt-6"
        ) Download
      div(
        class="mt-10 md:mt-0"
      )

        Artwork(
          src="/soulection/home/imgonline-com-ua-compressed-3PgQJJjZn58Xt_3350x.jpg"
          :size="512"
        )
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
