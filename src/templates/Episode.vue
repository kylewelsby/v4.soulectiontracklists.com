<template>
  <Layout>
    {{ $page.episode.title }}
    <div v-for="chapter in $page.episode.chapters" :key="chapter.id">
      {{ chapter.name }}
      <div v-for="marker in chapter.markers" :key="marker.id">
        <div v-if="marker.track && marker.track.artist">
          <g-link :to="marker.track.artist">{{ marker.track.artist.title }}</g-link>
          -
          <g-link :to="marker.track">{{ marker.track.title }}</g-link>
        </div>
        <div v-else>
          {{ marker.sourceTrackName }}
        </div>
      </div>
    </div>
  </Layout>
</template>
<page-query>
query($id: ID!) {
  episode(id: $id) {
    title
    path
    chapters {
      id
      name
      markers {
        id
        sourceTrackName
        track{
          path
          title
          artist {
            path
            title
          }
        }
        time
      }
    }
  }
}
</page-query>
