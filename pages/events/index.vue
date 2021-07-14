<template lang="pug">
  div(
    class="flex flex-col items-stretch"
  )
    div(
      class="px-4 container mx-auto mt-10 mb-6"
    )
      div(
        class="grid grid-cols-1 md:grid-cols-3 gap-20"
      )
        EventListItem(
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
      .ov('tags', [16])
      .eq('state', 'published')
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
