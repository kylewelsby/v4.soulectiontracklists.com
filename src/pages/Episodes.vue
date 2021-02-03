<template>
  <Layout>
    <div v-for="episode in $page.episodes.edges" :key="episode.id">
      <g-link :to="episode.node">{{ episode.node.title }}</g-link>
    </div>
  </Layout>
</template>
<page-query>
query {
  episodes: allEpisode(limit: 50) {
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</page-query>
