<template>
  <Layout>
    <div class="bg-white flex flex-col items-stretch">
      <div class="bg-white flex flex-col items-center">
        <div class="w-full md:w-10/12 p-4 py-8">
          <ArtworkHeader
            :title="$page.artist.title"
            :artwork-path="$page.artist.artwork"
          >
            <!-- @todo tracks played -->
            <!-- @todo episodes appeared on -->
            <!-- @todo times played -->
          </ArtworkHeader>
        </div>
      </div>
    </div>

    <div class="bg-black text-white flex flex-col items-center">
      <div class="w-full md:w-10/12 p-4">
        <h2 class="mt-8 text-4xl font-semibold tracking-tighter">Tracks</h2>

        <div v-for="track in $page.artist.tracks" :key="track.id">
          <TrackRow :artist-doc="$page.artist" :track-doc="track" :hide-cue="true"/>
        </div>
      </div>
    </div>
  </Layout>
</template>
<page-query>
query($id: ID!) {
  artist(id: $id) {
    title
    artwork
    tracks {
      id
      title
      artwork
      links {
        platform
        href
      }
    }
  }
}
</page-query>
<script>
import ArtworkHeader from "@/components/ArtworkHeader";
import TrackRow from "@/components/TrackRow";
export default {
  components: {
    ArtworkHeader,
    TrackRow
  }
};
</script>
