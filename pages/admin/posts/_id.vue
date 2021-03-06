<template lang="pug">
  div(
    class="container mx-auto"
  )
    | Edit Post
    | {{ data }}
    AdminPostsForm(
      @submit="onSubmit()"
      @cancel="$router.push('/admin/posts/')"
      :value="data"
    )
</template>
<script>
export default {
  middleware: ['auth'],
  async asyncData({ $supabase, params, error }) {
    const { error: err, data } = await $supabase
      .from('posts')
      .select('*')
      .match({
        id: params.id,
        profile: 1,
      })
      .single()
    if (err) {
      error({ errorMessage: err.message })
    }
    return {
      data,
    }
  },
  methods: {
    async onSubmit() {
      const resp = await this.$supabase.from('posts').update(this.data).match({
        id: this.$route.params.id,
        profile: 1,
      })

      if (resp.status !== 200) {
        window.alert(resp.error)
        return
      }
      this.$router.push({
        path: '/admin/posts/',
      })
    },
  },
}
</script>
