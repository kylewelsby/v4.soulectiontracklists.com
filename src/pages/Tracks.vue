<template>
  <Layout>
    <div class="bg-white flex flex-col items-center">
      <div class="w-full md:w-10/12 py-8">
        <div v-for="edge of $page.tracks.edges" :key="edge.node.id">
          <TrackRow
            :artist-doc="edge.node.artist"
            :track-doc="edge.node"
            :hide-cue="true"
          />
        </div>
        <div class="flex flex-col items-center">
          <Pager
            :info="$page.tracks.pageInfo"
            linkClass="px-2 py-1 mx-1"
            prevClass="inline-flex flex-row items-center justify-center rounded-full text-black bg-white border-2 border-current w-8 h-8"
            nextClass="inline-flex flex-row items-center justify-center rounded-full text-black bg-white border-2 border-current w-8 h-8"
            activeLinkClass="underline"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>
<script>
import { Pager } from "gridsome";

import TrackRow from "@/components/TrackRow";

export default {
  components: {
    Pager,
    TrackRow
  }
};
</script>
<page-query>
query($page: Int) {
  tracks: allTrack(
    perPage: 50
    page: $page
    sort: {
      by: "lastPlayedAt"
      order: DESC
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
        links {
          href
          platform
        }
        artist {
          title
        }
      }
    }
  }
}
</page-query>
