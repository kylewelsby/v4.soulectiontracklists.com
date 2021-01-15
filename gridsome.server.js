const crypto = require("crypto");
const slugify = require("@sindresorhus/slugify");

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

module.exports = function(api) {
  api.loadSource(
    ({ addCollection, getCollection, createReference, addSchemaTypes }) => {
      // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

      addSchemaTypes(`
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
