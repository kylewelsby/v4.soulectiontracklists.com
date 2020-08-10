<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let slug = params.slug
    if (slug === '_index') {
      slug = ''
    }
    const page = await $content('artists', `${slug}/_index`)
      .fetch()
      .catch((_err) => {
        error({ statusCode: 404, message: 'Artist not found ' })
      })

    return {
      page,
    }
  },
}
</script>
