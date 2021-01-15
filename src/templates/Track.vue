<template>
  <Layout v-if="$page.track && $page.track.artist">
    <div class="bg-white flex flex-col items-stretch">
      <div class="bg-white flex flex-col items-center">
        <div class="w-full md:w-10/12 p-4 py-8">
          <ArtworkHeader
            :title="$page.track.title"
            :artwork-path="$page.track.artwork"
            :highlighted="$page.track.artist.title"
          >
            <template v-slot:highlighted>
              <g-link :to="$page.track.artist">{{$page.track.artist.title}}</g-link>
            </template>
            <!-- {{
              $tc("tracklistAppearances", $page.track.episodes.length, {
                number: lastEpisode
              })
            }} -->
          </ArtworkHeader>
          <div>
            <!-- <nuxt-content :document="page" /> -->
          </div>
        </div>
      </div>
      <div class="bg-black text-white flex flex-col items-center">
        <div class="w-full md:w-10/12 p-4">
          <h2 class="mt-8 text-4xl font-semibold tracking-tighter">Links</h2>
          <h3 class="text-lg mt-5">Buy, Listen, Download, and Support on</h3>
          <ul class="grid md:grid-cols-2">
            <li
              v-for="(data, index) of linkedProviders"
              :key="index"
              class="my-3"
            >
              <TrackLink
                :provider="data.platform"
                :href="data.href"
                :track-name="trackName"
              />
            </li>
          </ul>
          <h3 class="text-lg mt-5">Search on</h3>
          <ul class="grid md:grid-cols-2 opacity-75">
            <li
              v-for="(data, index) of unlinkedProviders"
              :key="index"
              class="my-3"
            >
              <TrackLink :provider="data" :track-name="trackName" />
            </li>
          </ul>
          <!-- <h2 class="mt-8 text-4xl font-semibold tracking-tighter">
            Appearances
          </h2>
          <nuxt-link
            v-for="(episode, episodeIndex) of episodes"
            :key="episodeIndex"
            :to="episode.path"
          >
            {{ episode.title }}
          </nuxt-link> -->
        </div>
      </div>
    </div>
  </Layout>
  <div v-else>
    Could not render page
  </div>
</template>
<page-query>
query($id: ID!) {
  track(id: $id) {
    title
    artwork
    artworkUrl
    artist {
      path
      title
    }
    links {
      platform
      href
    }
  }
}
</page-query>
<script>
import ArtworkHeader from "@/components/ArtworkHeader";
import TrackLink from "@/components/TrackLink";
export default {
  components: {
    ArtworkHeader,
    TrackLink
  },
  data() {
    return {
      platforms: [
        "amazonMusic",
        "appleMusic",
        "audioMack",
        "audius",
        "bandcamp",
        "bing",
        "discogs",
        "deezer",
        "duckduckgo",
        "google",
        "lastfm",
        "soundcloud",
        "spotify",
        "tidal",
        "youtube",
        "traxsource",
        "beatport",
        "website",
        "instagram",
        "facebook",
        "dropbox",
        "box",
        "googleDrive",
        "mega"
      ],
      platformSearch: [
        "amazonMusic",
        "appleMusic",
        "audioMack",
        "bandcamp",
        "beatport",
        "bing",
        "discogs",
        "deezer",
        "duckduckgo",
        "google",
        "lastfm",
        "soundcloud",
        "spotify",
        "tidal",
        "traxsource",
        "youtube"
      ]
    };
  },
  computed: {
    linkedProviders() {
      const array = this.$page.track.links;
      return array.sort((a, b) => a.platform.localeCompare(b.platform));
    },
    unlinkedProviders() {
      const platforms = this.$page.track.links.map((link) => link.platform);
      return this.platformSearch
        .filter((platform) => !platforms.includes(platform))
        .sort((a, b) => a.localeCompare(b));
    },
    trackName () {
      return `${this.$page.track.artist.title} - ${this.$page.track.title}`
    }
  }
};
</script>
