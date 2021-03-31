<template lang="pug">
  div(
    class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10"
  )
    div
      nuxt-picture(
        src="/default-artist.png"
        :size="128"
      )
    div
      nuxt-picture(
        src="/default-artist.png"
        :size="128"
      )
    div
      nuxt-picture(
        src="/images/episodes/soulection-radio-show-498.jpg"
        :size="128"
      )
    nuxt-link(
      v-for="show in data"
      :key="show.id"
      :to="`/episodes/${show.slug}/`"
    )
      img(
        style="object-fit: cover"
        :data-twic-src="`image:${show.artwork}`"
        :src="`${$config.twicPicUrl}/${show.artwork}?twic=v1/output=preview`"
        :size="128"
      )
</template>
<script>
export default {
  async asyncData({ $supabase, $config }) {
    const { data } = await $supabase
      .from('shows')
      .select('id, title, slug, artwork')
      .ilike('title', 'Soulection Radio%')
      .eq('state', 'published')
      .eq('profile', $config.profileId)
      .order('published_at', { ascending: false })
    return {
      data,
    }
  },
}
</script>
