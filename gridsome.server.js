const crypto = require("crypto");
const slugify = require("@sindresorhus/slugify");
const moment = require('moment')
// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

function createUid(orgId) {
  return crypto
    .createHash("md5")
    .update(orgId)
    .digest("hex");
}

const SUPPORTED_DATE_FORMATS = [
  // ISO8601
  'YYYY',
  'YYYY-MM',
  'YYYY-MM-DD',
  'YYYYMMDD',

  // Local Time
  'YYYY-MM-DDTHH',
  'YYYY-MM-DDTHH:mm',
  'YYYY-MM-DDTHHmm',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHHmmss',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DDTHHmmss.SSS',

  // Coordinated Universal Time (UTC)
  'YYYY-MM-DDTHHZ',
  'YYYY-MM-DDTHH:mmZ',
  'YYYY-MM-DDTHHmmZ',
  'YYYY-MM-DDTHH:mm:ssZ',
  'YYYY-MM-DDTHHmmssZ',
  'YYYY-MM-DDTHH:mm:ss.SSSZ',
  'YYYY-MM-DDTHHmmss.SSSZ',

  'YYYY-[W]WW',
  'YYYY[W]WW',
  'YYYY-[W]WW-E',
  'YYYY[W]WWE',
  'YYYY-DDDD',
  'YYYYDDDD',

  'YYYY-MM-DD HH:mm:ss Z',
  'YYYY-MM-DD HH:mm:ss',

  'YYYY-MM-DD HH:mm:ss.SSSS Z',
  'YYYY-MM-DD HH:mm:ss.SSSS'
]

module.exports = function(api) {
  api.createPages(({ createPage }) => {
    const PLATFORMS = [
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
    ];
    PLATFORMS.forEach((platform) => {
      createPage({
        path: `/tracks/on/${platform}`,
        component: "./src/templates/Links.vue",
        context: {
          platform
        }
      })
    })
  });
  api.loadSource(
    ({ addCollection, getCollection, createReference, addSchemaTypes }) => {
      // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

      addSchemaTypes(`
      enum EpisodeStudio {
        APPLE_MUSIC
        KBEACH
        REDBULL_STUDIOS
        RINSE_FM
      }
      type Episode_Youtube {
        live: String
        interview: String
      }
      type Episode implements Node {
        id: ID!
        draft: Boolean
        title: String
        artwork: String
        date: Date
        duration: Int
        episode: Float
        location: String
        station: EpisodeStudio
        takeover: Boolean
        peoplesChoice: Boolean
        chapters: [Chapter]
        appleMusic: String
        mixcloud: String
        soundcloud: String
      }
      type Chapter implements Node {
        id: ID!
        name: String
        content: String
        artwork: String
        markers: [Marker]
      }
      type Marker implements Node {
        id: ID!
        track: Track
        chapter: Chapter
        time: String
        sourceTrackName: String
      }
      type Track implements Node {
        id: ID!
        title: String
        artist: Artist
        links: [Link]
        artwork: String
        lastPlayedAt: Date
        lastEpisodeNumber: Float
      }
      type Artist implements Node {
        id: ID!
        title: String
        artwork: String
        episodes: [Episode]
        tracks: [Track]
        links: [Link]
      }
      type Link implements Node {
        id: ID!
        track: Track
        platform: String
        href: String
        artwork: String
      }`);

      const episodes = getCollection("Episode");
      const tracks = getCollection("Track");
      const artists = getCollection("Artist");

      const chapters = addCollection("Chapter");
      const markers = addCollection("Marker");
      const links = addCollection("Link");

      episodes.data().forEach((episode) => {
        if(episode.date) {
          episode.date = moment.utc(episode.date, SUPPORTED_DATE_FORMATS).toISOString()
        }
        if (episode.sessions) {
          const episodeChapters = [];
          episode.sessions.forEach((s, i) => {
            const slug = slugify(`${s.name}-${i}`);
            const id = `${episode.path}#${slug}`;
            const node = chapters.addNode({
              ...s,
              episode: createReference("Episode", episode.id),
              id: createUid(id),
              markers: []
            });
            episodeChapters.push(createReference("Chapter", node.id));
          });
          episode.chapters = episodeChapters;
        }
        if (episode.beats1 && !episode.appleMusic) {
          episode.appleMusic = episode.beats1;
        }
        if (episode.station === "beats1") {
          episode.station = "appleMusic";
        }
      });

      chapters.data().forEach((chapter) => {
        const chapterMarkers = [];
        if (chapter.refs) {
          chapter.refs.forEach((ref, i) => {
            let trackNode;
            let artistNode;
            if (ref) {
              const path = "/" + ref.replace(/\.md$/, "/");
              const track = tracks.findNode({
                path: { $eq: path }
              });
              if (track) {
                trackNode = createReference("Track", track.id);
              }
            }
            const id = `${chapter.id}-${i}`;
            const node = markers.addNode({
              id: createUid(id),
              chapter: createReference("Chapter", chapter.id),
              track: trackNode,
              sourceTrackName: chapter.tracks[i],
              time: chapter.cue[i]
            });
            chapterMarkers.push(createReference("Marker", node.id));
          });
        }

        chapter.markers = chapterMarkers;
      });

      artists.data().forEach((artist) => {
        // tracks
        const artistTracks = tracks.findNodes({
          path: { $contains: artist.path }
        });
        artist.tracks = artistTracks.map((track) => {
          return createReference("Track", track.id);
        });
      });

      tracks.data().forEach((track) => {
        if (!track.artwork) {
          track.artwork = "";
        }
        const artistPath = track.path.replace(/\/tracks\/.*/, "/");
        const artist = artists.findNode({
          path: { $eq: artistPath }
        });
        if (artist) {
          track.artist = createReference("Artist", artist.id);
        }
        const trackLinks = [];
        Object.entries(track.links || []).forEach(([platform, data]) => {
          if (data && data.href && data.href.length > 0) {
            const node = links.addNode({
              id: createUid(`${track.id}-${platform}`),
              ...data,
              platform,
              track: createReference("Track", track.id)
            });
            trackLinks.push(createReference("Link", node.id));
          }
        });
        track.links = trackLinks;
      });
    }
  );

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    // const { data } = await graphql(`{
    //   allEpisode {
    //     edges {
    //       node {
    //         id
    //         path
    //       }
    //     }
    //   }
    // }`)
    // data.allEpisode.edges.forEach(({node}) => {
    //   createPage({
    //     path: node.path,
    //     component: './src/templates/Episode.vue',
    //     context: {
    //       id: node.id
    //     }
    //   })
    // })
  });

  api.onCreateNode((options) => {
    // console.log(options)
  });
};
