<template>
  <article>
    {{ data }}
    <!-- <h1>{{ page.title }}</h1> -->
    <!-- <nuxt-content :document="page" /> -->
  </article>
</template>
<script>
export default {
  async asyncData({ $supabase, params, error }) {
    const { error: err, data } = await $supabase
      .from('shows')
      .select('title, links, content, tags')
      .eq('profile_id', 1)
      .eq('slug', params.slug)
      .single()
    if (err) {
      error({
        statusCode: 404,
        message: `Could not find page \`${params.slug}\` \n\n${err.message}`,
      })
    }
    return {
      data,
    }
  },
  head() {
    return {
      title: this.data.title,
    }
  },
}
</script>
