<template lang="pug">
  div(
    class="container mx-auto flex flex-col items-center mt-10"
  )
    div(
      class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl px-4 mx-auto"
    )
      h1 {{ page.title }}
      nuxt-content(
        :document="page"
      )
    h1(
      class="font-bold text-4xl mt-8 my-4"
    ) Team behind Soulection
    div(
      class="w-full lg:w-10/12 grid md:grid-cols-3 gap-20 p-4"
    )
      AboutTeamMember(
        v-for="(member, index) in page.team"
        :key="index"
        :member="member"
      )
    h1(
      class="font-bold text-4xl mt-8 my-4"
    ) Connect with Soulection
    div(
      class="flex flex-wrap items-center"
    )
      TrackLink(
        class="bg-white mr-2 mb-2"
        v-for="link in page.socials"
        :platform="link.platform"
        :href="link.href"
        :hide-title="true"
        :icon-size="8"
      )


</template>
<script>
export default {
  async asyncData({ $content, error }) {
    const page = await $content('about')
      .fetch()
      .catch((err) => {
        error({
          statusCode: 404,
          message: `Page not found ${err}`,
        })
      })

    return {
      page,
    }
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>
