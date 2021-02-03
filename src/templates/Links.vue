<template>
  <Layout>
    <div class="bg-white flex flex-col items-center">
      <div class="w-full md:w-10/12 py-8">
        <PlatformSwitcher />
        <hr class="my-4"/>
        <div v-for="edge of $page.links.edges" :key="edge.node.id">
          <TrackRow
            :artist-doc="edge.node.track.artist"
            :track-doc="edge.node.track"
            :hide-cue="true"
          />
        </div>
        <div class="flex flex-col items-center">
          <Pager
            :info="$page.links.pageInfo"
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
import PlatformSwitcher from "@/components/PlatformSwitcher";

export default {
  components: {
    Pager,
    TrackRow,
    PlatformSwitcher
  }
};
</script>
<page-query>
query($page: Int, $platform: String) {
  links: allLink(
    perPage: 50
    page: $page
    filter: {
      platform: {
        eq: $platform
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
        track {
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
}
</page-query>
