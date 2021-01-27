<template>
  <Layout>
    <div class="bg-white flex flex-col items-stretch">
      <IndexHero :latest-episode="$page.latestEpisode.edges[0].node"/>
      <!-- NEWS/Events -->
      <div class="bg-black">EPISODEs</div>
    </div>
  </Layout>
</template>

<page-query>
query {
  latestEpisode: allEpisode(sortBy: "date", limit: 1) {
    edges {
      node {
        title
        artwork
        path
      }
    }
  }
}
</page-query>
<script>
import IndexHero from '@/components/IndexHero'
export default {
  components: {
    IndexHero,
  },
  computed: {
    latestEpisode () {
      return {
        title: "Show #463 (ROMderful Radio)",
        artwork: "/images/episodes/463.jpg",
        path: "/episodes/463/",
      }
    }
  }
};
</script>


