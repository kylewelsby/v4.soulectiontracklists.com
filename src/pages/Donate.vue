<template>
  <Layout>
    <div class="bg-white flex flex-col items-center">
      <div class="w-full md:w-10/12 p-4 py-8">
        <p>
          It would take
          <strong>{{ formattedDuration }}</strong> to listen to every Soulection
          Radio Show continuously.
        </p>
        <!-- 
        <p>
          There currently are
          <strong v-if="allEpisodes">{{ allEpisodes.length }} episodes</strong>
          playing a total of
          <strong>{{ formattedTotalPlayCount }}</strong> identified tracks,
          <strong>{{ formattedTrackCount }}</strong> of them unique.
        </p> -->
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  episodes: allEpisode(filter: { episode: { ne: null } }) {
    totalCount
    edges {
      node {
        duration
        chapters {
          markers: belongsTo {
            totalCount
          }
        }
      }
    }
  }
  tracks: allTrack {
    totalCount
  }
  takeovers: allEpisode(filter: { takeover: { eq: true } }) {
    totalCount
  }
  appleMusicShows: allEpisode(filter: { station: { eq: APPLE_MUSIC } }) {
    totalCount
  }
  kbeachShows: allEpisode(filter: { station: { eq: KBEACH } }) {
    totalCount
  }
  rinsefmShows: allEpisode(filter: { station: { eq: RINSE_FM } }) {
    totalCount
  }
  redBullStudiosShows: allEpisode(
    filter: { station: { eq: REDBULL_STUDIOS } }
  ) {
    totalCount
  }
  appleMusicStreamCount: allEpisode(filter: { appleMusic: { exists: true } }) {
    totalCount
  }
  soundcloudStreamCount: allEpisode(filter: { soundcloud: { exists: true } }) {
    totalCount
  }
  mixcloudStreamCount: allEpisode(filter: { mixcloud: { exists: true } }) {
    totalCount
    edges {
      node {
        mixcloud
      }
    }
  }
}

</page-query>

<script>
// import { getCurrentInstance } from "vue";
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  getCurrentInstance
} from "@vue/composition-api";

import humanizeDuration from "humanize-duration";

export default defineComponent({
  setup(props, ctx) {
    const $page = ctx.root.$page;

    const totalPlayCount = ref(0);
    const totalTrackCount = ref(0);
    const totalListeningTime = ref(0);
    const formattedDuration = ref(humanizeDuration(0));
    const totalTakeoverCount = ref(0);
    const totalMissingTracklistShows = ref(0);
    const broadcasterCounts = reactive({
      kbeach: 0,
      rinsefm: 0,
      redbullStudios: 0,
      appleMusic: 0
    });

    const platformCounts = reactive({
      mixcloud: 0,
      soundCloud: 0,
      appleMusic: 0
    });

    const donations = reactive({
      total: 0,
      formatted: computed(() => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(donations.total / 100);
      })
    });

    watch(totalListeningTime, (value) => {
      formattedDuration.value = humanizeDuration(value * 1000);
    });

    const formattedTotalPlayCount = computed(() => {
      return new Intl.NumberFormat("en-US").format(totalPlayCount.value);
    });

    const formattedTrackCount = computed(() => {
      return new Intl.NumberFormat("en-US").format(totalTrackCount.value);
    });

    // totalPlayCount.value = $page.episodes.edges.reduce((acc, node) => {
    //   acc =
    //     acc +
    //     node.chapters.reduce((sum, chapter) => {
    //       sum = sum + chapter.markers.totalCount;
    //       return sum;
    //     }, 0);
    //   return acc;
    // }, 0);

    totalListeningTime.value = $page.episodes.edges.reduce((acc, edge) => {
      if (edge.node.duration) {
        acc = acc + edge.node.duration;
      }
      return acc;
    }, 0);

    return {
      // allEpisodes,
      // allTracks,
      totalPlayCount,
      totalListeningTime,
      totalTakeoverCount,
      totalMissingTracklistShows,
      formattedTotalPlayCount,
      formattedTrackCount,
      formattedDuration,
      broadcasterCounts,
      platformCounts,
      donations
    };
  }
});
</script>
