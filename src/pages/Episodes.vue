<template>
  <Layout>
    <div class="bg-white flex flex-col items-center">
      <div class="w-full md:w-10/12 p-4">
        <EpisodeRow
          v-for="episode in $page.episodes.edges"
          :key="episode.id"
          :episode="episode.node"
        >
        </EpisodeRow>

        <Pager
          :info="$page.episodes.pageInfo"
          linkClass="px-2 py-1 mx-1"
          prevClass="inline-flex flex-row items-center justify-center rounded-full text-black bg-white border-2 border-current w-8 h-8"
          nextClass="inline-flex flex-row items-center justify-center rounded-full text-black bg-white border-2 border-current w-8 h-8"
          activeLinkClass="underline"
        />
      </div>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int) {
  episodes: allEpisode(
    perPage: 50
    page: $page
    sort: {
      by: "date"
      order: DESC
    }
    filter: {
      episode: {
        exists: true
      }
    }
  ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        path
        date
        artwork
        excerpt
        content
      }
    }
  }
}
</page-query>
<script>
import { Pager } from "gridsome";

import EpisodeRow from "@/components/EpisodeRow";
export default {
  components: {
    EpisodeRow,
    Pager
  }
};
</script>
