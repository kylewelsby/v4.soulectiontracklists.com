<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
    <ul>
      <li v-for="episode in episodes" :key="episode.slug">
        <nuxt-link :to="episode.path">{{ episode.title }}</nuxt-link>
      </li>
    </ul>
  </article>
</template>
<script>
export default {
  // watchQuery: true,
  async asyncData({ $content, params, error }) {
    const page = await $content('episodes', '_index').fetch()
    const episodes = await $content('episodes', { deep: true })
      .sortBy('date', 'desc')
      .fetch()
      .catch((_err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      page,
      episodes,
    }
  },
}
</script>
