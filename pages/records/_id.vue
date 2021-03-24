<template lang="pug">
  div(
    class="flex flex-col items-center"
  )
    div(
      class="mt-10 mb-6"
    )
      AlbumsHeader(
        :album="data"
      )
    div(

    )
</template>
<script>
export default {
  async asyncData({ $supabase, params, error }) {
    const { data, error: err } = await $supabase
      .from('albums')
      .select('*,artist(id,title)')
      .eq('id', params.id)
      .single()
    if (err) {
      if (err.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
        return
      } else {
        error({ statusCode: 500, err })
      }
    }
    return {
      data,
    }
  },
}
</script>
