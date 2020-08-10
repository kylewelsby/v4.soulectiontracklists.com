<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
    <div
      v-for="(session, index) of page.sessions"
      :id="slugify(session.name)"
      :key="index"
    >
      <div class="p-4">
        <div v-if="session.artwork">
          <!-- TODO artwork -->
        </div>
        <div>
          <div class="text-2xl font-medium">
            {{ session.name }}
          </div>
          <div v-if="session.content" class="mt-4">
            <nuxt-content :document="session.content" />
          </div>
        </div>
      </div>
      <div
        v-for="(track, trackIndex) of session.trackPages"
        :key="trackIndex"
        class="flex flex-row items-center justify-center border-b last:border-b-0 border-gray-200 p-4 bg-white"
      >
        <a href="" class="h-12 w-12 mr-4 relative">artwork</a>
        <span class="flex flex-col flex-grow">
          <span class="text-xs order-first">{{ session.cue[trackIndex] }}</span>
          <nuxt-link
            v-if="session.artistPages[trackIndex]"
            :to="session.artistPages[trackIndex].dir"
            class="font-medium order-3"
          >
            {{ session.artistPages[trackIndex].title }}
          </nuxt-link>
          <span v-else class="font-medium order-3">
            {{ session.tracks[trackIndex].split(' - ')[0] }}
          </span>
          <nuxt-link v-if="track" class="font-light order-2" :to="track.path">
            {{ track.title }}
          </nuxt-link>
          <span v-else class="font-light order-2">
            {{ session.tracks[trackIndex].split(' - ')[1] }}
          </span>
        </span>
      </div>
      {{ session }}
    </div>
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    let slug = params.slug
    if (slug === '_index') {
      slug = ''
    }
    const page = await $content('episodes', slug)
      .fetch()
      .then((page) => {
        const promises = []
        page.sessions.forEach((session) => {
          session.trackPages = []
          session.artistPages = []
          session.refs.forEach((ref, index) => {
            const promise = $content(ref.replace(/\.md$/, ''))
              .limit(1)
              .fetch()
              .then((page) => {
                session.trackPages[index] = page
              })
              .catch(() => {
                session.trackPages[index] = null
              })
            const artistRef = ref
              .replace(/^artists\/(.+)\/tracks\/.*\.md$/, '$1')
              .replace(/\.md$/, '')
            const promise2 = $content('artists', artistRef)
              .limit(1)
              .fetch()
              .then((page) => {
                session.artistPages[index] = page[0]
              })
              .catch(() => {
                session.artistPages[index] = null
              })
            promises.push(promise)
            promises.push(promise2)
          })
        })
        return Promise.all(promises).then(() => page)
      })
      .catch((_err) => {
        error({ statusCode: 404, message: 'Episode not found' })
      })
    return { page }
  },
  methods: {
    slugify(string) {
      const a =
        'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
      const b =
        'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    },
  },
}
</script>
