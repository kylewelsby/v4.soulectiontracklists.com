<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    div(
      class="px-4 container mx-auto mt-10 mb-6"
    )
      EventsSubNav
      div(
        class="mb-6"
      )
        p(
          class="my-8 font-light"
        ) Upcoming live events and experiences with the Soulection team.
      div(
        class="grid grid-cols-1 md:grid-cols-3 gap-20"
      )
        EventsListItem(
          v-for="event of data"
          :event="event"
        )
</template>

<script>
export default {
  async asyncData({ $config, $supabase, error }) {
    const { error: err, data } = await $supabase
      .from('shows')
      .select('*, chapters(*)')
      .eq('profile', $config.profileId)
      .gt('published_at', new Date().toISOString())
      .ov('tags', [16])
      .eq('state', 'published')
      .order('published_at', { ascending: true })
    if (err) {
      error({ statusCode: 500, message: err })
    }
    return {
      data,
      err,
    }
  },
}
</script>
