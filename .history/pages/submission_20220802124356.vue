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
