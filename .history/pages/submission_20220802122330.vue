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
    h1(
      class="font-bold text-4xl mt-8 my-4 font-header uppercase"
    ) Stems
    div(
      class="w-full lg:w-10/12 grid grid-cols-1 md:grid-cols-6 gap-20 p-4"
    )
      AboutTeamMember(
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
