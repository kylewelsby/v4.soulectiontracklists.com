<template lang="pug">
  div(
    class="flex flex-col items-center mt-10 mx-4"
  )
    div(
      class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto"
    )
      h1 {{ page.title }}
      nuxt-content(
        :document="page"
      )

</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    const page = await $content(params.slug)
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
