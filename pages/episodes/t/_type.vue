<template lang="pug">
  div
    | {{ tags }}
    | {{ data }}
</template>
<script>
export default {
  async asyncData({ $supabase, $config, params, error }) {
    const { error: tagsErr, data: tags } = await $supabase
      .from('tags')
      .select('id, name')
      .in('name', ['solo', 'takeover', 'discord', 'guest', 'interview'])

    const tag = tags.find((t) => t.name === params.type)
    let query = $supabase
      .from('shows')
      .select('title,slug,tags')
      .eq('profile_id', 1)
      .order('published_at', { ascending: false })

    if (tag && tag.id) {
      query = query.ov('tags', [tag.id])
    }

    const { error: err, data } = await query.range(0, $config.paginate)
    if (err || tagsErr) {
      error({ statusCode: 500, message: err || tagsErr })
    }
    return {
      data,
      tags,
    }
  },
}
</script>
